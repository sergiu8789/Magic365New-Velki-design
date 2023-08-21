import React, { useEffect, useState, useContext, useRef } from "react";
import styles from "./CurrentBets.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import { NoData } from "../../Layout/NoData/NoData";
import ApiService from "../../../services/ApiService";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";
import {
  changeDateFormat,
  formatTime,
  getCasinoMarketName,
} from "../../../utils/helper";

export const CurrentBets = () => {
  const auth = useContext(AuthContext);
  const [page, setPage] = useState(1);
  const appData = useApp();
  const TabList = [
    "All",
    "Exchange",
    "Bookmaker",
    "Fancybet",
    "Casino",
    "Sportsbook",
  ];
  const [popularTabActive, setpopularTabActive] = useState("All");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [betStatusDrop, setbetStatusDrop] = useState("false");
  const [betStatus, setbetStatus] = useState("All");
  const [currentBetsList, SetCurrentBetsList] = useState([]);
  const [openBetList, setopenBetList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const tabRef = useRef();

  const selectPopularTab = (event, name) => {
    let pageOffset = document.getElementById("centerMobileMode").offsetLeft;
    let scrollPos = document.getElementById("allTabList").scrollLeft;
    let inplay = parseInt(17);
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    TabPos = TabPos + scrollPos;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setTabLineWidth(widthTab);
    setTabPosLeft(TabPos);
    if (name === "All") {
      name = "";
    } else if (name === "Sportsbook") {
      name = "Premium";
    }
    let marketName = name.toLowerCase();
    setpopularTabActive(marketName);
  };

  const openBetStatusDrop = () => {
    if (betStatusDrop === "true") {
      setbetStatusDrop("false");
    } else {
      setbetStatusDrop("true");
    }
  };

  const setBetStatusVal = (val) => {
    setbetStatus(val);
    setbetStatusDrop("false");
  };

  const showBetInfo = (id) => {
    let newBetArray = [];
    newBetArray = [...openBetList];
    if (newBetArray.indexOf(id) < 0) {
      setopenBetList((prevopenBetList) => [...prevopenBetList, id]);
    } else {
      let betIndex = newBetArray.indexOf(id);
      newBetArray.splice(betIndex, 1);
      setopenBetList(openBetList.filter((x) => x !== id));
    }
  };

  const handlePage = (state) => {
    if (state === "next") {
      let newPage = page + 1;
      setPage(newPage);
    } else {
      if (page > 1) {
        let newPage = page - 1;
        setPage(newPage);
      }
    }
    document.getElementById("centerMobileMode").scrollTop = 0;
  };

  const fetchCurrentBets = () => {
    SetCurrentBetsList([]);
    let betStatusVal = "";
    if (betStatus === "All") {
      betStatusVal = "";
    } else if (betStatus === "Matched") {
      betStatusVal = 1;
    } else if (betStatus === "UnMatched") {
      betStatusVal = 2;
    }
    ApiService.currentBets(page, betStatusVal, popularTabActive)
      .then((res) => {
        let totalPage = res.data.count / 10;
        totalPage = Math.ceil(totalPage);
        setTotalRecords(totalPage);
        setTotalCount(res.data.count);
        SetCurrentBetsList(res.data.data);
        appData.setAppData({ ...appData.appData, listLoading: false });
      })
      .catch((err) => {
        setTotalRecords(0);
        setTotalCount(0);
        appData.setAppData({ ...appData.appData, listLoading: false });
        if (
          err?.response?.data?.statusCode === 401 &&
          err?.response?.data?.message === "Unauthorized"
        ) {
          localStorage.removeItem("token");
          auth.setAuth({
            ...auth.auth,
            isloggedIn: false,
            user: {},
            showSessionExpire: true,
          });
        }
      });
  };

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    fetchCurrentBets();
  }, [page]);

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    setPage(1);
    fetchCurrentBets();
  }, [betStatus, popularTabActive]);

  useEffect(() => {
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  }, []);

  return (
    <React.Fragment>
      <MenuHeader title="Current Bets" />
      <div
        className={`col-12 d-inline-flex position-relative align-items-center`}
      >
        <div
          className={`${styles.allTabList} position-relative col-12 d-inline-flex align-items-center`}
          id="allTabList"
        >
          {TabList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={`${styles.popularTab} ${
                    popularTabActive === item ||
                    (popularTabActive === "" && styles.popularTabActive)
                  } d-inline-flex align-items-center justify-content-center flex-shrink-0`}
                  ref={index === 0 ? tabRef : null}
                  onClick={(event) => selectPopularTab(event, item)}
                >
                  {item}
                </div>
              </React.Fragment>
            );
          })}
          <div
            className={`${styles.popularActiveLine} position-absolute d-inline-block`}
            style={{
              width: TabLineWidth + "px",
              transform: "translateX(" + TabPosLeft + "px)",
            }}
          ></div>
        </div>
      </div>
      <div
        className={`${styles.betStatusBox} col-12 p-2 d-inline-block position-relative`}
      >
        <div
          className={`${styles.betStatusDrop} ${
            betStatusDrop === "true" && styles.betStatusOpen
          } col-12 d-inline-flex align-items-center position-relative`}
          onClick={openBetStatusDrop}
        >
          <span className={styles.betStatusLbl}>Bet Status</span>
          <span className={styles.selectedBetStatus}>{betStatus}</span>
          <i
            className={`${styles.betStatusArrow} position-absolute icon-arrow-down`}
          ></i>
        </div>
        <div
          className={`${styles.betStatusOptions} ${
            betStatusDrop === "true" && styles.betStatusOpen
          } position-absolute`}
        >
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "All" ? "d-none" : "d-flex"
            } align-items-center col-12 m-0`}
            value="1"
            onClick={() => setBetStatusVal("All")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              All
            </span>
          </p>
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "Matched" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="2"
            onClick={() => setBetStatusVal("Matched")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Matched
            </span>
          </p>
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "UnMatched" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="3"
            onClick={() => setBetStatusVal("UnMatched")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              UnMatched
            </span>
          </p>
        </div>
        <div
          className={`${styles.orderByStatus} col-12 mt-2 d-inline-flex justify-content-end align-items-center`}
        >
          <span className={`${styles.reportFormMain} me-3 d-inline-block`}>
            Order By
          </span>
          <div
            className={`${styles.radioButtonGroup} d-flex align-items-center`}
          >
            <div className="d-inline-flex position-relative align-items-center">
              <input
                id="betPlaced"
                name="market"
                type="radio"
                className={`${styles.inputCheckbox} opacity-0 position-absolute`}
              />
              <label
                htmlFor="betPlaced"
                className={`d-inline-flex align-items-center position-relative ${styles.checkRembertext}`}
              >
                Bet Placed
              </label>
            </div>
            <div className="d-inline-flex position-relative align-items-center">
              <input
                id="market"
                name="market"
                type="radio"
                className={`${styles.inputCheckbox} opacity-0 position-absolute`}
              />
              <label
                htmlFor="market"
                className={`d-inline-flex align-items-center position-relative ${styles.checkRembertext}`}
              >
                Market
              </label>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`${styles.allCurrentBetList} col-12 d-inline-flex flex-column`}
      >
        {totalCount === 0 && <NoData title={"No Data"} />}
        {currentBetsList.map((item, index) =>
          item ? (
            <div
              className={`${styles.singleCurrentBet} position-relative col-12 mb-3 d-inline-flex flex-column`}
              key={index}
            >
              <div
                className={`${styles.currentBetHeader} col-12 d-inline-flex justify-content-center align-items-center`}
              >
                {item.game_name && (
                  <React.Fragment>
                    <span>{item.game_name}</span>
                    <span
                      className={`${styles.recordTraingle} icon-triangle-black-400`}
                    ></span>
                  </React.Fragment>
                )}
                {item.game_name && (
                  <React.Fragment>
                    <span className={styles.gameName}>
                      {item.team_one} {item?.team_two && "v " + item.team_two}
                    </span>
                    <span
                      className={`${styles.recordTraingle} icon-triangle-black-400`}
                    ></span>
                  </React.Fragment>
                )}
                <span className="text-capitalize">
                  {item.market_type?.replace("_", " ")}
                  {item.market_name ? (
                    <>{getCasinoMarketName(item.market_name)}</>
                  ) : (
                    <></>
                  )}
                </span>
              </div>
              <div
                className={`${styles.betSlipHeader} col-12 d-flex align-items-center`}
              >
                <span
                  className={`${styles.betTag} ${
                    item.bet_type === 1 ? styles.OddbackTag : styles.OddLayTag
                  } position-relative d-inline-flex align-items-center`}
                >
                  {item.bet_type === 1 ? "Back" : "Lay"}
                </span>
                <span className={`${styles.betTeamName} d-inline-block`}>
                  {item.selection}
                </span>
              </div>
              <div className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}>
                <div
                  className={`${styles.balanceRecord} d-inline-flex flex-column`}
                >
                  <label className={styles.balanceInfoTxt}>Odds req.</label>
                  <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                    {item.odds}
                  </div>
                </div>
                <div
                  className={`${styles.balanceRecord} d-inline-flex flex-column`}
                >
                  <label className={styles.balanceInfoTxt}>Avg. Odds</label>
                  <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                    {item.odds}
                  </div>
                </div>
                <div
                  className={`${styles.balanceRecord} d-inline-flex flex-column`}
                >
                  <label className={styles.balanceInfoTxt}>Matched (PBU)</label>
                  <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                    {item.amount}
                  </div>
                </div>
              </div>
              <div
                className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
              >
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Bet ID
                </span>
                <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                  {item.game_id}
                </span>
              </div>
              <div
                className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
              >
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Bet Placed
                </span>
                <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                  {changeDateFormat(item.createdAt) +
                    " " +
                    formatTime(item.createdAt)}
                </span>
              </div>
              <div
                className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
              >
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Matched Date
                </span>
                <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                  {changeDateFormat(item.createdAt) +
                    " " +
                    formatTime(item.createdAt)}
                </span>
              </div>
              <div
                className={`${styles.betMoreInfo} col-12 ${
                  openBetList.includes(item.game_id + index)
                    ? "d-inline-block"
                    : "d-none"
                }`}
                id={`moreBetInfo_${item.game_id}${index}`}
              >
                <div
                  className={`${styles.balanceRecordInfo} ${styles.betTakenInfo} d-inline-flex align-items-center col-12`}
                >
                  <span
                    className={`${styles.betRecordLbl} d-inline-flex col-4`}
                  >
                    Bet Taken
                  </span>
                  <span
                    className={`${styles.betRecordVal} d-inline-flex col-8`}
                  >
                    {changeDateFormat(item.createdAt) +
                      " " +
                      formatTime(item.createdAt)}
                  </span>
                </div>
                <div
                  className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}
                >
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>Odds req.</label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      {item.odds}
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>Avg. Odds</label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      {item.odds}
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>
                      Matched (PBU)
                    </label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      {item.amount}
                    </div>
                  </div>
                </div>

                <div
                  className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
                >
                  <span
                    className={`${styles.betRecordLbl} d-inline-flex col-4`}
                  >
                    Liability (PBU)
                  </span>
                  <span
                    className={`${styles.betRecordVal} d-inline-flex col-8`}
                  >
                    --
                  </span>
                </div>
              </div>
              <div
                className={`${styles.footerRecord} col-12 d-inline-block position-relative`}
                id={`footerRecord_${item.game_id}${index}`}
                onClick={() => showBetInfo(item.game_id + index)}
              >
                <div
                  className={`${styles.recordMoreDrop} position-absolute m-auto d-inline-flex align-items-center justify-content-center`}
                >
                  <i
                    className={`${styles.recordMoreDown} icon-arrow-down-sencodary`}
                  ></i>
                </div>
              </div>
            </div>
          ) : (
            <NoData />
          )
        )}
      </div>
      <div
        className={`${styles.activePaginate} col-12 ${
          totalRecords > 1 ? "d-inline-flex" : "d-none"
        } align-items-center justify-content-between`}
      >
        <div className="col-6 px-3">
          <button
            className={`${styles.navigateBtn} ${styles.leftnavigateBtn}  ${
              page === 1 && styles.navigateDisable
            } col-12 d-inline-flex align-items-center justify-content-center position-relative`}
            onClick={() => handlePage("previous")}
          >
            <i
              className={`${styles.arrow} icon-arrow-left position-absolute d-inline-flex`}
            ></i>
            Previous
          </button>
        </div>
        <div className="col-6 px-3">
          <button
            className={`${styles.navigateBtn}  ${styles.rightnavigateBtn} ${
              totalRecords === page && styles.navigateDisable
            } col-12 d-inline-flex align-items-center justify-content-center position-relative`}
            onClick={() => handlePage("next")}
          >
            Next
            <i
              className={`${styles.arrow} icon-arrow-left position-absolute d-inline-flex`}
            ></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

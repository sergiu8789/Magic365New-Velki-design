import React, { useState, useEffect, useContext } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import styles from "./BetHistory.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import { NoData } from "../../Layout/NoData/NoData";
import ApiService from "../../../services/ApiService";
import { AuthContext } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";
import {
  changeDateFormat,
  formatTime,
  formatDate,
  getCasinoMarketName,
} from "../../../utils/helper";

export const BetHistory = () => {
  const auth = useContext(AuthContext);
  const appData = useApp();
  const TabList = [
    "All",
    "Exchange",
    "Bookmaker",
    "Fancybet",
    "Casino",
    "Premium",
  ];
  const [popularTabActive, setpopularTabActive] = useState("");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [betStatusDrop, setbetStatusDrop] = useState("false");
  const [betStatus, setbetStatus] = useState("All");
  const [dateStatus, setdateStatus] = useState("false");
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState("all");
  const [bettingHistoryList, setBettingHistoryList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [totalCount, setTotalCount] = useState(0);

  const selectPopularTab = (event, name) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
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
    }
    setpopularTabActive(name);
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

  const setDateChoose = () => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    let dateValue = document.getElementById("calendarDate").value;
    dateValue = dateValue.split("-");
    if (fromDate === dateValue[0].trim() && toDate === dateValue[1].trim()) {
      appData.setAppData({ ...appData.appData, listLoading: false });
    }
    setFromDate(dateValue[0].trim());
    setToDate(dateValue[1].trim());
  };

  const showCalenderFilter = () => {
    setdateStatus("true");
  };

  const closeCalenderFilter = () => {
    setdateStatus("false");
  };

  const showBetInfo = (id) => {
    if (
      document
        .getElementById("footerRecord_" + id)
        .classList.contains(styles.footerRecordOpen) === true
    ) {
      document
        .getElementById("footerRecord_" + id)
        .classList.remove(styles.footerRecordOpen);
      document
        .getElementById("moreBetInfo_" + id)
        .classList.remove("d-inline-block");
      document.getElementById("moreBetInfo_" + id).classList.add("d-none");
    } else {
      document
        .getElementById("footerRecord_" + id)
        .classList.add(styles.footerRecordOpen);
      document.getElementById("moreBetInfo_" + id).classList.remove("d-none");
      document
        .getElementById("moreBetInfo_" + id)
        .classList.add("d-inline-block");
    }
  };

  const checkProfitLoss = (checkVal) => {
    if (checkVal >= 0) {
      return true;
    } else {
      return false;
    }
  };

  const selectDateFilter = (date) => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    if (date === period) {
      appData.setAppData({ ...appData.appData, listLoading: false });
    }
    setPeriod(date);
    closeCalenderFilter();
  };

  const handlePage = (state) => {
    appData.setAppData({ ...appData.appData, listLoading: true });
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

  const fetchHistoryData = () => {
    setBettingHistoryList([]);
    let betStatusVal = "";
    if (betStatus === "All") {
      betStatusVal = "";
    } else if (betStatus === "Matched") {
      betStatusVal = 1;
    } else if (betStatus === "Cancelled") {
      betStatusVal = 2;
    } else if (betStatus === "Won") {
      betStatusVal = 3;
    } else if (betStatus === "Loss") {
      betStatusVal = 4;
    }

    ApiService.getBettingHistory(
      page,
      fromDate,
      toDate,
      betStatusVal,
      popularTabActive
    )
      .then((res) => {
        let totalPage = res.data.count / 10;
        totalPage = Math.ceil(totalPage);
        setTotalRecords(totalPage);
        setTotalCount(res.data.count);
        setBettingHistoryList(res.data.data);
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
    if (period !== "custom") fetchHistoryData();
  }, [fromDate, toDate]);

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    fetchHistoryData();
  }, [page]);

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    setPage(1);
    fetchHistoryData();
  }, [betStatus, popularTabActive]);

  useEffect(() => {
    setPage(1);
    const date = new Date();
    let result = "";
    if (period === "Today") {
      result = formatDate(date);
      setFromDate(result + "T00:00");
      setToDate(result + "T23:59");
    }
    if (period === "Yesterday") {
      result = formatDate(date);
      setToDate(result + "T23:59");
      date.setDate(date.getDate() - 1);
      result = formatDate(date);
      setFromDate(result + "T00:00");
    }
    if (period === "All") {
      setToDate("");
      setFromDate("");
    }
  }, [period, popularTabActive]);

  useEffect(() => {
    if (
      document.querySelector(
        "." + styles.allTabList + " ." + styles.popularTab + ":nth-child(1)"
      )
    ) {
      document
        .querySelector(
          "." + styles.allTabList + " ." + styles.popularTab + ":nth-child(1)"
        )
        .click();
    }
  }, []);

  return (
    <React.Fragment>
      <MenuHeader title="Bets History" />
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
              betStatus === "Cancelled" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="3"
            onClick={() => setBetStatusVal("Cancelled")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Cancelled
            </span>
          </p>
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "Won" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="3"
            onClick={() => setBetStatusVal("Won")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Won
            </span>
          </p>
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "Loss" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="3"
            onClick={() => setBetStatusVal("Loss")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Loss
            </span>
          </p>
        </div>
        <div
          className={`${styles.orderByStatus} col-12 mt-3 d-inline-flex justify-content-between align-items-center`}
        >
          <div
            className={`${styles.BetHistoryDate} d-inline-flex position-relative flex-grow-1 align-items-center`}
          >
            <div
              className={`${styles.calendarDateIcon} icon-calendar position-absolute`}
            ></div>
            <DateRangePicker className={styles.calendarDate}>
              <input
                type="text"
                className={`${styles.calenderForm} form-control`}
                id="calendarDate"
              />
            </DateRangePicker>
          </div>
          <span
            className={`${styles.dateDuring} flex-shrink-0 d-inline-flex align-items-center`}
            onClick={showCalenderFilter}
          >
            ···
          </span>
          <button
            className={`${styles.dateSearchBtn} flex-shrink-0 d-inline-flex align-items-center`}
            onClick={setDateChoose}
          >
            Submit
          </button>
        </div>
      </div>
      <div
        className={`${styles.calendarShortArea} ${
          dateStatus === "true" && styles.showCalenderArea
        } col-12 m-auto position-fixed d-inline-flex`}
      >
        <div
          className={`${styles.previousDateArea} col-12 position-absolute d-inline-block`}
        >
          <h2 className={`${styles.dateFilterArea} col-12 m-0 text-center`}>
            During
          </h2>
          <i
            className={`${styles.closeDateFilter} icon-close position-absolute d-inline-block`}
            onClick={closeCalenderFilter}
          ></i>
          <div
            className={`${styles.previousDateSelections} col-12 d-inline-flex align-items-center`}
          >
            <button
              className={`${styles.datePickerBtn} d-inline-flex align-items-center justify-content-center`}
              onClick={() => selectDateFilter("Today")}
            >
              Today
            </button>
            <button
              className={`${styles.datePickerBtn} d-inline-flex align-items-center justify-content-center`}
              onClick={() => selectDateFilter("Yesterday")}
            >
              Yesterday
            </button>
            <button
              className={`${styles.datePickerBtn} d-inline-flex align-items-center justify-content-center`}
              onClick={() => selectDateFilter("All")}
            >
              All
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${styles.allCurrentBetList} col-12 d-inline-flex flex-column`}
      >
        {totalCount === 0 && <NoData title={"No Data"} />}
        {bettingHistoryList?.map((item, index) =>
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
                  Profit/Loss (PBU)
                </span>
                <span
                  className={`${styles.betRecordVal} ${
                    checkProfitLoss(item.pl_amount)
                      ? styles.betProfit
                      : styles.betLoss
                  } d-inline-flex col-8`}
                >
                  ({item.pl_amount})
                </span>
              </div>
              <div
                className={`${styles.betMoreInfo} col-12 d-none`}
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

                <div
                  className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
                >
                  <span
                    className={`${styles.betRecordLbl} d-inline-flex col-4`}
                  >
                    Actual Odds
                  </span>
                  <span
                    className={`${styles.betRecordVal} d-inline-flex col-8`}
                  >
                    {item.odds}
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

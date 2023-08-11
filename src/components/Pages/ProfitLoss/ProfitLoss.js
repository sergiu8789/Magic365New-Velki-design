import React, { useState, useEffect, useContext } from "react";
import DateRangePicker from "react-bootstrap-daterangepicker";
import "bootstrap-daterangepicker/daterangepicker.css";
import styles from "./ProfitLoss.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import ApiService from "../../../services/ApiService";
import { AuthContext } from "../../../context/AuthContextProvider";
import {
  changeDateFormat,
  formatTime,
  formatDate,
  getCasinoMarketName,
} from "../../../utils/helper";
import { NoData } from "../../Layout/NoData/NoData";

export const ProfitLoss = () => {
  const auth = useContext(AuthContext);
  const TabList = ["All", "Exchange", "Bookmaker", "Fancybet", "Premium"];
  const [popularTabActive, setpopularTabActive] = useState("");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [dateStatus, setdateStatus] = useState("false");
  const [betStatusDrop, setbetStatusDrop] = useState("false");
  const [betStatus, setbetStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [period, setPeriod] = useState("all");
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPL, setTotalPl] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [totalBetCount, settotalBetCount] = useState(0);
  const [matchesList, setMatchesList] = useState([]);
  const [gamesProfitList, setGamesProfitList] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

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

  const showCalenderFilter = () => {
    setdateStatus("true");
  };

  const closeCalenderFilter = () => {
    setdateStatus("false");
  };

  const openBetStatusDrop = () => {
    if (betStatusDrop === "true") {
      setbetStatusDrop("false");
    } else {
      setbetStatusDrop("true");
    }
  };

  const setDateChoose = () => {
    let dateValue = document.getElementById("calendarDate").value;
    dateValue = dateValue.split("-");
    setFromDate(dateValue[0].trim());
    setToDate(dateValue[1].trim());
  };

  const setBetStatusVal = (name, val) => {
    settotalBetCount(val);
    setbetStatus(name);
    setbetStatusDrop("false");
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
    setPeriod(date);
    closeCalenderFilter();
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

  const fetchBetsPLData = () => {
    ApiService.getBetsPL(page, fromDate, toDate, popularTabActive)
      .then((res) => {
        let totalPage = res.data.count / 10;
        totalPage = Math.ceil(totalPage);
        setTotalRecords(totalPage);
        setTotalCount(res.data.count);
        setMatchesList(res.data.data);
      })
      .catch((err) => {
        setTotalRecords(0);
        setTotalCount(0);
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

  const openMatchBets = (index, item, id) => {
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

      setMatchesList([...matchesList]);
      getMatchBets(
        index,
        item.market_type === "casino" ? "casino" : item.game_id,
        item.market_type,
        item?.market_name
      );
    }
  };

  const fetchGamesPL = () => {
    ApiService.getGamePL(fromDate, toDate, popularTabActive)
      .then((res) => {
        if (res.data) {
          let initialValue = 0;
          res.data.data.map(
            (item) => (initialValue = initialValue + parseFloat(item.pl_amount))
          );
          if (betStatus === "All") {
            setTotalPl(initialValue);
            settotalBetCount(initialValue);
          }
          setGamesProfitList(res.data.data);
        }
      })
      .catch((err) => {
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

  const getMatchBets = (index, match_id, market_type, market_name) => {
    let backTotal = 0;
    let layTotal = 0;
    let commission = 0;
    let marketTotal = 0;
    ApiService.getMatchPL(match_id, market_type, market_name)
      .then((res) => {
        matchesList[index].betList = res.data.data;
        if (res?.data?.data?.length) {
          res.data.data.map((item) => {
            if (item.type === 1)
              backTotal = backTotal + parseFloat(item.pl_amount);
            else layTotal = layTotal + parseFloat(item.pl_amount);
            commission = commission + parseFloat(item.commission);
            marketTotal = marketTotal + parseFloat(item.pl_amount);
          });
        }
        matchesList[index].backTotal = backTotal;
        matchesList[index].layTotal = layTotal;
        matchesList[index].commission = commission;
        matchesList[index].marketTotal = marketTotal;
        matchesList[index].netTotal = marketTotal - commission;
        setMatchesList([...matchesList]);
      })
      .catch((err) => {
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
    if (period !== "custom") {
      fetchBetsPLData();
      fetchGamesPL();
    }
  }, [fromDate, toDate]);

  useEffect(() => {
    fetchBetsPLData();
    fetchGamesPL();
  }, [page, popularTabActive]);

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
      <MenuHeader title="Profit & Loss" />
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
          className={`${styles.orderByStatus} col-12 mt-1 mb-3 d-inline-flex justify-content-between align-items-center`}
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
        <div
          className={`${styles.betStatusDrop} ${
            betStatusDrop === "true" && styles.betStatusOpen
          } col-12 d-inline-flex align-items-center position-relative justify-content-between`}
          onClick={openBetStatusDrop}
        >
          <span className={styles.selectedBetStatus}>{betStatus}</span>
          <div
            className={`${styles.proftStatusDrop} col-5 d-inline-flex align-items-center`}
          >
            <span className={styles.betStatusLbl}>Total P/L</span>
            <span
              className={`${styles.proftStatus} ${
                checkProfitLoss(totalBetCount)
                  ? styles.proftStatusSuccess
                  : styles.proftStatusLoss
              }`}
            >
              ({parseFloat(totalBetCount).toFixed(2)})
            </span>
          </div>
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
            value={totalPL}
            onClick={() => setBetStatusVal("All", totalPL)}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              All
            </span>
          </p>
          {gamesProfitList.map((item, index) => (
            <p
              className={`${styles.betStatusItem} ${
                betStatus === item.game_name ? "d-none" : "d-flex"
              } align-items-center col-12 m-0`}
              value={item.pl_amount}
              onClick={() => setBetStatusVal(item.game_name, item.pl_amount)}
              key={index}
            >
              <span
                className={`${styles.betStatusText} d-flex position-relative`}
              >
                {item.game_name}
              </span>
            </p>
          ))}
        </div>
        <div
          className={`${styles.profilLossSum} ${styles.proftStatusDrop} col-12 d-inline-flex align-items-center`}
        >
          <span className={styles.betStatusLbl}>Total P/L</span>
          <span
            className={`${styles.proftStatus} ${
              checkProfitLoss(totalPL)
                ? styles.proftStatusSuccess
                : styles.proftStatusLoss
            }`}
          >
            ({parseFloat(totalPL).toFixed(2)})
          </span>
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
        {matchesList
          .filter(function (item) {
            if (betStatus != "All") return item.game_type === betStatus;
            else return item;
          })
          .map((item, index) =>
            item ? (
              <div
                className={`${styles.singleCurrentBet} position-relative col-12 mb-3 d-inline-flex flex-column`}
                key={index}
              >
                <div
                  className={`${styles.currentBetHeader} col-12 d-inline-flex justify-content-center align-items-center`}
                >
                  {item.game_type && (
                    <React.Fragment>
                      <span>{item.game_type}</span>
                      <span
                        className={`${styles.recordTraingle} icon-triangle-black-400`}
                      ></span>
                    </React.Fragment>
                  )}
                  {item.team_one && (
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
                  className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}
                >
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>Start Time</label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      {changeDateFormat(item.createdAt) +
                        " " +
                        formatTime(item.createdAt)}
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>
                      Settled date
                    </label>
                    <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                      {changeDateFormat(item.setteled_on) +
                        " " +
                        formatTime(item.setteled_on)}
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecord} d-inline-flex flex-column`}
                  >
                    <label className={styles.balanceInfoTxt}>
                      Profit/Loss (PBU)
                    </label>
                    <div
                      className={`${styles.balanceInfoAmt} ${
                        checkProfitLoss(item.pl_amount)
                          ? styles.proftStatusSuccess
                          : styles.proftStatusLoss
                      } d-inline-flex`}
                    >
                      {parseFloat(item.pl_amount).toFixed(2)}
                    </div>
                  </div>
                </div>
                <div
                  className={`${styles.betMoreInfo} col-12 d-none`}
                  id={`moreBetInfo_${item.game_id}${index}`}
                >
                  {item.betList?.map((row, index) => {
                    return (
                      <React.Fragment key={index}>
                        <div
                          className={`${styles.balanceRecordInfo} ${styles.betTakenInfo} d-inline-flex align-items-center col-12 justify-content-between flex-wrap`}
                          key={index}
                        >
                          <span
                            className={`${styles.betRecordLbl} d-inline-flex`}
                          >
                            {row.bet_id}
                          </span>
                          <span
                            className={`${styles.betRecordVal} d-inline-flex ms-auto`}
                          >
                            Bet Placed{" "}
                            {changeDateFormat(row.createdAt) +
                              " " +
                              formatTime(row.createdAt)}
                          </span>
                        </div>
                        <div
                          className={`${styles.betSlipHeader} col-12 d-flex align-items-center`}
                        >
                          <span
                            className={`${styles.betTag} ${
                              row.type === 1
                                ? styles.OddbackTag
                                : styles.OddLayTag
                            } ${
                              styles.OddbackTag
                            } position-relative d-inline-flex align-items-center`}
                          >
                            {row.type === 1 ? "Back" : "Lay"}
                          </span>
                          <span
                            className={`${styles.betTeamName} d-inline-block`}
                          >
                            {row.selection}
                          </span>
                        </div>
                        <div
                          className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}
                        >
                          <div
                            className={`${styles.balanceRecord} d-inline-flex flex-column`}
                          >
                            <label className={styles.balanceInfoTxt}>
                              Odds req.
                            </label>
                            <div
                              className={`${styles.balanceInfoAmt} d-inline-flex`}
                            >
                              {row.odds}
                            </div>
                          </div>
                          <div
                            className={`${styles.balanceRecord} d-inline-flex flex-column`}
                          >
                            <label className={styles.balanceInfoTxt}>
                              Stake (PBU)
                            </label>
                            <div
                              className={`${styles.balanceInfoAmt} d-inline-flex`}
                            >
                              {row.amount}
                            </div>
                          </div>
                          <div
                            className={`${styles.balanceRecord} d-inline-flex flex-column`}
                          >
                            <label className={styles.balanceInfoTxt}>
                              Profit/Loss (PBU)
                            </label>
                            <div
                              className={`${styles.balanceInfoAmt} ${
                                checkProfitLoss(row.pl_amount)
                                  ? styles.proftStatusSuccess
                                  : styles.proftStatusLoss
                              } d-inline-flex`}
                            >
                              {parseFloat(row.pl_amount).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  {item.betList?.length && (
                    <div
                      className={`${styles.balanceRecordInfo} d-inline-flex flex-column align-items-center col-12`}
                    >
                      <div className="col-12 d-inline-block">
                        <span
                          className={`${styles.betRecordLbl} d-inline-flex col-4`}
                        >
                          Back subtotal
                        </span>
                        <span
                          className={`${styles.betRecordVal}  ${
                            checkProfitLoss(item.backTotal)
                              ? styles.proftStatusSuccess
                              : styles.proftStatusLoss
                          } d-inline-flex col-8`}
                        >
                          ({parseFloat(item.backTotal).toFixed(2)})
                        </span>
                      </div>
                      <div className="col-12 d-inline-block">
                        <span
                          className={`${styles.betRecordLbl} d-inline-flex col-4`}
                        >
                          Lay subtotal
                        </span>
                        <span
                          className={`${styles.betRecordVal} d-inline-flex col-8`}
                        >
                          {parseFloat(item.layTotal).toFixed(2)}
                        </span>
                      </div>
                      <div className="col-12 d-inline-block">
                        <span
                          className={`${styles.betRecordLbl} d-inline-flex col-4`}
                        >
                          Market subtotal
                        </span>
                        <span
                          className={`${styles.betRecordVal}  ${
                            checkProfitLoss(item.marketTotal)
                              ? styles.proftStatusSuccess
                              : styles.proftStatusLoss
                          } d-inline-flex col-8`}
                        >
                          ({parseFloat(item.marketTotal).toFixed(2)})
                        </span>
                      </div>
                      <div className="col-12 d-inline-block">
                        <span
                          className={`${styles.betRecordLbl} d-inline-flex col-4`}
                        >
                          Commission
                        </span>
                        <span
                          className={`${styles.betRecordVal} d-inline-flex col-8`}
                        >
                          {item.commission}
                        </span>
                      </div>
                    </div>
                  )}

                  <div
                    className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
                  >
                    <span
                      className={`${styles.betRecordLbl} d-inline-flex col-4`}
                    >
                      Net Market Total
                    </span>
                    <span
                      className={`${styles.betRecordVal}  ${
                        checkProfitLoss(item.netTotal)
                          ? styles.proftStatusSuccess
                          : styles.proftStatusLoss
                      } d-inline-flex col-8`}
                    >
                      ({parseFloat(item.netTotal).toFixed(2)})
                    </span>
                  </div>
                </div>
                <div
                  className={`${styles.footerRecord} col-12 d-inline-block position-relative`}
                  id={`footerRecord_${item.game_id}${index}`}
                  onClick={() =>
                    openMatchBets(index, item, item.game_id + index)
                  }
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
      {/* Paginate */}
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

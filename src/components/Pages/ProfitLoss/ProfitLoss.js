import React, { useState, useEffect } from "react";
import styles from "./ProfitLoss.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";

export const ProfitLoss = () => {
  const TabList = ["Exchange", "Bookmaker", "Fancybet", "Sportsbook", "Parlay"];
  const [popularTabActive, setpopularTabActive] = useState("Exchange");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [dateStatus, setdateStatus] = useState("false");
  const [betStatusDrop, setbetStatusDrop] = useState("false");
  const [betStatus, setbetStatus] = useState("All");
  const [moreBetInfo, setmoreBetInfo] = useState("false");

  const selectPopularTab = (event, name) => {
    let pageOffset = document.querySelector(".center-mobile-mode").offsetLeft;
    let inplay = parseInt(17);
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setTabLineWidth(widthTab);
    setTabPosLeft(TabPos);
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

  const setBetStatusVal = (val) => {
    setbetStatus(val);
    setbetStatusDrop("false");
  };

  const showBetInfo = () => {
    if (moreBetInfo === "true") {
      setmoreBetInfo("false");
    } else {
      setmoreBetInfo("true");
    }
  };

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
          className={`${styles.allTabList} col-12 d-inline-flex align-items-center`}
        >
          {TabList.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={`${styles.popularTab} ${
                    popularTabActive === item && styles.popularTabActive
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
            <span className={styles.calendarDate}>29/07/2023 - 30/07/2023</span>
          </div>
          <span
            className={`${styles.dateDuring} flex-shrink-0 d-inline-flex align-items-center`}
            onClick={showCalenderFilter}
          >
            ···
          </span>
          <button
            className={`${styles.dateSearchBtn} flex-shrink-0 d-inline-flex align-items-center`}
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
            <span className={`${styles.proftStatus} ${styles.proftStatusLoss}`}>
              ($2.00)
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
              betStatus === "Cricket" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="2"
            onClick={() => setBetStatusVal("Cricket")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Cricket
            </span>
          </p>
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "Soccer" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="3"
            onClick={() => setBetStatusVal("Soccer")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Soccer
            </span>
          </p>
        </div>
        <div
          className={`${styles.profilLossSum} ${styles.proftStatusDrop} col-12 d-inline-flex align-items-center`}
        >
          <span className={styles.betStatusLbl}>Total P/L</span>
          <span className={`${styles.proftStatus} ${styles.proftStatusLoss}`}>
            ($2.00)
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
            >
              Today
            </button>
            <button
              className={`${styles.datePickerBtn} d-inline-flex align-items-center justify-content-center`}
            >
              From Yesterday
            </button>
            <button
              className={`${styles.datePickerBtn} d-inline-flex align-items-center justify-content-center`}
            >
              Last 7 Days
            </button>
          </div>
        </div>
      </div>
      <div
        className={`${styles.allCurrentBetList} col-12 d-inline-flex flex-column`}
      >
        <div
          className={`${styles.singleCurrentBet} position-relative col-12 mb-3 d-inline-flex flex-column`}
        >
          <div
            className={`${styles.currentBetHeader} col-12 d-inline-flex justify-content-center align-items-center`}
          >
            <span>Cricket</span>
            <span
              className={`${styles.recordTraingle} icon-triangle-black-400`}
            ></span>
            <span className={styles.gameName}>Sri Lanka v Pakistan</span>
            <span
              className={`${styles.recordTraingle} icon-triangle-black-400`}
            ></span>
            <span>Match Odds</span>
          </div>
          <div className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}>
            <div
              className={`${styles.balanceRecord} d-inline-flex flex-column`}
            >
              <label className={styles.balanceInfoTxt}>Start Time</label>
              <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                2023-08-01 13:00:00
              </div>
            </div>
            <div
              className={`${styles.balanceRecord} d-inline-flex flex-column`}
            >
              <label className={styles.balanceInfoTxt}>Settled date</label>
              <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                2023-08-01 15:00:35
              </div>
            </div>
            <div
              className={`${styles.balanceRecord} d-inline-flex flex-column`}
            >
              <label className={styles.balanceInfoTxt}>Profit/Loss (PBU)</label>
              <div
                className={`${styles.balanceInfoAmt} ${styles.proftStatusLoss} d-inline-flex`}
              >
                1.00
              </div>
            </div>
          </div>
          <div
            className={`${styles.betMoreInfo} col-12 ${
              moreBetInfo === "true" ? "d-inline-block" : "d-none"
            }`}
          >
            <div
              className={`${styles.balanceRecordInfo} ${styles.betTakenInfo} d-inline-flex align-items-center col-12 justify-content-between`}
            >
              <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                118855402
              </span>
              <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                Bet Placed 2023-08-01 14:42:04
              </span>
            </div>
            <div
              className={`${styles.betSlipHeader} col-12 d-flex align-items-center`}
            >
              <span
                className={`${styles.betTag} ${styles.OddbackTag} position-relative d-inline-flex align-items-center`}
              >
                Back
              </span>
              <span className={`${styles.betTeamName} d-inline-block`}>
                England
              </span>
            </div>
            <div className={`${styles.balanceInfoBOx} col-12 d-inline-flex`}>
              <div
                className={`${styles.balanceRecord} d-inline-flex flex-column`}
              >
                <label className={styles.balanceInfoTxt}>Odds req.</label>
                <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                  6.00
                </div>
              </div>
              <div
                className={`${styles.balanceRecord} d-inline-flex flex-column`}
              >
                <label className={styles.balanceInfoTxt}>Stake (PBU)</label>
                <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                  6.00
                </div>
              </div>
              <div
                className={`${styles.balanceRecord} d-inline-flex flex-column`}
              >
                <label className={styles.balanceInfoTxt}>
                  Profit/Loss (PBU)
                </label>
                <div
                  className={`${styles.balanceInfoAmt} ${styles.proftStatusLoss} d-inline-flex`}
                >
                  1.00
                </div>
              </div>
            </div>

            <div
              className={`${styles.balanceRecordInfo} d-inline-flex flex-column align-items-center col-12`}
            >
              <div className="col-12 d-inline-block">
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Back subtotal
                </span>
                <span
                  className={`${styles.betRecordVal} ${styles.proftStatusLoss} d-inline-flex col-8`}
                >
                  (1.00)
                </span>
              </div>
              <div className="col-12 d-inline-block">
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Lay subtotal
                </span>
                <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                  0.00
                </span>
              </div>
              <div className="col-12 d-inline-block">
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Market subtotal
                </span>
                <span
                  className={`${styles.betRecordVal} ${styles.proftStatusLoss} d-inline-flex col-8`}
                >
                  (1.00)
                </span>
              </div>
              <div className="col-12 d-inline-block">
                <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                  Commission
                </span>
                <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                  0.00
                </span>
              </div>
            </div>

            <div
              className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
            >
              <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                Net Market Total
              </span>
              <span
                className={`${styles.betRecordVal} ${styles.proftStatusLoss} d-inline-flex col-8`}
              >
                (1.00)
              </span>
            </div>
          </div>
          <div
            className={`${styles.footerRecord} ${
              moreBetInfo === "true" && styles.footerRecordOpen
            } col-12 d-inline-block position-relative`}
            onClick={showBetInfo}
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
      </div>
    </React.Fragment>
  );
};

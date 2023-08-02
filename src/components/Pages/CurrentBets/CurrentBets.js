import React, { useState, useEffect } from "react";
import styles from "./CurrentBets.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";

export const CurrentBets = () => {
  const TabList = ["Exchange", "Bookmaker", "Fancybet", "Sportsbook", "Parlay"];
  const [popularTabActive, setpopularTabActive] = useState("Exchange");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
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
      <MenuHeader title="Current Bets" />
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
              <label className={styles.balanceInfoTxt}>Avg. Odds</label>
              <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                6.00
              </div>
            </div>
            <div
              className={`${styles.balanceRecord} d-inline-flex flex-column`}
            >
              <label className={styles.balanceInfoTxt}>Matched (PBU)</label>
              <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                1.00
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
              118203097
            </span>
          </div>
          <div
            className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
          >
            <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
              Bet Placed
            </span>
            <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
              2023-07-28 19:23:58
            </span>
          </div>
          <div
            className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
          >
            <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
              Matched Date
            </span>
            <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
              2023-07-28 19:23:58
            </span>
          </div>
          <div
            className={`${styles.betMoreInfo} col-12 ${
              moreBetInfo === "true" ? "d-inline-block" : "d-none"
            }`}
          >
            <div
              className={`${styles.balanceRecordInfo} ${styles.betTakenInfo} d-inline-flex align-items-center col-12`}
            >
              <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                Bet Taken
              </span>
              <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                2023-07-28 19:23:58
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
                <label className={styles.balanceInfoTxt}>Avg. Odds</label>
                <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                  6.00
                </div>
              </div>
              <div
                className={`${styles.balanceRecord} d-inline-flex flex-column`}
              >
                <label className={styles.balanceInfoTxt}>Matched (PBU)</label>
                <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                  1.00
                </div>
              </div>
            </div>

            <div
              className={`${styles.balanceRecordInfo} d-inline-flex align-items-center col-12`}
            >
              <span className={`${styles.betRecordLbl} d-inline-flex col-4`}>
                Liability (PBU)
              </span>
              <span className={`${styles.betRecordVal} d-inline-flex col-8`}>
                --
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

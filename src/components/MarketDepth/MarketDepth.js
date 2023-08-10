import React, { useState, useEffect } from "react";
import styles from "./MarketDepth.module.css";

export const MarketDepth = ({ hideMarketDepth, sethideMarketDepth }) => {
  const [matchInfo, setMathInfo] = useState(false);
  const [betStatusDrop, setbetStatusDrop] = useState(false);
  const [betStatus, setbetStatus] = useState("All");

  const openBetStatusDrop = () => {
    if (betStatusDrop === true) {
      setbetStatusDrop(false);
    } else {
      setbetStatusDrop(true);
    }
  };

  const setBetStatusVal = (val) => {
    setbetStatus(val);
    setbetStatusDrop(false);
  };

  const hideBetLayer = () => {
    setMathInfo(false);
    sethideMarketDepth(false);
  };

  const scrollToNavigate = (direction) => {
    let scrollVal = 0;
    let scrollElem = document.getElementById("navigateButtons");
    let scrollElemVal = document.getElementById("navigateButtons").scrollLeft;
    if (direction === "left") {
      scrollVal = parseInt(scrollElemVal) - parseInt(120);
    } else if (direction === "right") {
      scrollVal = parseInt(scrollElemVal) + parseInt(120);
    }
    scrollElem.scrollLeft = scrollVal;
  };

  useEffect(() => {
    setMathInfo(true);
  }, [hideMarketDepth]);

  return (
    <React.Fragment>
      <div
        className={`${styles.marketLayer} ${
          matchInfo && styles.open
        } m-auto col-12 position-fixed h-100`}
      >
        <div
          className={`${styles.marketContainer} col-12 overflow-hidden position-absolute d-inline-flex flex-column`}
        >
          <div
            className={`${styles.MyBetHeaderRow} col-12 position-relative d-inline-flex align-items-center justify-content-center position-relative`}
          >
            <div
              className={`${styles.myBetTitle} d-inline-flex align-items-center`}
              id="betHeaderTitle"
            >
              Market Depth
            </div>
            <span
              className={`${styles.myBetLayerClose} icon-close position-absolute d-flex justify-content-center align-items-center`}
              onClick={hideBetLayer}
            ></span>
          </div>
          <div
            className={`${styles.matchDepthDetailbox} position-relative flex-column col-12 d-inline-flex`}
          >
            <div
              className={`${styles.gameNameHeader} col-12 d-inline-flex align-items-center justify-content-center`}
            >
              <span className={styles.teamName}>England v Australia</span>
              <div
                className={`${styles.triangleArrow} icon-triangle-black-300 d-inline-block align-baseline`}
              ></div>
              <span className={styles.eventName}>Match Odds</span>
            </div>
            <div
              className={`${styles.betStatusBox} col-12 p-2 d-inline-block position-relative`}
            >
              <div
                className={`${styles.betStatusDrop} ${
                  betStatusDrop && styles.betStatusOpen
                } col-12 d-inline-flex align-items-center position-relative`}
                onClick={openBetStatusDrop}
              >
                <span className={styles.selectedBetStatus}>{betStatus}</span>
                <i
                  className={`${styles.betStatusArrow} position-absolute icon-arrow-down`}
                ></i>
              </div>
              <div
                className={`${styles.betStatusOptions} ${
                  betStatusDrop && styles.betStatusOpen
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
              </div>
            </div>
            <div
              className={`${styles.currentMatchBetInfo} my-3 col-12 d-inline-flex align-items-center`}
            >
              <div
                className={`${styles.matchBetInfoBox} col-4 d-inline-flex flex-column justify-content-center`}
              >
                <span
                  className={`${styles.betStatusTitle} d-inline-flex col-12`}
                >
                  Total matched
                </span>
                <span
                  className={`${styles.betStatusValue} d-inline-flex col-12`}
                >
                  5062.76
                </span>
              </div>
              <div
                className={`${styles.matchBetInfoBox} col-4 d-inline-flex flex-column justify-content-center`}
              >
                <span
                  className={`${styles.betStatusTitle} d-inline-flex col-12`}
                >
                  Selection Volume
                </span>
                <span
                  className={`${styles.betStatusValue} d-inline-flex col-12`}
                >
                  4194.42
                </span>
              </div>
              <div
                className={`${styles.matchBetInfoBox} col-4 d-inline-flex flex-column justify-content-center`}
              >
                <span
                  className={`${styles.betStatusTitle} d-inline-flex col-12`}
                >
                  Last price
                </span>
                <span
                  className={`${styles.betStatusValue} d-inline-flex col-12`}
                >
                  1.01
                </span>
              </div>
            </div>
            <div
              className={`${styles.backLayTitleRow} col-12 d-inline-flex align-items-center justify-content-center`}
            >
              Price, Exchange Available and Traded
            </div>
            <div
              className={`${styles.navigateButtons} col-12 d-inline-flex justify-content-between`}
            >
              <button
                className={`${styles.navigateBtn} ${styles.backBetButton} d-inline-flex align-items-center`}
                onClick={() => scrollToNavigate("left")}
              >
                <i className={`${styles.navigateArrow} icon-arrow-left`}></i>
                to Back
              </button>
              <button
                className={`${styles.navigateBtn} ${styles.layBetButton} d-inline-flex align-items-center`}
                onClick={() => scrollToNavigate("right")}
              >
                to Lay
                <i className={`${styles.navigateArrow} icon-arrow-left`}></i>
              </button>
            </div>
            <div
              className={`${styles.betBoxScroll} col-12 d-inline-flex`}
              id="navigateButtons"
            >
              <div
                className={`${styles.betAvailBox} d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.betOddValue} ${styles.betAvailBack}  col-12 d-inline-flex flex-column align-items-center`}
                >
                  <span className={styles.oddsValueAmt}>1.01</span>
                  <span className={styles.oddsValueStat}>67.76</span>
                </div>
                <span className={`${styles.oddsValueCount} text-center col-12`}>
                  939.22
                </span>
              </div>
              <div
                className={`${styles.betAvailBox} d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.betOddValue} ${styles.betAvailBack}  col-12 d-inline-flex flex-column align-items-center`}
                >
                  <span className={styles.oddsValueAmt}>1.01</span>
                  <span className={styles.oddsValueStat}>67.76</span>
                </div>
                <span className={`${styles.oddsValueCount} text-center col-12`}>
                  939.22
                </span>
              </div>
              <div
                className={`${styles.betAvailBox} d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.betOddValue} ${styles.betAvailBack}  col-12 d-inline-flex flex-column align-items-center`}
                >
                  <span className={styles.oddsValueAmt}>1.01</span>
                  <span className={styles.oddsValueStat}>67.76</span>
                </div>
                <span className={`${styles.oddsValueCount} text-center col-12`}>
                  939.22
                </span>
              </div>
              <div
                className={`${styles.betAvailBox} d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.betOddValue} ${styles.betAvailBack}  col-12 d-inline-flex flex-column align-items-center`}
                >
                  <span className={styles.oddsValueAmt}>1.01</span>
                  <span className={styles.oddsValueStat}>67.76</span>
                </div>
                <span className={`${styles.oddsValueCount} text-center col-12`}>
                  939.22
                </span>
              </div>
              <div
                className={`${styles.betAvailBox} d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.betOddValue} ${styles.betAvailLay}  col-12 d-inline-flex flex-column align-items-center`}
                >
                  <span className={styles.oddsValueAmt}>1.01</span>
                  <span className={styles.oddsValueStat}>67.76</span>
                </div>
                <span className={`${styles.oddsValueCount} text-center col-12`}>
                  939.22
                </span>
              </div>
              <div
                className={`${styles.betAvailBox} d-inline-flex flex-column`}
              >
                <div
                  className={`${styles.betOddValue} ${styles.betAvailBack}  col-12 d-inline-flex flex-column align-items-center`}
                >
                  <span className={styles.oddsValueAmt}>1.01</span>
                  <span className={styles.oddsValueStat}>67.76</span>
                </div>
                <span className={`${styles.oddsValueCount} text-center col-12`}>
                  939.22
                </span>
              </div>
            </div>
            <p
              className={`${styles.aboutMarketInfo} m-0 col-12 d-inline-block`}
            >
              The information on this page may be slightly delayed.
            </p>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

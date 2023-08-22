import React, { useState, useEffect } from "react";
import styles from "./FancyBookOdds.module.css";

export const FancyBookOdds = ({fancyBookOdd, setFancyBookOdds,selection }) => {
  const [matchInfo, setMathInfo] = useState(false);

  const hideBetLayer = () => {
    setMathInfo(false);
    setTimeout(function () {
      setFancyBookOdds(false);
    }, 500);
  };

  useEffect(() => {
    setMathInfo(true);
  }, [fancyBookOdd]);

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
            >
              Book Position
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
              <span className={styles.teamName}>
                <strong>{selection.teamone}</strong> vs <strong>{selection.teamtwo}</strong>
              </span>
              <div
                className={`${styles.triangleArrow} icon-triangle-black-300 d-inline-block align-baseline`}
              ></div>
              <span className={styles.eventName}>
                {selection.name}
              </span>
            </div>
            <div
              className={`${styles.backLayTitleRow} col-12 d-inline-flex align-items-center`}
            >
              Runs
            </div>
            <div
              className={`${styles.allMatchBetInfo} col-12 d-inline-flex align-items-center`}
            >
              <div
                className={`${styles.oddsBetRow} ${styles.positiveValue} col-12 d-inline-flex align-items-stretch`}
              >
                <div
                  className={`${styles.oddsValue} col-4 d-inline-flex align-items-center`}
                >
                  {selection.aboveValue} and above
                </div>
                <div
                  className={`${styles.oddsStake} col-9 d-inline-flex align-items-center`}
                >
                  {selection.abovePL}
                </div>
              </div>
              <div
                className={`${styles.oddsBetRow} col-12 d-inline-flex align-items-stretch`}
              >
                <div
                  className={`${styles.oddsValue} col-3 d-inline-flex align-items-center`}
                >
                  {selection.belowValue} and below
                </div>
                <div
                  className={`${styles.oddsStake} col-9 d-inline-flex align-items-center`}
                >
                  {selection.belowPL}
                </div>
              </div>
              <div
                className={`${styles.oddsBetRow} col-12 d-inline-flex align-items-stretch`}
              >
                <div
                  className={`${styles.oddsValue} col-3 d-inline-flex align-items-center`}
                >
                  0
                </div>
                <div
                  className={`${styles.oddsStake} col-9 d-inline-flex align-items-center`}
                >
                  1.00
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "../MatchOdds/MatchOdds.module.css";

export const PremiumOdds = ({ oddsList }) => {
  return (
    <React.Fragment>
      {oddsList?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${styles.singlePopularBet} col-12 mb-1 d-inline-flex flex-column position-relative`}
          >
            <div
              className={`${styles.popularTabTitle} col-12 d-inline-flex position-relative align-items-center`}
            >
              <div className={`d-inline-flex align-items-center`}>
                <i className="icon-star"></i>
                <label className={styles.popularOddTitle}>
                  {item.marketName}
                </label>
              </div>
              <i
                className={`${styles.gameOpenArrow} position-absolute icon-arrow-down`}
              ></i>
            </div>
            <div
              className={`${styles.poplarOddRow} position-relative col-12 d-inline-flex justify-content-end flex-wrap`}
            >
              {item?.sportsBookSelection?.map((selection, selectionIndex) => {
                return (
                  <div
                    key={selectionIndex}
                    className={`${styles.popularOddsStake} d-inline-flex flex-column align-items-center justify-content-center me-auto`}
                  >
                    <span
                      className={`${styles.popularExposure} ${styles.oddExposure}`}
                    >
                      {selection.selectionName}
                    </span>
                    <span className={`${styles.oddStake}`}>
                      {selection.odds}
                    </span>
                  </div>
                );
              })}
              {/* SUSPEND BOX */}
              {item.marketStatus != 1 && (
                <div
                  className={`${styles.oddsDisabled} text-capitalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                >
                  Suspend
                </div>
              )}
              {/* END SUSPEND BOX */}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

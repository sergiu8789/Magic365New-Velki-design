import React, { useState } from "react";
import styles from "./BetPlacePopup.module.css";

export const BetPlacePopup = () => {
  const [betStatus, setbetStatus] = useState(true);
  const closeMatchBet = () => {};
  return (
    <React.Fragment>
      <div
        className={`${styles.betPlacePopup} ${
          betStatus === true ? styles.betMatchSuccess : styles.betMatchFailed
        } position-fixed m-auto col-12 d-inline-flex flex-column overflow-hidden`}
      >
        <div
          className={`${styles.betheaderRow} col-12 d-inline-flex justify-content-center position-relative`}
        >
          <div
            className={`${styles.betMatchTitle} d-inline-flex align-items-center`}
          >
            <i className="icon-check-circle"></i>
            <span className={styles.betStatusName}>Bet Matched</span>
          </div>
          <i
            className={`${styles.closeMatchClose} icon-close position-absolute d-inline-flex align-items-center justify-content-center`}
            onClick={closeMatchBet}
          ></i>
        </div>
        <div
          className={`${styles.matchBetDetail} col-12 d-inline-flex align-items-stretch`}
        >
          <span className={`${styles.matchName} flex-grow-1 d-inline-flex`}>
            Borussia Monchengladbach SRL
          </span>
          <span
            className={`${styles.matchLoss} ${styles.matchLossBox} flex-shrink-0 d-inline-flex`}
          >
            PBU 1
          </span>
          <span className={`${styles.matchOdds} flex-shrink-0 d-inline-flex`}>
            1.68
          </span>
        </div>
      </div>
    </React.Fragment>
  );
};

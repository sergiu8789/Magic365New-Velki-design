import React, { useState } from "react";
import styles from "./BetPlacePopup.module.css";

export const BetPlacePopup = () => {
  return (
    <React.Fragment>
      <div
        className={`${styles.betPlacePopup} position-fixed m-auto col-12 d-inline-flex`}
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
        </div>
      </div>
    </React.Fragment>
  );
};

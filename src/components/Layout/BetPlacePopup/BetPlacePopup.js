import React, { useEffect, useState } from "react";
import styles from "./BetPlacePopup.module.css";

export const BetPlacePopup = ({
  status,
  betbox,
  title,
  message,
  type,
  setPassChange,
}) => {
  const [betStatus, setbetStatus] = useState(true);
  const [betshow, setbetshow] = useState(false);

  const closeMatchBet = () => {
    setbetshow(false);
    setbetStatus(true);
    setPassChange(false);
  };

  useEffect(() => {
    let clearTime = "";
    setbetStatus(status);
    setbetshow(betbox);
    clearTimeout(clearTime);
    clearTime = setTimeout(function () {
      closeMatchBet();
    }, 6000);
  }, status);

  return (
    <React.Fragment>
      <div
        className={`${styles.betPlacePopup} ${
          betStatus === true ? styles.betMatchSuccess : styles.betMatchFailed
        } ${
          betshow && styles.showBetStatus
        } position-fixed m-auto col-12 d-inline-flex flex-column overflow-hidden`}
      >
        <div
          className={`${styles.betheaderRow} col-12 d-inline-flex justify-content-center position-relative`}
        >
          <div
            className={`${styles.betMatchTitle} d-inline-flex align-items-center`}
          >
            {betStatus === true ? (
              <i className="icon-check-circle"></i>
            ) : (
              <i className="icon-info-circle"></i>
            )}
            <span className={styles.betStatusName}>{title}</span>
          </div>
          <i
            className={`${styles.closeMatchClose} icon-close position-absolute d-inline-flex align-items-center justify-content-center`}
            onClick={closeMatchBet}
          ></i>
        </div>
        <div
          className={`${styles.matchBetDetail} col-12 d-inline-flex align-items-stretch`}
        >
          {type === "0" ? (
            <React.Fragment>
              <span className={`${styles.matchName} flex-grow-1 d-inline-flex`}>
                Borussia Monchengladbach SRL
              </span>
              <span
                className={`${styles.matchLoss} ${styles.matchLossBox} flex-shrink-0 d-inline-flex`}
              >
                PBU 1
              </span>
              <span
                className={`${styles.matchOdds} flex-shrink-0 d-inline-flex`}
              >
                1.68
              </span>
            </React.Fragment>
          ) : type === "1" ? (
            <span
              className={`${styles.matchName} flex-grow-1 justify-content-center col-12 d-inline-flex`}
            >
              {message}
            </span>
          ) : (
            <></>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

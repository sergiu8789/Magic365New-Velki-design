import React, { useEffect, useState } from "react";
import styles from "./BetPlacePopup.module.css";
import { useExposure } from "../../../context/ExposureContextProvider";

export const BetPlacePopup = ({ status, show, setShow, title, betDetails }) => {
  const expoData = useExposure();
  useEffect(() => {
    if (show) {
      expoData.setExchangeExpoData({
        ...expoData.exchangeExpoData,
        oldExpo: expoData.exchangeExpoData.updatedExpo,
      });
      expoData.setBookmakerExpoData({
        ...expoData.bookmakerExpoData,
        oldExpo: expoData.bookmakerExpoData.updatedExpo,
      });
      setTimeout(function () {
        setShow(false);
      }, 6000);
    }
  }, [show]);

  return (
    <React.Fragment>
      <div
        className={`${styles.betPlacePopup} ${
          status ? styles.betMatchSuccess : styles.betMatchFailed
        } ${
          show && styles.showBetStatus
        } position-fixed m-auto col-12 d-inline-flex flex-column overflow-hidden`}
      >
        <div
          className={`${styles.betheaderRow} col-12 d-inline-flex justify-content-center position-relative`}
        >
          <div
            className={`${styles.betMatchTitle} d-inline-flex align-items-center`}
          >
            {status ? (
              <i className="icon-check-circle"></i>
            ) : (
              <i className="icon-info-circle"></i>
            )}
            <span className={styles.betStatusName}>{title}</span>
          </div>
          <i
            className={`${styles.closeMatchClose} icon-close position-absolute d-inline-flex align-items-center justify-content-center`}
            onClick={() => setShow(false)}
          ></i>
        </div>
        <div
          className={`${styles.matchBetDetail} col-12 d-inline-flex align-items-stretch`}
        >
          
          {betDetails?.runner_name ?
            <React.Fragment>
            <span
              className={`${styles.betTag} ${
                betDetails.type === 1 ? styles.OddbackTag : styles.OddLayTag
              } position-relative d-inline-flex align-items-center`}
            >
              {betDetails.type === 1 ? "Back" : "Lay"}
            </span>
            <span className={`${styles.matchName} flex-grow-1 d-inline-flex`}>
              {betDetails.runner_name}
            </span>
            <span
              className={`${styles.matchLoss} ${styles.matchLossBox} flex-shrink-0 d-inline-flex`}
            >
              PBU {betDetails.amount}
            </span>
            <span className={`${styles.matchOdds} flex-shrink-0 d-inline-flex`}>
              {betDetails.odds}
              </span>
            </React.Fragment>
            : <span className="col-12 text-center">{betDetails.message}</span>
          }          
        </div>
      </div>
    </React.Fragment>
  );
};

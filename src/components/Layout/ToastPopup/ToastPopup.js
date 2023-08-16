import React, { useEffect, useState } from "react";
import styles from "./ToastPopup.module.css";

export const ToastPopup = ({
  status,
  betbox,
  title,
  message,
  setPassChange,
}) => {
  useEffect(() => {
    if (status) {
      setTimeout(function () {
        setPassChange(false);
      }, 6000);
    }
  }, [status]);

  const closeToast = () => {
    setPassChange(false);
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.betPlacePopup} ${
          status ? styles.betMatchSuccess : styles.betMatchFailed
        } ${
          betbox && styles.showBetStatus
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
            onClick={() => closeToast()}
          ></i>
        </div>
        <div
          className={`${styles.matchBetDetail} col-12 d-inline-flex align-items-center justify-content-center`}
        >
          <span className={`${styles.matchName} d-inline-flex`}>{message}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

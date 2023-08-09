import React from "react";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import styles from "./BalanceOverview.module.css";
import { useAuth } from "../../../context/AuthContextProvider";

export const BalanceOverview = () => {
  const auth = useAuth();
  return (
    <React.Fragment>
      <MenuHeader title="Balance Overview" />
      <div className={`col-12 p-3`}>
        <div
          className={`${styles.balanceAmtBox} col-12 d-inline-flex flex-column mb-3`}
        >
          <label className={styles.balanceText}>Your Balances</label>
          <div className="d-flex col-12 align-items-center">
            <span
              className={`${styles.currencyAlias} d-inline-flex align-items-center`}
            >
              PBU
            </span>
            <span className={`${styles.balanceAmt} d-inline-flex`}>
              {auth.auth.walletBalance
                ? parseFloat(auth.auth.walletBalance).toFixed(2)
                : 0}
            </span>
          </div>
        </div>
        <div
          className={`col-12 d-inline-block overflow-hidden ${styles.balanceDepositRecord}`}
        >
          <div
            className={`${styles.balanceHeaderTime} col-12 d-inline-flex align-items-center`}
          >
            2023-06-26 19:45:15
          </div>
          <div
            className={`${styles.balanceInfoBOx} col-12 d-inline-flex flex-column`}
          >
            <div className="col-12 d-inline-flex">
              <div
                className={`${styles.balanceRecord} d-inline-flex flex-column`}
              >
                <label className={styles.balanceInfoTxt}>Deposit</label>
                <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                  {auth.auth.walletBalance
                    ? parseFloat(auth.auth.walletBalance).toFixed(2)
                    : 0}
                </div>
              </div>
              <div
                className={`${styles.balanceRecord} d-inline-flex flex-column`}
              >
                <label className={styles.balanceInfoTxt}>Balance</label>
                <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                  {auth.auth.walletBalance
                    ? parseFloat(auth.auth.walletBalance).toFixed(2)
                    : 0}
                </div>
              </div>
            </div>
            <div
              className={`${styles.balanceRecordRow} col-12 d-inline-flex align-items-center`}
            >
              <span>Master</span>
              <span
                className={`${styles.recordTraingle} icon-triangle-black-400`}
              ></span>
              <span>{auth?.auth?.user?.username}</span>
            </div>
            <div
              className={`${styles.balanceRecordRow} col-12 d-inline-flex align-items-center`}
            ></div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

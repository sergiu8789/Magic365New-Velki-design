import React, { useState, useEffect } from "react";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import styles from "./BalanceOverview.module.css";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";
import { AppContext, useApp } from "../../../context/AppContextProvider";
import { changeDateYearFormat, formatTime } from "../../../utils/helper";

export const BalanceOverview = () => {
  const auth = useAuth();
  const appData = useApp();
  const [page, setPage] = useState(1);
  const [transactionList, setTransactionList] = useState([]);
  const [totalRecords, setTotalRecords] = useState(0);

  const handlePage = (state) => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    if (state === "next") {
      let newPage = page + 1;
      setPage(newPage);
    } else {
      if (page > 1) {
        let newPage = page - 1;
        setPage(newPage);
      }
    }
    document.getElementById("centerMobileMode").scrollTop = 0;
  };

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    const result = ApiService.transactionHistory(page);
    result
      .then((res) => {
        appData.setAppData({ ...appData.appData, listLoading: false });
        setTransactionList(res.data.data);
        setTotalRecords(res.data.count);
      })
      .catch((err) => {
        appData.setAppData({ ...appData.appData, listLoading: false });
        if (
          err?.response?.data?.statusCode === 401 &&
          err?.response?.data?.message === "Unauthorized"
        ) {
          localStorage.removeItem("token");
          auth.setAuth({
            ...auth.auth,
            isloggedIn: false,
            user: {},
            showSessionExpire: true,
          });
        }
      });
  }, [page]);

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
          className={`col-12 d-inline-flex flex-column overflow-hidden ${styles.allbalanceRecords}`}
        >
          {transactionList?.map((item, index) =>
            item.type === "Credit" || item.type === "Debit" ? (
              <div
                className={`col-12 d-inline-block overflow-hidden ${styles.balanceDepositRecord}`}
                key={index}
              >
                <div
                  className={`${styles.balanceHeaderTime} col-12 d-inline-flex align-items-center`}
                >
                  {changeDateYearFormat(item.createdAt) +
                    " " +
                    formatTime(item.createdAt)}
                </div>
                <div
                  className={`${styles.balanceInfoBox} col-12 d-inline-flex flex-column`}
                >
                  <div className="col-12 d-inline-flex">
                    <div
                      className={`${styles.balanceRecord} d-inline-flex flex-column`}
                    >
                      <label className={styles.balanceInfoTxt}>
                        {item.type}
                      </label>
                      <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                        {item.type === "Credit"
                          ? item.amount
                          : "-"
                          ? item.type === "Debit"
                            ? item.amount
                            : "-"
                          : ""}
                      </div>
                    </div>
                    <div
                      className={`${styles.balanceRecord} d-inline-flex flex-column`}
                    >
                      <label className={styles.balanceInfoTxt}>Balance</label>
                      <div className={`${styles.balanceInfoAmt} d-inline-flex`}>
                        {item.running_balance ? item.running_balance : "-"}
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.balanceRecordRow} col-12 d-inline-flex align-items-center`}
                  >
                    <span>{item.to_username}</span>
                    <span
                      className={`${styles.recordTraingle} icon-triangle-black-400`}
                    ></span>
                    <span>{item.from_username}</span>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )
          )}
        </div>
      </div>
      <div
        className={`${styles.activePaginate} col-12 ${
          totalRecords > 1 ? "d-inline-flex" : "d-none"
        } align-items-center justify-content-between`}
      >
        <div className="col-6 px-3">
          <button
            className={`${styles.navigateBtn} ${styles.leftnavigateBtn}  ${
              page === 1 && styles.navigateDisable
            } col-12 d-inline-flex align-items-center justify-content-center position-relative`}
            onClick={() => handlePage("previous")}
          >
            <i
              className={`${styles.arrow} icon-arrow-left position-absolute d-inline-flex`}
            ></i>
            Previous
          </button>
        </div>
        <div className="col-6 px-3">
          <button
            className={`${styles.navigateBtn}  ${styles.rightnavigateBtn} ${
              totalRecords === page && styles.navigateDisable
            } col-12 d-inline-flex align-items-center justify-content-center position-relative`}
            onClick={() => handlePage("next")}
          >
            Next
            <i
              className={`${styles.arrow} icon-arrow-left position-absolute d-inline-flex`}
            ></i>
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

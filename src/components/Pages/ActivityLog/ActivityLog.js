import React, { useState, useEffect, useContext } from "react";
import styles from "./ActivityLog.module.css";
import { NoData } from "../../Layout/NoData/NoData";
import ApiService from "../../../services/ApiService";
import { AuthContext } from "../../../context/AuthContextProvider";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import { changeDateFormat, formatTime } from "../../../utils/helper";
import { useApp } from "../../../context/AppContextProvider";

export const ActivityLog = () => {
  const auth = useContext(AuthContext);
  const appData = useApp();
  const [activityLogsList, setActivityLogsList] = useState([]);
  const [page, setPage] = useState(1);
  const [betStatusDrop, setbetStatusDrop] = useState(false);
  const [betStatus, setbetStatus] = useState("Active Log");
  const [totalRecords, setTotalRecords] = useState(0);

  const openBetStatusDrop = () => {
    if (betStatusDrop === true) {
      setbetStatusDrop(false);
    } else {
      setbetStatusDrop(true);
    }
  };

  const setBetStatusVal = (val) => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    setbetStatus(val);
    setbetStatusDrop(false);
  };

  const filterIpAddress = (ip) => {
    let newIp = ip.replace("::ffff:", "");
    return newIp;
  };

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
    ApiService.activityLogs(page)
      .then((res) => {
        let totalPage = res.data.count / 10;
        totalPage = Math.ceil(totalPage);
        setTotalRecords(totalPage);
        setActivityLogsList(res.data.data);
        appData.setAppData({ ...appData.appData, listLoading: false });
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
      <MenuHeader title={betStatus} />

      <div
        className={`${styles.betStatusBox} col-12 p-2 d-inline-block position-relative`}
      >
        <div
          className={`${styles.betStatusDrop} ${
            betStatusDrop === true && styles.betStatusOpen
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
            betStatusDrop === true && styles.betStatusOpen
          } position-absolute`}
        >
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "Active Log" ? "d-none" : "d-flex"
            } align-items-center col-12 m-0`}
            value="1"
            onClick={() => setBetStatusVal("Active Log")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Active Log
            </span>
          </p>
          <p
            className={`${styles.betStatusItem} ${
              betStatus === "Change Password Log" ? "d-none" : "d-flex"
            } d-flex align-items-center col-12 m-0`}
            value="2"
            onClick={() => setBetStatusVal("Change Password Log")}
          >
            <span
              className={`${styles.betStatusText} d-flex position-relative`}
            >
              Change Password Log
            </span>
          </p>
        </div>
      </div>
      {/* Activiy Logs */}
      <div
        className={`${styles.allActivityList} col-12 ${
          betStatus === "Active Log" ? "d-inline-flex" : "d-none"
        } flex-column p-3`}
      >
        {totalRecords === 0 && <NoData title="No Logs" />}
        {activityLogsList?.map((item, index) =>
          item ? (
            <React.Fragment key={index}>
              <div
                className={`${styles.acitivityLogBox} col-12 overflow-hidden d-inline-block`}
              >
                <label
                  className={`${styles.activityheader} col-12 d-inline-block`}
                >
                  {changeDateFormat(item.createdAt) +
                    " " +
                    formatTime(item.createdAt)}
                </label>
                <div
                  className={`${styles.activeStatusBox} col-12 d-inline-flex flex-column`}
                >
                  <span
                    className={`${styles.activeStatusTitle} col-12 d-inline-flex`}
                  >
                    Login Status
                  </span>
                  <span
                    className={`${styles.activeStatusValue} col-12 d-inline-flex`}
                  >
                    Login Success
                  </span>
                </div>
                <div
                  className={`${styles.recordChartRow} col-12 d-inline-flex align-items-center`}
                >
                  <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
                    IP Address
                  </span>
                  <span className={`${styles.recordValue} col-8 d-inline-flex`}>
                    {filterIpAddress(item.ip)}
                  </span>
                </div>
                <div
                  className={`${styles.recordChartRow} col-12 d-inline-flex align-items-center`}
                >
                  <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
                    ISP
                  </span>
                  <span className={`${styles.recordValue} col-8 d-inline-flex`}>
                    {item.isp}
                  </span>
                </div>
                <div
                  className={`${styles.recordChartRow} col-12 d-inline-flex align-items-center`}
                >
                  <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
                    City / State / Country
                  </span>
                  <span className={`${styles.recordValue} col-8 d-inline-flex`}>
                    {item.location}
                  </span>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <NoData />
          )
        )}
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
      </div>
      {/* Change Password Log */}
      <div
        className={`${styles.allActivityList} col-12 ${
          betStatus === "Change Password Log" ? "d-inline-flex" : "d-none"
        } flex-column p-3`}
      >
        <div
          className={`${styles.acitivityLogBox} col-12 overflow-hidden d-inline-block`}
        >
          <label className={`${styles.activityheader} col-12 d-inline-block`}>
            2023-07-29 17:17:52
          </label>
          <div
            className={`${styles.activeStatusBox} col-12 d-inline-flex flex-column`}
          >
            <span
              className={`${styles.activeStatusTitle} col-12 d-inline-flex`}
            >
              Password Status
            </span>
            <span
              className={`${styles.activeStatusValue} col-12 d-inline-flex`}
            >
              Password Change Success
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              IP Address
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              122.176.40.149
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              ISP
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              Bharti Airtel Ltd.
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              City / State / Country
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              Delhi, Delhi, IN
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

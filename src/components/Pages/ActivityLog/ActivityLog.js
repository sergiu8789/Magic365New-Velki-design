import React, { useState } from "react";
import styles from "./ActivityLog.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";

export const ActivityLog = () => {
  const [betStatusDrop, setbetStatusDrop] = useState("false");
  const [betStatus, setbetStatus] = useState("Active Log");
  const openBetStatusDrop = () => {
    if (betStatusDrop === "true") {
      setbetStatusDrop("false");
    } else {
      setbetStatusDrop("true");
    }
  };

  const setBetStatusVal = (val) => {
    setbetStatus(val);
    setbetStatusDrop("false");
  };
  return (
    <React.Fragment>
      <MenuHeader title={betStatus} />

      <div
        className={`${styles.betStatusBox} col-12 p-2 d-inline-block position-relative`}
      >
        <div
          className={`${styles.betStatusDrop} ${
            betStatusDrop === "true" && styles.betStatusOpen
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
            betStatusDrop === "true" && styles.betStatusOpen
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

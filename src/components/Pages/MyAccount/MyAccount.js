import React from "react";
import styles from "./MyAccount.module.css";
import { useNavigate } from "react-router-dom";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";

export const MyAccount = () => {
  const navigate = useNavigate();

  const showChangePass = () => {
    let LoginRand = Math.floor(Math.random() * 100000) + 1;
    navigate("/change-password", { state: { login: LoginRand } });
  };
  return (
    <React.Fragment>
      <MenuHeader title="My Profile" />
      <div
        className={`${styles.MyAccountInfo} col-12 d-inline-flex flex-column p-3`}
      >
        <div
          className={`${styles.acitivityLogBox} col-12 overflow-hidden d-inline-block`}
        >
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex position-relative align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              First Name
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              Sergiu
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex position-relative align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              Last Name
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              G
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex position-relative align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              Email
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              surjo365@gmail.com
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex position-relative align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              Contact Number
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              01737010197
            </span>
          </div>
          <div
            className={`${styles.recordChartRow} col-12 d-inline-flex position-relative align-items-center`}
          >
            <span className={`${styles.recordTitle} col-4 d-inline-flex`}>
              Password
            </span>
            <span className={`${styles.recordValue} col-8 d-inline-flex`}>
              Delhi, Delhi, IN
            </span>
            <span
              className={`${styles.changePassBtn} position-absolute d-inline-flex align-items-center`}
              onClick={showChangePass}
            >
              <i className="icon-edit"></i>
              <span>Edit</span>
            </span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

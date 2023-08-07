import React from "react";
import logoImage from "../../../assets/images/logo.png";
import styles from "./SignUp.module.css";

export const signUpNav = () => {
  return (
    <div
      className={`${styles.signUpNavRow} col-12 d-inline-flex align-items-center`}
    >
      <span className={styles.signNav}>
        <i className="icon-home"></i>
      </span>
      <span className={`${styles.signNav} d-inline-flex align-items-center`}>
        <i className="icon-info-circle"></i>
        <label className={styles.navName}>SERVICE</label>
      </span>
      <span className={`${styles.signNav} d-inline-flex align-items-center`}>
        <i className="icon-home"></i>
        <label className={styles.navName}>ADMIN</label>
      </span>
      <span className={`${styles.signNav} d-inline-flex align-items-center`}>
        <i className="icon-home"></i>
        <label className={styles.navName}>SUPER</label>
      </span>
      <span className={`${styles.signNav} d-inline-flex align-items-center`}>
        <i className="icon-home"></i>
        <label className={styles.navName}>MASTER</label>
      </span>
      <span className={`${styles.signNav} d-inline-flex align-items-center`}>
        <i className="icon-home"></i>
        <label className={styles.navName}>Old/New</label>
      </span>
    </div>
  );
};

export const SignUp = () => {
  return (
    <React.Fragment>
      <div className={`col-12 d-inline-block`}>
        <div className={`${styles.signUpHeader} col-12 text-center`}>
          <img src={logoImage} className={styles.signUpHeaderImg} />
        </div>
      </div>
    </React.Fragment>
  );
};

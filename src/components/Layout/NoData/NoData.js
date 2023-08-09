import React from "react";
import styles from "./NoData.module.css";

export const NoData = ({ title }) => {
  return (
    <React.Fragment>
      <div
        className={`${styles.noDataBox} col-12 d-inline-flex align-items-center justify-content-center`}
      >
        <div
          className={`${styles.noDataContainer} d-inline-flex flex-column align-items-center justify-content-center`}
        >
          <i className="icon-empty"></i>
          <span className={styles.noDataText}>{title}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

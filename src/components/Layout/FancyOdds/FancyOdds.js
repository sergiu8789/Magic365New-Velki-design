import React from "react";
import styles from "./FancyOdds.module.css";

export const FancyOdds = ({ oddsList }) => {
  return (
    <React.Fragment>
      <div className="col-12 d-inline-flex justify-content-end">
        <div className="col-4 d-inline-flex align-items-center">
          <span
            className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
          >
            No
          </span>
          <span
            className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
          >
            Yes
          </span>
        </div>
      </div>
      {oddsList?.map((item, index) => {
        return (
          <React.Fragment key={index}>
            <div
              className="position-relative col-12 d-inline-flex flex-wrap"
            >
              <div
                className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
              >
                <div
                  className={`${styles.gameName} d-inline-flex align-items-center col-8`}
                >
                  {item.nat}
                </div>
                <div
                  className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                >
                  <div
                    className={`${styles.LayBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                  >
                    <span className={`${styles.oddStake}`}>{item.l1}</span>
                    <span className={`${styles.oddExposure}`}>{item.ls1}</span>
                  </div>
                  <div
                    className={`${styles.backBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                  >
                    <span className={`${styles.oddStake}`}>{item.b1}</span>
                    <span className={`${styles.oddExposure}`}>{item.bs1}</span>
                  </div>
                  {/* SUSPEND BOX */}
                  {item.gstatus != "" && (
                    <div
                      className={`${styles.oddsDisabled} text-capitalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                    >
                      {item.gstatus}
                    </div>
                  )}
                  {/* END SUSPEND BOX */}
                </div>
              </div>
            </div>
            <div className="col-12 d-inline-flex align-items-center justify-content-end mt-1">
              <div
                className={`${styles.betMinMaxAmt} d-inline-flex justify-content-end align-items-center`}
              >
                <i className="icon-min-max"></i>
                <span className={styles.minText}>min/max</span>
                <span className={styles.betMinMax}>
                  {/* {item.min}/{item.max} */}
                  1/500
                </span>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </React.Fragment>
  );
};

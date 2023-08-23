import React from "react";
import styles from "./NoInternet.module.css";
import wifi from "../../../assets/images/wifi.png";

export const NoInternet = () => {
  return (
    <React.Fragment>
      <div
        className={`${styles.NoInternetLayer} m-auto col-12 position-fixed h-100 d-flex`}
      >
        <div
          className={`${styles.NoInternetContainer} position-relative d-inline-flex flex-column h-100 align-items-center justify-content-center`}
        >
          <img src={wifi} alt="No Internet" className={styles.noInternetSvg} />
          <label className={`${styles.noInternetLabel} col-12 text-center`}>
            Oops, No Internet Connection
          </label>
          <p className={`${styles.intertErrorMsg} col-12 text-center`}>
            Make sure wifi or cellular data is turned on and then try again.
          </p>
          <div className="col-12 d-inline-flex justify-content-center">
            <button
              className={`${styles.networkTry} d-inline-flex align-items-center text-uppercase`}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

import React, { useState } from "react";
import styles from "./Loader.module.css";

export const Loader = () => {
  const [loaderStatus, setLoaderStatus] = useState(false);

  return (
    <React.Fragment>
      <div
        className={`${styles.loaderLayer} ${
          loaderStatus === true ? "d-inline-flex" : "d-none"
        } position-fixed m-auto col-12 p-5 h-100 align-items-center justify-content-center`}
      >
        <div
          className={`${styles.loaderContainer} d-inline-flex align-items-center justify-content-center position-relative `}
        >
          <div
            className={`${styles.loadingSpiner} position-relative d-inline-block col-6`}
          ></div>
        </div>
      </div>
    </React.Fragment>
  );
};

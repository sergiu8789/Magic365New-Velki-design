import React, { useState } from "react";
import styles from "./Settings.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";

export const Settings = () => {
  const [highlightOdds, sethighlightOdds] = useState(true);
  const [fullMarket, setfullMarket] = useState(true);
  const changeFullMarket = () => {
    if (fullMarket) {
      setfullMarket(false);
    } else {
      setfullMarket(true);
    }
  };

  const changeMarketOdds = () => {
    if (highlightOdds) {
      sethighlightOdds(false);
    } else {
      sethighlightOdds(true);
    }
  };
  return (
    <React.Fragment>
      <MenuHeader title="Settings" />
      <div className={`col-12 d-inline-block p-4`}>
        <h5 className={`col-12 d-inline-block`}>Odds</h5>
        <div
          className={`${styles.settingBoxRow} mt-1 mb-2 col-12 d-inline-flex justify-content-between align-items-center`}
        >
          <span className={`${styles.settingToggleTitle} d-inline-block`}>
            Highlight when odds change
          </span>
          <div
            className={`${styles.toggleSwitch} position-relative d-inline-block`}
          >
            <input
              id="settingOdds"
              className={`${styles.btntoggle} position-absolute`}
              type="checkbox"
              checked={highlightOdds}
              onClick={changeMarketOdds}
            />
            <label
              className={styles.btntoggleLabel}
              htmlFor="settingOdds"
            ></label>
          </div>
        </div>
        <h5 className={`col-12 d-inline-block`}>Events Widget</h5>
        <div
          className={`${styles.settingBoxRow} mt-1 mb-2 col-12 d-inline-flex justify-content-between align-items-center`}
        >
          <span className={`${styles.settingToggleTitle} d-inline-block`}>
            Show in Full-Markets
          </span>
          <div
            className={`${styles.toggleSwitch} position-relative d-inline-block`}
          >
            <input
              id="settingEventsWidget"
              className={`${styles.btntoggle} position-absolute`}
              type="checkbox"
              checked={fullMarket}
              onClick={changeFullMarket}
            />
            <label
              className={styles.btntoggleLabel}
              htmlFor="settingEventsWidget"
            ></label>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

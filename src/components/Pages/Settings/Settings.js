import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import { useApp } from "../../../context/AppContextProvider";

export const Settings = () => {
  const appData = useApp();
  const [highlightOdds, sethighlightOdds] = useState(true);
  const [fullMarket, setfullMarket] = useState(true);

  const changeFullMarket = () => {
    if (fullMarket) {
      setfullMarket(false);
      appData.setAppData({ ...appData.appData, fullMarket: false });
      localStorage.setItem("fullMarket", false);
    } else {
      setfullMarket(true);
      appData.setAppData({ ...appData.appData, fullMarket: true });
      localStorage.setItem("fullMarket", true);
    }
  };

  const changeMarketOdds = () => {
    if (highlightOdds) {
      sethighlightOdds(false);
      appData.setAppData({ ...appData.appData, highlightOdds: false });
      localStorage.setItem("highlightOdds", false);
    } else {
      sethighlightOdds(true);
      appData.setAppData({ ...appData.appData, highlightOdds: true });
      localStorage.setItem("highlightOdds", true);
    }
  };

  useEffect(() => {
    if (appData.appData.fullMarket) {
      setfullMarket(true);
    } else {
      setfullMarket(false);
    }
  }, [appData.appData.fullMarket, fullMarket]);

  useEffect(() => {
    if (appData.appData.highlightOdds) {
      sethighlightOdds(true);
    } else {
      sethighlightOdds(false);
    }
  }, [appData.appData.highlightOdds, highlightOdds]);

  useEffect(() => {
    let fullMarket = localStorage.getItem("fullMarket");

    if (fullMarket) {
      appData.setAppData({ ...appData.appData, fullMarket: fullMarket });
      setfullMarket(fullMarket);
    } else {
      appData.setAppData({ ...appData.appData, fullMarket: false });
      setfullMarket(false);
    }
  }, []);

  useEffect(() => {
    let flashOdds = localStorage.getItem("highlightOdds");

    if (flashOdds) {
      appData.setAppData({ ...appData.appData, highlightOdds: flashOdds });
      sethighlightOdds(flashOdds);
    } else {
      appData.setAppData({ ...appData.appData, highlightOdds: false });
      sethighlightOdds(false);
    }
  }, []);

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
              checked={highlightOdds ? 1 : 0}
              onChange={() => changeMarketOdds()}
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
              checked={fullMarket ? 1 : 0}
              onChange={() => changeFullMarket()}
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

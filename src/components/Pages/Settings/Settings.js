import React, { useState, useEffect } from "react";
import styles from "./Settings.module.css";
import { MenuHeader } from "../../Layout/MenuHeader/MenuHeader";
import { useApp } from "../../../context/AppContextProvider";

export const Settings = () => {
  const appData = useApp();

  useEffect(() => {
     if(!appData.appData.fullMarket)
       localStorage.setItem("fullMarket",1);
     else{
       if(localStorage.getItem("fullMarket"))
          localStorage.removeItem("fullMarket");
     }
  },[appData.appData.fullMarket]);

  useEffect(() => {
    if(!appData.appData.highlightOdds)
      localStorage.setItem("highlightOdds",1);
    else{
      if(localStorage.getItem("highlightOdds"))
         localStorage.removeItem("highlightOdds");
    }
 },[appData.appData.highlightOdds])

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
              checked={appData.appData.highlightOdds}
              onChange={() => appData.setAppData({...appData.appData,highlightOdds:!appData.appData.highlightOdds})}
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
              checked={appData.appData.fullMarket}
              onChange={() => appData.setAppData({...appData.appData,fullMarket:!appData.appData.fullMarket})}
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

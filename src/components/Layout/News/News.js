import React from "react";
import styles from "./News.module.css";

export const News = () => {
  return (
    <React.Fragment>
      <div
        className={`${styles.newsRowContainer} col-12 d-inline-flex align-items-center`}
      >
        <div
          className={`${styles.newsIcon} d-inline-flex justify-content-center align-items-center flex-shrink-0`}
        >
          <i className="icon icon-mic d-inline-block"></i>
        </div>
        <div className={`${styles.newsHighlightRow} overflow-hidden`}>
          <ul
            className={`list-unstyled ${styles.marqueeList} position-relative d-inline-flex pl-0 align-items-center translate-x-full m-0`}
          >
            <li className={`flex-shrink-0 ${styles.whitespaceNowrap} mr-5`}>
              Once player account found with fraudulent ticket, the respective
              market will be voided and the player account will be locked.
            </li>
            <li className={`flex-shrink-0 ${styles.whitespaceNowrap} mr-5`}>
              WELCOME TO BET365.LIVE ! ENJOY BETTING IN MATCH ODDS, ﻿FANCY &
              LIVE CASINO
            </li>
            <li className={`flex-shrink-0 ${styles.whitespaceNowrap} mr-5`}>
              অফিসিয়াল এজেন্ট লিষ্ট https://allagentlist.com/ma.php
            </li>
          </ul>
        </div>
      </div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "./MatchScoreCard.module.css";

export const MatchScoreCard = () => {
  return (
    <React.Fragment>
      <div
        className={`${styles.matchScoreGraph} col-12 d-inline-block position-relative`}
      ></div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "./MatchScoreCard.module.css";

export const MatchScoreCard = ({scoreUrl}) => {
  return (
    <React.Fragment>
      {scoreUrl &&
      <div
        className={`${styles.matchScoreGraph} col-12 d-inline-block position-relative`}
      >
         <iframe
            title="live-score"
            className={styles.liveScoreFrame}
            allowFullScreen={true}
            src={scoreUrl}
          ></iframe>
      </div>
      }
    </React.Fragment>
  );
};

import React, { useEffect,useState } from "react";
import styles from "./MatchScoreCard.module.css";
import ApiService from "../../../services/ApiService";

export const MatchScoreCard = ({matchId}) => {
  const [scoreUrl,setScoreUrl] = useState("");
  useEffect(() => {
     ApiService.getScoreCard(matchId).then((res) => {
      if(res?.scoreUrl)
        setScoreUrl(res.scoreUrl);
     })
  },[]);
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

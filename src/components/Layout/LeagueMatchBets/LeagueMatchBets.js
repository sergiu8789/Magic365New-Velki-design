import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./LeagueMatchBets.module.css";

export const LeagueMatchBets = ({ leagueMatchName, setleagueMatch }) => {
  const navigate = useNavigate();
  const showMatchList = () => {
    setleagueMatch("LeagueMatches");
  };

  const showMatchBetDetail = () => {
    navigate("/full-market");
  };
  return (
    <React.Fragment>
      <div
        className={`${styles.matchDetailHeader} col-12 d-inline-flex align-items-center`}
      >
        <i className="icon-arrow-left" onClick={showMatchList}></i>
        <span className={styles.matchName}>{leagueMatchName}</span>
      </div>
      <div className={`${styles.allMatchBets} col-12 d-inline-block`}>
        <div
          className={`${styles.matchBetsBox} col-12 d-inline-flex flex-column overflow-hidden`}
        >
          <div
            className={`${styles.singleMatchBets} col-12 d-inline-flex flex-column position-relative`}
            onClick={showMatchBetDetail}
          >
            <h4 className={styles.teamName}>Match Odds</h4>
            <span
              className={`${styles.MatchArrow} position-absolute d-inline-flex icon-arrow-left`}
            ></span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

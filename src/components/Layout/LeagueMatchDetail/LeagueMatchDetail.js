import React from "react";
import styles from "./LeagueMatchDetail.module.css";

export const LeagueMatchDetail = ({
  setleagueMatch,
  setleagueMatchName,
  leagueName,
}) => {
  console.log(setleagueMatch, setleagueMatchName, leagueName);
  const showLeagueList = () => {
    setleagueMatch("LeagueList");
  };

  const showMatchBets = (name) => {
    setleagueMatchName(name);
    setleagueMatch("MatcheDetails");
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.matchDetailHeader} col-12 d-inline-flex align-items-center`}
      >
        <i className="icon-arrow-left" onClick={showLeagueList}></i>
        <span className={styles.matchName}>{leagueName}</span>
      </div>
      <div className={`${styles.allMatchList} col-12 d-inline-block`}>
        <div
          className={`${styles.matchListBox} col-12 d-inline-flex flex-column overflow-hidden`}
        >
          <div
            className={`${styles.singleMatchList} col-12 d-inline-flex flex-column position-relative`}
            onClick={() => showMatchBets("B Love Kandy v Dambulla Aura")}
          >
            <h4 className={styles.teamName}>B Love Kandy</h4>
            <h4 className={styles.teamName}>Dambulla Aura</h4>
            <span
              className={`${styles.MatchArrow} position-absolute d-inline-flex icon-arrow-left`}
            ></span>
          </div>
          <div
            className={`${styles.singleMatchList} col-12 d-inline-flex flex-column position-relative`}
            onClick={() => showMatchBets("B Love Kandy v Dambulla Aura")}
          >
            <h4 className={styles.teamName}>B Love Kandy</h4>
            <h4 className={styles.teamName}>Dambulla Aura</h4>
            <span
              className={`${styles.MatchArrow} position-absolute d-inline-flex icon-arrow-left`}
            ></span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

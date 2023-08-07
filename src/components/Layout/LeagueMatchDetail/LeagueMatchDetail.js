import React from "react";
import styles from "./LeagueMatchDetail.module.css";

export const LeagueMatchDetail = ({
  matchList,
  setleagueMatch,
  setSelectedMatch,
  leagueName,
}) => {
  
  const showLeagueList = () => {
    setleagueMatch("LeagueList");
  };

  const showMatchBets = (match) => {
    setSelectedMatch(match);
    setleagueMatch("MatcheDetails");
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.matchDetailHeader} col-12 d-inline-flex align-items-center`}
      >
        <i className="icon-arrow-left" onClick={showLeagueList}></i>
        {console.log(leagueName)}
        <span className={styles.matchName}>{leagueName?.replaceAll("_"," ")}</span>
      </div>
      <div className={`${styles.allMatchList} col-12 d-inline-block`}>
        <div
          className={`${styles.matchListBox} col-12 d-inline-flex flex-column overflow-hidden`}
        >
          {matchList.map((match,index) => {
            return(
              <div key={index} className={`${styles.singleMatchList} col-12 d-inline-flex flex-column position-relative`}
                onClick={() => showMatchBets(match)}
              >
                <h4 className={styles.teamName}>{match.team_one_name}</h4>
                <h4 className={styles.teamName}>{match.team_two_name}</h4>
                <span
                  className={`${styles.MatchArrow} position-absolute d-inline-flex icon-arrow-left`}
                ></span>
             </div>
            )
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

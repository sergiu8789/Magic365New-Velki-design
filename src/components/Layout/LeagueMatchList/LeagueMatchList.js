import React from "react";
import styles from "./LeagueMatchList.module.css";

export const LeagueMatchList = ({ setleagueMatch, setleagueName }) => {
  const setMatchName = (matchName) => {
    setleagueName(matchName);
    setleagueMatch("LeagueMatches");
  };
  return (
    <React.Fragment>
      <div className={`${styles.allLeaguesgame} col-12 d-inline-flex`}>
        <div
          className={`${styles.leagueDirectory} d-inline-flex flex-column flex-shrink-0`}
        >
          <div
            className={`${styles.leagueInitialBox} d-inline-flex align-items-center flex-column position-relative`}
          >
            <div
              className={`${styles.leagueInitial} d-inline-flex align-items-center justify-content-center`}
            >
              A
            </div>
          </div>
          <div
            className={`${styles.leagueInitialBox} d-inline-flex align-items-center flex-column position-relative`}
          >
            <div
              className={`${styles.leagueInitial} d-inline-flex align-items-center justify-content-center`}
            >
              B
            </div>
          </div>
          <div
            className={`${styles.leagueInitialBox} d-inline-flex align-items-center flex-column position-relative`}
          >
            <div
              className={`${styles.leagueInitial} d-inline-flex align-items-center justify-content-center`}
            >
              C
            </div>
          </div>
        </div>
        <div className={`${styles.allGamesList} d-inline-flex flex-column`}>
          <div
            className={`${styles.leagueMatchContainer} col-12 d-inline-flex flex-column`}
          >
            <h2 className={`${styles.leagueTitle} col-12 d-inline-flex m-0`}>
              Popular
            </h2>
            <div
              className={`${styles.leagueMatchsBox} col-12 d-inline-flex flex-column overflow-hidden`}
            >
              <div
                className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
                onClick={() => setMatchName("International Twenty20 Matches")}
              >
                <span className={`${styles.leagueMatch} d-inline-flex`}>
                  International Twenty20 Matches
                </span>
                <span
                  className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                ></span>
              </div>
              <div
                className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
                onClick={() => setMatchName("One Day Internationals")}
              >
                <span className={`${styles.leagueMatch} d-inline-flex`}>
                  One Day Internationals
                </span>
                <span
                  className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                ></span>
              </div>
              <div
                className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
              >
                <span className={`${styles.leagueMatch} d-inline-flex`}>
                  Lanka Premier League
                </span>
                <span
                  className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                ></span>
              </div>
            </div>
          </div>
          <div
            className={`${styles.leagueMatchContainer} col-12 d-inline-flex flex-column`}
          >
            <h2 className={`${styles.leagueTitle} col-12 d-inline-flex m-0`}>
              Rest of the world
            </h2>
            <div
              className={`${styles.leagueMatchsBox} col-12 d-inline-flex flex-column overflow-hidden`}
            >
              <div
                className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
              >
                <span className={`${styles.leagueMatch} d-inline-flex`}>
                  Indian Premier League
                </span>
                <span
                  className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                ></span>
              </div>
              <div
                className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
              >
                <span className={`${styles.leagueMatch} d-inline-flex`}>
                  Internal Test
                </span>
                <span
                  className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                ></span>
              </div>
              <div
                className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
              >
                <span className={`${styles.leagueMatch} d-inline-flex`}>
                  Irish Inter Provincial T20 Trophy
                </span>
                <span
                  className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

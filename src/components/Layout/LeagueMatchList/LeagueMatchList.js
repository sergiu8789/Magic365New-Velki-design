import React, { useState, useEffect } from "react";
import styles from "./LeagueMatchList.module.css";

export const LeagueMatchList = ({
  tournamentList,
  setleagueMatch,
  setleagueName,
  tabActive,
}) => {
  const [tornamentInit, setTornamentInit] = useState([]);

  const sortTournamentName = () => {
    let allInitals = [];
    {
      tournamentList
        ?.filter((item) => item.game_slug === tabActive)
        ?.sort(function (a, b) {
          if (a.trn_name < b.trn_name) {
            return -1;
          }
          if (a.trn_name > b.trn_name) {
            return 1;
          }
          return 0;
        })
        ?.map((tournament, index) => {
          let nameInit = tournament.trn_name.charAt(0);
          let initIndex = allInitals.indexOf(nameInit);
          if (initIndex < 0) {
            allInitals.push(nameInit);
          }
        });
      setTornamentInit(allInitals);
    }
  };

  const sortListByInital = (item) => {
    let elem = document.querySelector('[data-inital="' + item + '"]');
    elem.scrollIntoView();
  };

  useEffect(() => {
    if (tournamentList?.length) sortTournamentName();
  }, [tabActive, tournamentList]);

  return (
    <React.Fragment>
      <div className={`${styles.allLeaguesgame} col-12 d-inline-flex`}>
        <div
          className={`${styles.leagueDirectory} d-inline-flex flex-column flex-shrink-0 position-sticky`}
        >
          {tornamentInit.map((item, index) => (
            <div
              className={`${styles.leagueInitialBox} d-inline-flex align-items-center flex-column position-relative`}
              key={index}
              onClick={() => sortListByInital(item)}
            >
              <div
                className={`${styles.leagueInitial} d-inline-flex align-items-center justify-content-center`}
              >
                {item}
              </div>
            </div>
          ))}
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
              {tournamentList
                ?.filter((item) => item.game_slug === tabActive)
                ?.sort(function (a, b) {
                  if (a.trn_name < b.trn_name) {
                    return -1;
                  }
                  if (a.trn_name > b.trn_name) {
                    return 1;
                  }
                  return 0;
                })
                ?.map((tournament, index) => {
                  return (
                    <div
                      key={index}
                      data-inital={tournament.trn_name.charAt(0)}
                      className={`${styles.leagueMatchRow} col-12 d-inline-flex align-items-center justify-content-between`}
                      onClick={() => {
                        setleagueName(tournament.trn_slug);
                        setleagueMatch("LeagueMatches");
                      }}
                    >
                      <span className={`${styles.leagueMatch} d-inline-flex`}>
                        {tournament.trn_name}
                      </span>
                      <span
                        className={`${styles.MatchArrow} d-inline-flex icon-arrow-left`}
                      ></span>
                    </div>
                  );
                })}
            </div>
          </div>
          {/* <div
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
            </div>
          </div> */}
        </div>
      </div>
    </React.Fragment>
  );
};

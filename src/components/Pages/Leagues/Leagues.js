import React, { useEffect, useState } from "react";
import ApiService from "../../../services/ApiService";
import { Loader } from "../../Layout/Loader/Loader";
import { LeagueMatchList } from "../../Layout/LeagueMatchList/LeagueMatchList";
import { LeagueMatchDetail } from "../../Layout/LeagueMatchDetail/LeagueMatchDetail";
import { LeagueMatchBets } from "../../Layout/LeagueMatchBets/LeagueMatchBets";
import styles from "./Leagues.module.css";

export const Leagues = () => {
  const [CatTabPosLeft, setCatTabPosLeft] = useState("");
  const [tabActive, settabActive] = useState("Cricket");
  const [leagueMatch, setleagueMatch] = useState("LeagueList");
  const [leagueName, setleagueName] = useState("");
  const [leagueMatchName, setleagueMatchName] = useState("");
  const [tournamentList, setTournamentList] = useState([]);
  const [matchList, setMatchList] = useState([]);

  const activeSportsTab = (event, name) => {
    let pageOffset = document.querySelector(".center-mobile-mode").offsetLeft;
    let inplay = 10;
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    setCatTabPosLeft(TabPos);
    settabActive(name);
  };

  useEffect(() => {
    ApiService.getSports().then((res) => {
      if (res?.data)
        setTournamentList(res.data);
    });
  }, []);

  useEffect(() => {
    if (leagueName) {
      setMatchList([]);
      ApiService.tournamentMatchList(tabActive, leagueName).then((res) => {
         if(res?.data?.data){
          setMatchList(res.data.data);
         }
      });
    }
  }, [leagueName])

  const sportsCat = [
    {
      name: "Cricket",
      icon: "icon-cricket",
      link: "/",
    },
    {
      name: "Soccer",
      icon: "icon-soccer",
      link: "/",
    },
    {
      name: "Tennis",
      icon: "icon-tennis",
      link: "/",
    },
  ];
  return (
    <React.Fragment>
      {leagueMatch === "LeagueList" ? (
        <React.Fragment>
          <div
            className={`${styles.allSportsTabRow} d-inline-flex col-12 align-items-center position-relative`}
          >
            {sportsCat.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`${styles.sportsCatTab
                      }  d-inline-flex justify-content-center align-items-center position-relative ${item.name === tabActive && styles.activeCatTab
                      }`}
                    id={`SportsTab_${item.name}`}
                    onClick={(event) => activeSportsTab(event, item.name)}
                  >
                    <i className={`${styles.sportsTabIcon} ${item.icon}`}></i>
                    <span className={`${styles.sportTabName} d-inline-flex`}>
                      {item.name}
                    </span>
                  </div>
                </React.Fragment>
              );
            })}
            <div
              className={`${styles.activeFloatTab} position-absolute d-inline-block`}
              style={{ transform: "translateX(" + CatTabPosLeft + "px)" }}
            ></div>
          </div>
          <LeagueMatchList
            setleagueName={setleagueName}
            tabActive={tabActive}
            tournamentList={tournamentList}
            setleagueMatch={setleagueMatch}
          />
        </React.Fragment>
      ) : leagueMatch === "LeagueMatches" ? (
        <React.Fragment>
          {leagueName && (
            <LeagueMatchDetail
              matchList={matchList}
              setleagueMatch={setleagueMatch}
              setleagueMatchName={setleagueMatchName}
              leagueName={leagueName}
            />
          )}
        </React.Fragment>
      ) : leagueMatch === "MatcheDetails" ? (
        <React.Fragment>
          {leagueMatchName && (
            <LeagueMatchBets
              leagueMatchName={leagueMatchName}
              setleagueMatch={setleagueMatch}
            />
          )}
        </React.Fragment>
      ) : (
        <></>
      )}
      <Loader />
    </React.Fragment>
  );
};

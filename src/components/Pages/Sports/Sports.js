import React, { useEffect, useRef, useState } from "react";
import styles from "./Sports.module.css";
import { useLocation } from "react-router-dom";
import { News } from "../../Layout/News/News";
import { GameList } from "../../Layout/GameList/GameList";
import { BetSlip } from "../../Layout/BetSlip/BetSlip";
import ApiService from "../../../services/ApiService";
import { encrypt } from "../../../utils/crypto";
import { socket } from "../../../services/socket";
import { useApp } from "../../../context/AppContextProvider";
import { NoData } from "../../Layout/NoData/NoData";
import { SportsSearch } from "../../Layout/SportsSearch/SportsSearch";

export const Sports = () => {
  const location = useLocation();
  const appData = useApp();
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [CatTabPosLeft, setCatTabPosLeft] = useState("");
  const [tabActive, settabActive] = useState("");
  const [inPlayTab, setinPlayTab] = useState("");
  const [inPlayCheck, setPlayCheck] = useState(true);
  const [tournamentList, setTournamentList] = useState({});
  const [matchIds, setMatchIds] = useState([]);
  const [allMatchId, setMatchedId] = useState([]);
  const [sortGameList, setsortGameList] = useState("by Competition");
  const [storeTournament, setStoreTournament] = useState("");
  const [sportSearch, setSportSearch] = useState(false);
  const playRef = useRef([]);
  const tabRef = useRef([]);

  useEffect(() => {
    if (matchIds?.length) {
      socket.emit("subscription", matchIds);
    }
    function onBroadCast(value) {
      setMatchedId(value);
    }
    socket.on("broadcast", onBroadCast); // exchange odds broadcast method
    return () => {
      socket.off("broadcast", onBroadCast);
    };
  }, [matchIds]);

  useEffect(() => {
    let getGameTab = appData.appData.SportTabActive;
    if (tabRef && tabRef.current[0] && !getGameTab) {
      tabRef.current[0].click();
    } else {
      tabRef.current.map((item) => {
        if (item.id === getGameTab) {
          item.click();
        }
      });
    }

    let playTab = location?.state?.datetype;
    if (playRef && playRef.current[0] && !playTab) {
      playRef.current[0].click();
    } else {
      if (playTab === "live") {
        playTab = "inPlayTab_In-Play";
      } else if (playTab === "today") {
        playTab = "inPlayTab_Today";
      } else if (playTab === "tomorrow") {
        playTab = "inPlayTab_Tomorrow";
      }
      playRef.current.map((item) => {
        if (item.id === playTab) {
          item.click();
        }
      });
    }

    if (location?.state?.type === "1") {
      setPlayCheck(true);
    } else {
      setPlayCheck(false);
    }
    if (location?.state?.category) {
      let catId = location?.state?.category;
      settabActive(location?.state?.category);
      tabRef.current.map((item) => {
        if (item.id === "SportsTab_" + catId) {
          item.click();
        }
      });
    }
    appData.setAppData({ ...appData.appData, listLoading: true });
  }, []);

  const activeGameTab = (event, name) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let inplay =
      parseInt(
        document.querySelector("." + styles.inplayBox).getBoundingClientRect()
          .width
      ) + parseInt(18);
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setTabLineWidth(widthTab);
    setTabPosLeft(TabPos);
    setinPlayTab(name);
  };

  const activeSportsTab = (event, name, gameId) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let inplay = 10;
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    setCatTabPosLeft(TabPos);
    settabActive(name);
    appData.setAppData({ ...appData.appData, SportTabActive: gameId });
  };

  const inPlayToggleCheck = () => {
    if (inPlayCheck) {
      setPlayCheck(false);
    } else {
      setPlayCheck(true);
    }
  };

  const inPlayTabs = [
    {
      name: "In-Play",
    },
    {
      name: "Today",
    },
    {
      name: "Tomorrow",
    },
  ];

  const sportsCat = [
    {
      name: "All",
      icon: "icon-all",
      link: "/",
    },
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

  const getAllTournament = (res) => {
    let tournaments = { Cricket: {}, Soccer: {}, Tennis: {} };
    let matchIdList = [];
    res?.data?.map((item, index) => {
      matchIdList.push(item.id);
      Object.keys(tournaments)?.map((tour) => {
        if (item.name === tour) {
          if (sortGameList === "by Matched") {
            let TotalMId = "";
            console.log(allMatchId);
            allMatchId.map((mitem, mindex) => {
              console.log(mitem.eventId);
              console.log(item.id);
              if (mitem.eventId === item.id) {
                TotalMId = mitem?.TotalMatched;
                console.log("TotalMId ", TotalMId);
              }
            });
            if (tournaments[tour]?.matches) {
              tournaments[tour].matches.push(item);
              tournaments[tour].matchId.push(TotalMId);
            } else {
              tournaments[tour] = {
                matches: [],
                open: true,
                matchId: [],
              };
              tournaments[tour].matches.push(item);
              tournaments[tour].matchId.push(TotalMId);
            }
          } else if (sortGameList === "by Time") {
            if (tournaments[tour]?.matches) {
              tournaments[tour].matches.push(item);
            } else {
              tournaments[tour] = {
                matches: [],
                open: true,
              };
              tournaments[tour].matches.push(item);
            }
          } else if (sortGameList === "by Competition") {
            if (tournaments[tour][item.trn_name]?.matches) {
              tournaments[tour][item.trn_name].matches.push(item);
            } else {
              tournaments[tour][item.trn_name] = {
                matches: [],
                open: true,
              };
              tournaments[tour][item.trn_name]?.matches.push(item);
            }
          }
        }
      });
    });
    appData.setAppData({ ...appData.appData, listLoading: false });
    setMatchIds(matchIdList);
    setTournamentList(tournaments);
  };

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    if (inPlayTab) {
      let timeTab = "live";
      let activeTab = tabActive;
      let startDate = "";
      let endDate = "";
      let todayDate = new Date();
      if (inPlayTab !== "In-Play") timeTab = inPlayTab;
      if (inPlayTab === "Today") {
        startDate = todayDate.setHours(0, 0, 0, 0);
        startDate = encodeURIComponent(encrypt(startDate));
        endDate = todayDate.setHours(23, 59, 59, 99);
        endDate = encodeURIComponent(encrypt(endDate));
      }
      if (inPlayTab === "Tomorrow") {
        todayDate = todayDate.setDate(todayDate.getDate() + 1);
        todayDate = new Date(todayDate);
        startDate = todayDate.setHours(0, 0, 0, 0);
        startDate = encodeURIComponent(encrypt(startDate));
        endDate = todayDate.setHours(23, 59, 59, 99);
        endDate = encodeURIComponent(encrypt(endDate));
      }
      if (activeTab) activeTab = activeTab.toLowerCase();
      timeTab = timeTab.toLowerCase();
      setMatchIds([]);
      setTournamentList({});
      ApiService.tournamentMatchList(
        activeTab,
        "",
        timeTab,
        startDate,
        endDate
      ).then((res) => {
        if (res?.data) {
          getAllTournament(res);
          setStoreTournament(res);
        } else {
          setMatchIds([]);
          setTournamentList({});
        }
      });
    }
  }, [inPlayTab, tabActive]);

  useEffect(() => {
    appData.setAppData({ ...appData.appData, listLoading: true });
    getAllTournament(storeTournament);
  }, [sortGameList]);

  return (
    <React.Fragment>
      <div className={`col-12 d-inline-block ${styles.sportsScrollBox}`}>
        <News />
        <div
          className={`${styles.gameFilterDayrow} col-12 d-inline-flex align-items-center justify-content-between`}
        >
          <div
            className={`${styles.inplayBox} d-inline-flex align-items-center flex-shrink-0`}
          >
            <input
              id="inPlayToggle"
              type="checkbox"
              checked={inPlayCheck}
              onChange={inPlayToggleCheck}
              className={`${styles.inPlayInput} position-absolute`}
            />
            <label className={styles.inPlayToggle}></label>
            <span className={styles.inPlayText}>Parlay</span>
          </div>
          <div
            className={`${styles.inPlayTabRow} d-inline-flex align-items-center position-relative justify-content-between`}
          >
            {inPlayTabs.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <span
                    className={`${styles.inPlayTabName} d-inline-flex ${
                      item.name === inPlayTab && styles.inPlayTabActive
                    }`}
                    ref={(element) => (playRef.current[index] = element)}
                    onClick={(event) => activeGameTab(event, item.name)}
                    id={`inPlayTab_${item.name}`}
                  >
                    {item.name}
                  </span>
                </React.Fragment>
              );
            })}
            <span
              className={`text-icon-light icon-star-solid ${styles.inPlayTabIcon}`}
            ></span>
            <span
              className={`text-icon-light icon-search ${styles.inPlayTabIcon}`}
            ></span>
            <div
              className={`${styles.activeLine} position-absolute d-inline-flex`}
              style={{
                width: TabLineWidth + "px",
                transform: "translateX(" + TabPosLeft + "px)",
              }}
            ></div>
          </div>
        </div>
        <div
          className={`${styles.allSportsTabRow} d-inline-flex col-12 align-items-center position-relative`}
        >
          {sportsCat.map((item, index) => {
            return (
              <React.Fragment key={index}>
                <div
                  className={`${
                    styles.sportsCatTab
                  }  d-inline-flex justify-content-center align-items-center position-relative ${
                    item.name === tabActive && styles.activeCatTab
                  }`}
                  ref={(element) => (tabRef.current[index] = element)}
                  id={`SportsTab_${item.name}`}
                  onClick={(event) =>
                    activeSportsTab(event, item.name, "SportsTab_" + item.name)
                  }
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
        {Object.keys(tournamentList).length > 0 ? (
          <GameList
            tournamentList={tournamentList}
            setTournamentList={setTournamentList}
            inPlay={inPlayTab === "In-Play" ? true : false}
            gameType={tabActive}
            setsortGameList={setsortGameList}
            sortGameList={sortGameList}
            playType={inPlayTab}
          />
        ) : (
          <NoData title="No Data" />
        )}
      </div>
      <BetSlip />
      {/* <SportsSearch /> */}
    </React.Fragment>
  );
};

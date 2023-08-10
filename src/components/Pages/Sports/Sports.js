import React, { useEffect, useState } from "react";
import styles from "./Sports.module.css";
import { useLocation } from "react-router-dom";
import { News } from "../../Layout/News/News";
import { GameList } from "../../Layout/GameList/GameList";
import { BetSlip } from "../../Layout/BetSlip/BetSlip";
import ApiService from "../../../services/ApiService";
import { encrypt } from "../../../utils/crypto";
import { socket } from "../../../services/socket";

export const Sports = () => {
  const location = useLocation();
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [CatTabPosLeft, setCatTabPosLeft] = useState("");
  const [tabActive, settabActive] = useState("");
  const [inPlayTab, setinPlayTab] = useState("");
  const [tournamentList,setTournamentList] = useState({});
  const [matchIds,setMatchIds] = useState([]);


useEffect(() => {
  if(matchIds?.length){
    socket.emit("subscription",matchIds);
  }
},[matchIds]);

  useEffect(() => {
    if (
      document.querySelector(
        "." +
        styles.inPlayTabRow +
        " ." +
        styles.inPlayTabName +
        ":nth-child(1)"
      )
    ) {
      document
        .querySelector(
          "." +
          styles.inPlayTabRow +
          " ." +
          styles.inPlayTabName +
          ":nth-child(1)"
        )
        .click();
    }
    if (location?.state?.type === "1") {
      document.getElementById("inPlayToggle").checked = true;
    } else {
      document.getElementById("inPlayToggle").checked = false;
    }
    if (location?.state?.category) {
      let catId = location?.state?.category;
      settabActive(location?.state?.category);
      document.getElementById("SportsTab_" + catId).click();
    }
  }, []);

  useEffect(() => {
    if (inPlayTab) {
      let timeTab = 'live';
      let activeTab = tabActive;
      let startDate = '';
      let endDate = '';
      let todayDate = new Date();
      if (inPlayTab !== 'In-Play')
        timeTab = inPlayTab;
      if(inPlayTab === 'Today'){
        startDate = todayDate.setHours(0,0,0,0);
        startDate = encodeURIComponent(encrypt(startDate));
        endDate = todayDate.setHours(23,59,59,99);
        endDate = encodeURIComponent(encrypt(endDate));
      }
      if(inPlayTab === 'Tomorrow'){
        todayDate = todayDate.setDate(todayDate.getDate() + 1);
        todayDate = new Date(todayDate);
        startDate = todayDate.setHours(0,0,0,0);
        startDate = encodeURIComponent(encrypt(startDate));
        endDate = todayDate.setHours(23,59,59,99);
        endDate = encodeURIComponent(encrypt(endDate));
      }
      if (activeTab)
        activeTab = activeTab.toLowerCase();
        timeTab = timeTab.toLowerCase();
        ApiService.tournamentMatchList(activeTab, "", timeTab,startDate,endDate).then((res) => {
        if(res?.data){
          let tournaments = {Cricket:{},Soccer:{},Tennis:{}};
          let matchIdList = [];
          res?.data?.map((item,index) => {
            matchIdList.push(item.id);
              Object.keys(tournaments)?.map((tour) => {
                if(item.name === tour){
                  if(tournaments[tour][item.trn_name]?.matches){
                     tournaments[tour][item.trn_name].matches.push(item);
                  }
                  else{
                   tournaments[tour][item.trn_name] = {matches:[],open:true}; 
                   tournaments[tour][item.trn_name]?.matches.push(item);
                  }
                }
              });
          });  
          setMatchIds(matchIdList);
          setTournamentList(tournaments);     
        }
      });
    }
  }, [inPlayTab])

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

  const activeSportsTab = (event, name) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let inplay = 10;
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    setCatTabPosLeft(TabPos);
    settabActive(name);
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
                    className={`${styles.inPlayTabName} d-inline-flex ${item.name === inPlayTab && styles.inPlayTabActive
                      }`}
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
        <GameList tournamentList={tournamentList} setTournamentList={setTournamentList} inPlay={inPlayTab === 'In-Play' ? true : false} gameType={tabActive}/>
      </div>
      <BetSlip />
    </React.Fragment>
  );
};

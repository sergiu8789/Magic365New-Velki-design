import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeGameCard.module.css";
import { encrypt } from "../../../utils/crypto";
import ApiService from "../../../services/ApiService";
import { useAuth } from "../../../context/AuthContextProvider";
import { useApp } from "../../../context/AppContextProvider";

export const HomeGameCard = () => {
  const auth = useAuth();
  const appData = useApp();
  const [gameTab, setGameTab] = useState("In-play");
  const [value, setValue] = useState("live");
  const [startGameDate, setStartDate] = useState("");
  const [endGameDate, setEndDate] = useState("");
  const [gameCount, setgameCount] = useState({
    all: 0,
    cricket: 0,
    soccer: 0,
    tennis: 0,
  });
  const navigate = useNavigate();

  const playCardTab = (tab) => {
    let startDate = "";
    let endDate = "";
    let todayDate = new Date();
    if (tab === "In-play") {
      setStartDate("");
      setEndDate("");
      setValue("live");
    } else if (tab === "Today") {
      startDate = todayDate.setHours(0, 0, 0, 0);
      startDate = encodeURIComponent(encrypt(startDate));
      endDate = todayDate.setHours(23, 59, 59, 99);
      endDate = encodeURIComponent(encrypt(endDate));
      setStartDate(startDate);
      setEndDate(endDate);
      setValue("today");
    } else if (tab === "Tomorrow") {
      todayDate = todayDate.setDate(todayDate.getDate() + 1);
      todayDate = new Date(todayDate);
      startDate = todayDate.setHours(0, 0, 0, 0);
      startDate = encodeURIComponent(encrypt(startDate));
      endDate = todayDate.setHours(23, 59, 59, 99);
      endDate = encodeURIComponent(encrypt(endDate));
      setStartDate(startDate);
      setEndDate(endDate);
      setValue("tomorrow");
    }
    setGameTab(tab);
  };

  const fetchLiveGameList = (value, startGameDate, endGameDate) => {
    let gameDataList = [],
      cricketCount = 0,
      allSportsCount = 0,
      soccerCount = 0,
      tennisCount = 0;
    ApiService.sportsPlayCount(value, startGameDate, endGameDate)
      .then((res) => {
        if (res.data) {
          gameDataList = res.data;
          gameDataList.map((item, index) => {
            if (item.game_name === "Cricket") {
              cricketCount = item.count;
            } else if (item.game_name === "Soccer") {
              soccerCount = item.count;
            } else if (item.game_name === "Tennis") {
              tennisCount = item.count;
            }
            allSportsCount = cricketCount + soccerCount + tennisCount;
            setgameCount({
              all: allSportsCount,
              cricket: cricketCount,
              soccer: soccerCount,
              tennis: tennisCount,
            });
          });
        }
      })
      .catch((err) => {
        if (
          err?.response?.data?.statusCode === 401 &&
          err?.response?.data?.message === "Unauthorized"
        ) {
          localStorage.removeItem("token");
          auth.setAuth({
            ...auth.auth,
            loggedIn: false,
            user: {},
            showSessionExpire: true,
          });
        }
      });
  };

  const gotoLeagues = () => {
    navigate("/leagues");
  };

  const gotoSports = (id, cat, type) => {
    if (!type) {
      type = "";
    }
    navigate("/sports", {
      state: { type: id, category: cat, datetype: type },
    });
  };

  useEffect(() => {
    fetchLiveGameList(value, startGameDate, endGameDate);
  }, [value]);
  return (
    <React.Fragment>
      <div
        className={`${styles.homeGameCards} col-12 d-inline-flex align-items-start`}
      >
        <div className={`${styles.gameCardAside} d-inline-flex flex-column`}>
          <div
            className={`${styles.gameCardMenu} ${
              gameTab === "In-play" && styles.gameCardMenuActive
            } d-inline-flex flex-column align-items-center justify-content-center`}
            onClick={() => playCardTab("In-play")}
          >
            <i
              className={`position-relative icon-inplay-b ${styles.textMenuIcon}`}
            ></i>
            <span className={styles.cardMenuName}>In-play</span>
          </div>
          <div
            className={`${styles.gameCardMenu} ${
              gameTab === "Today" && styles.gameCardMenuActive
            } d-inline-flex flex-column align-items-center justify-content-center`}
            onClick={() => playCardTab("Today")}
          >
            <i
              className={`position-relative icon-today ${styles.textMenuIcon}`}
            ></i>
            <span className={styles.cardMenuName}>Today</span>
          </div>
          <div
            className={`${styles.gameCardMenu} ${
              gameTab === "Tomorrow" && styles.gameCardMenuActive
            } d-inline-flex flex-column align-items-center justify-content-center`}
            onClick={() => playCardTab("Tomorrow")}
          >
            <i
              className={`position-relative icon-tomorrow ${styles.textMenuIcon}`}
            ></i>
            <span className={styles.cardMenuName}>Tomorrow</span>
          </div>
          <div
            className={`${styles.gameCardMenu} d-inline-flex flex-column align-items-center justify-content-center`}
            onClick={gotoLeagues}
          >
            <i
              className={`position-relative icon-trophy ${styles.textMenuIcon}`}
            ></i>
            <span className={styles.cardMenuName}>Leagues</span>
          </div>
          <div
            className={`${styles.gameCardMenu} d-inline-flex flex-column align-items-center justify-content-center`}
            onClick={() => gotoSports("1", "All")}
          >
            <i
              className={`position-relative icon-parlay ${styles.textMenuIcon}`}
            ></i>
            <span className={styles.cardMenuName}>Parlay</span>
          </div>
        </div>
        <div
          className={`${styles.gameCardRowContainer} d-inline-flex flex-column`}
        >
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.allCategoryGame}`}
            onClick={() => gotoSports("0", "All", value)}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>All</label>
              <span className={styles.gameCardCount}>{gameCount.all}</span>
            </div>
          </div>
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.cricketCategoryGame}`}
            onClick={() => gotoSports("0", "Cricket", value)}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>Cricket</label>
              <span className={styles.gameCardCount}>{gameCount.cricket}</span>
            </div>
          </div>
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.soccerCategoryGame}`}
            onClick={() => gotoSports("0", "Soccer", value)}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>Soccer</label>
              <span className={styles.gameCardCount}>{gameCount.soccer}</span>
            </div>
          </div>
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.tennisCategoryGame}`}
            onClick={() => gotoSports("0", "Tennis", value)}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>Tennis</label>
              <span className={styles.gameCardCount}>{gameCount.tennis}</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

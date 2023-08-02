import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./HomeGameCard.module.css";

export const HomeGameCard = () => {
  const [gameTab, setGameTab] = useState("In-play");
  const navigate = useNavigate();

  const playCardTab = (tab) => {
    setGameTab(tab);
  };

  const gotoLeagues = () => {
    navigate("/leagues");
  };

  const gotoSports = (id, cat) => {
    navigate("/sports", { state: { type: id, category: cat } });
  };
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
            onClick={() => gotoSports("0", "All")}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>All</label>
              <span className={styles.gameCardCount}>40</span>
            </div>
          </div>
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.cricketCategoryGame}`}
            onClick={() => gotoSports("0", "Cricket")}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>Cricket</label>
              <span className={styles.gameCardCount}>13</span>
            </div>
          </div>
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.soccerCategoryGame}`}
            onClick={() => gotoSports("0", "Soccer")}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>Soccer</label>
              <span className={styles.gameCardCount}>8</span>
            </div>
          </div>
          <div
            className={`${styles.singleCardRowBox} col-12 ${styles.tennisCategoryGame}`}
            onClick={() => gotoSports("0", "Tennis")}
          >
            <div
              className={`${styles.allGameCardCount} d-inline-flex flex-column align-content-center justify-content-center`}
            >
              <label className={styles.gameCardLabel}>Tennis</label>
              <span className={styles.gameCardCount}>9</span>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

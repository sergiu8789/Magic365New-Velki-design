import React, { useState, useEffect } from "react";
import styles from "./GameListCompetition.module.css";
import { useApp } from "../../../context/AppContextProvider";

export const GameListCompetition = ({ setsortGameList }) => {
  const appData = useApp();
  const [competeDrop, setcompeteDrop] = useState(false);
  const [sortCompetition, setSortCompetition] = useState(
    appData.appData.sportTabType
  );
  const competionName = ["by Competition", "by Time", "by Matched"];

  const openCompetDrop = () => {
    if (competeDrop) {
      setcompeteDrop(false);
    } else {
      setcompeteDrop(true);
    }
  };

  const selectCompetion = (item) => {
    appData.setAppData({ ...appData.appData, sportTabType: item });
    setSortCompetition(item);
    setsortGameList(item);
    setcompeteDrop(false);
  };
  return (
    <React.Fragment>
      <div
        className={`${styles.gameCompetitionBox} position-relative d-inline-flex align-items-center`}
      >
        <i className={`${styles.gameToggle} icon-toggle`}></i>
        <button
          className={`${styles.gameSelectionbtn} ${
            competeDrop === true && styles.gameSelectOpen
          } d-inline-flex align-items-center`}
          onClick={openCompetDrop}
        >
          <span className={`${styles.gameSelectionName} d-inline-flex`}>
            {sortCompetition}
          </span>
          <i
            className={`${styles.gameSelctionArrow} d-inline-flex ms-auto icon-triangle`}
          ></i>
        </button>
        <div
          className={`${styles.competionList} ${
            competeDrop === true ? "d-inline-flex" : "d-none"
          } position-absolute flex-column`}
        >
          {competionName.map((item, index) => {
            return (
              <span
                className={`${styles.gameComptionName} ${
                  sortCompetition === item ? "d-none" : "d-inline-flex"
                }`}
                role="button"
                key={index}
                onClick={() => selectCompetion(item)}
              >
                {item}
              </span>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

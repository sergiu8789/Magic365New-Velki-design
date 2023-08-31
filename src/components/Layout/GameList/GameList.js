import React, { useState, useEffect } from "react";
import styles from "./GameList.module.css";
import { GameListCompetition } from "../GameListCompetition/GameListCompetition";
import { GameByCompetition } from "../GameByCompetition/GameByCompetition";
import { GameByTime } from "../GameByTime/GameByTime";
import { GameByMatch } from "../GameByMatch/GameByMatch";

export const GameList = ({
  tournamentList,
  setTournamentList,
  gameType,
  inPlay,
  setsortGameList,
  sortGameList,
  playType,
  setFaveGame,
  faveGame,
}) => {
  const [allGameList, setGameList] = useState([]);

  const getTournaments = (tournamentList) => {
    setGameList([]);
    let filteredGames = Object.keys(tournamentList)
      ?.filter(
        (gameTypeFilter) =>
          !gameType || gameType === "All" || gameType === gameTypeFilter
      )
      ?.filter(
        (countFilter) => Object.keys(tournamentList[countFilter])?.length
      );
    if (filteredGames.length > 0) {
      setGameList(filteredGames);
    } else {
      setGameList([]);
    }
  };

  useEffect(() => {
    getTournaments(tournamentList);
  }, [gameType, inPlay]);

  useEffect(() => {
    if (sortGameList === "by Time") {
    }
  }, [sortGameList]);

  return (
    <React.Fragment>
      {gameType === "All" && (
        <div className={`${styles.gameAllCompeteBox} col-12 d-inline-flex`}>
          <GameListCompetition setsortGameList={setsortGameList} />
        </div>
      )}
      {sortGameList === "by Competition" ? (
        <GameByCompetition
          allGameList={allGameList}
          tournamentList={tournamentList}
          setTournamentList={setTournamentList}
          inPlay={inPlay}
          gameType={gameType}
          setsortGameList={setsortGameList}
          playType={playType}
          setFaveGame={setFaveGame}
          faveGame={faveGame}
        />
      ) : sortGameList === "by Time" || sortGameList === "by Matched" ? (
        <GameByTime
          allGameList={allGameList}
          tournamentList={tournamentList}
          setTournamentList={setTournamentList}
          inPlay={inPlay}
          gameType={gameType}
          setsortGameList={setsortGameList}
          sortGameList={sortGameList}
          playType={playType}
          setFaveGame={setFaveGame}
          faveGame={faveGame}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </React.Fragment>
  );
};

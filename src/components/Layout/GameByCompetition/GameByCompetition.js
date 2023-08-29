import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../GameList/GameList.module.css";
import { encrypt } from "../../../utils/crypto";
import { NoData } from "../NoData/NoData";
import { GameListCompetition } from "../GameListCompetition/GameListCompetition";
import {
  getDateYearNumFormat,
  formatTimeHh,
  compareDate,
  checkECricket,
} from "../../../utils/helper";
import ApiService from "../../../services/ApiService";

export const GameByCompetition = ({
  allGameList,
  tournamentList,
  setTournamentList,
  inPlay,
  gameType,
  setsortGameList,
}) => {
  const navigate = useNavigate();
  const [closeAllMatchBox, setcloseAllMatchBox] = useState({
    Cricket: false,
    Soccer: false,
    Tennis: false,
  });
  const [faveGame, setFaveGame] = useState([]);

  const openMatchDetail = (gameType, tournament) => {
    tournamentList[gameType][tournament].open =
      !tournamentList[gameType][tournament].open;
    setTournamentList({ ...tournamentList });
  };

  const openGameDetail = (match) => {
    navigate("/full-market", {
      state: {
        match_id: match.id,
        market_id: match.market_id,
        type: "match_odds",
        teamone: match.team_one_name,
        teamtwo: match.team_two_name,
      },
    });
  };

  const closeAllMatch = (gameType) => {
    Object.keys(tournamentList[gameType])?.map((item) => {
      if (closeAllMatchBox[gameType])
        tournamentList[gameType][item].open = true;
      else tournamentList[gameType][item].open = false;
    });
    closeAllMatchBox[gameType] = !closeAllMatchBox[gameType];
    setTournamentList({ ...tournamentList });
    setcloseAllMatchBox({ ...closeAllMatchBox });
  };

  const setGameFavrite = (event, date, matchId) => {
    let dateVal = compareDate(date);

    let newFavArry = [];
    newFavArry = [...faveGame];
    if (newFavArry.indexOf(matchId) < 0) {
      setFaveGame((prevMatchId) => [...prevMatchId, matchId]);
    } else {
      let betIndex = newFavArry.indexOf(matchId);
      newFavArry.splice(betIndex, 1);
      setFaveGame(faveGame.filter((x) => x !== matchId));
    }
    let favMatchjson = { match_id: encodeURIComponent(encrypt(matchId)) };
    ApiService.setGameFav(favMatchjson)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});

    event.stopPropagation();
  };

  return (
    <React.Fragment>
      {allGameList.length > 0 ? (
        allGameList.map((tour, tourIndex) => {
          return (
            <div
              key={tourIndex}
              className={`${styles.singleGameContiner} position-relative col-12 d-inline-block`}
            >
              <div
                className={
                  styles.allTabTitle +
                  " col-12 d-inline-flex justify-content-between"
                }
              >
                {tour != gameType ? (
                  <div
                    className={`${styles.titleGameName} position-relative d-inline-flex`}
                  >
                    {tour}
                  </div>
                ) : (
                  <GameListCompetition setsortGameList={setsortGameList} />
                )}
                <div
                  className={`${styles.sortFilterBtn} ${
                    closeAllMatchBox[tour] && styles.closeAllGames
                  } d-inline-flex align-items-center justify-content-center ms-auto`}
                  onClick={() => closeAllMatch(tour)}
                >
                  <span className="d-inline-flex">ALL</span>
                  <i
                    className={`${styles.filterIcon} d-inline-flex icon-arrow-double`}
                  ></i>
                </div>
              </div>
              <div
                className={`${styles.singleCatgTourmentBox} col-12 d-inline-flex flex-column`}
              >
                {Object.keys(tournamentList[tour])?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="col-12 d-inline-flex flex-column"
                    >
                      <div
                        className={`${styles.singleGameHeader} ${
                          !tournamentList[tour][item].open &&
                          styles.closeGameHeader
                        } col-12 d-inline-flex align-items-center justify-content-between position-relative`}
                        onClick={() => openMatchDetail(tour, item)}
                      >
                        <div
                          className={`${styles.gameCountTitle} d-inline-flex align-items-center`}
                        >
                          <span
                            className={`${styles.gameEventCount} d-inline-flex align-items-center justify-content-center`}
                          >
                            {tournamentList[tour][item]?.matches?.length}
                          </span>
                          <span
                            className={`${styles.gameEventName} d-inline-flex`}
                          >
                            {item}
                          </span>
                        </div>
                        <span
                          className={`${styles.gameArrow} ${
                            tournamentList[tour][item].open &&
                            styles.gameArrowOpen
                          }  icon-arrow-down-sencodary position-absolute d-inline-block`}
                        ></span>
                      </div>
                      <div
                        className={`${styles.gamesCardContainer} ${
                          tournamentList[tour][item].open
                            ? "d-inline-block"
                            : "d-none"
                        } col-12`}
                      >
                        <div
                          className={`${styles.singleGameCardBox} col-12 d-inline-block`}
                        >
                          {tournamentList[tour][item]?.matches?.map(
                            (match, matchIndex) => {
                              return (
                                <div
                                  key={matchIndex}
                                  className={`${styles.gameHeaderRow} col-12 d-inline-flex align-items-center justify-content-between`}
                                  onClick={() => openGameDetail(match)}
                                >
                                  <div
                                    className={`${styles.gamesTypeName} d-inline-flex align-items-center`}
                                  >
                                    <div
                                      className={`${styles.gameFavorate} ${
                                        styles.bookMarkGame
                                      } ${
                                        faveGame.indexOf(match.id) > -1 &&
                                        styles.favourateGame
                                      } position-relative`}
                                      onClick={(event) =>
                                        setGameFavrite(
                                          event,
                                          match.date,
                                          match.id
                                        )
                                      }
                                    >
                                      <span className="icon-star invisible"></span>
                                    </div>
                                    <div className="d-inline-flex flex-column">
                                      <div
                                        className={`${styles.gameBetType} d-inline-flex align-items-center`}
                                      >
                                        <i className="icon-live"></i>

                                        {match.has_fancy ? (
                                          <div className="icon-fancybet">
                                            <span className="icon-fancybet path1"></span>
                                            <span className="icon-fancybet path2"></span>
                                            <span className="icon-fancybet path3"></span>
                                            <span className="icon-fancybet path4"></span>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {match.has_premium ? (
                                          <div className="icon-sportsbook">
                                            <span className="icon-sportsbook path1"></span>
                                            <span className="icon-sportsbook path2"></span>
                                            <span className="icon-sportsbook path3"></span>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {match.has_bookmaker ? (
                                          <div className="icon-bookmaker">
                                            <span className="icon-bookmaker path1"></span>
                                            <span className="icon-bookmaker path2"></span>
                                            <span className="icon-bookmaker path3"></span>
                                            <span className="icon-bookmaker path4"></span>
                                          </div>
                                        ) : (
                                          ""
                                        )}
                                        {inPlay && (
                                          <div
                                            className={`${styles.bgInPlay} d-inline-flex align-items-center justify-content-center`}
                                          >
                                            In-play
                                          </div>
                                        )}
                                        {match?.date && (
                                          <span
                                            className={`${styles.mateDateBox} d-inline-flex align-items-center`}
                                          >
                                            {getDateYearNumFormat(
                                              match.date,
                                              1
                                            )}{" "}
                                            {formatTimeHh(match.date, 1)}
                                          </span>
                                        )}
                                        {checkECricket(match) && (
                                          <span className={styles.gameE}>
                                            <i></i> {match.name}
                                          </span>
                                        )}
                                      </div>
                                      <div
                                        className={`${styles.currentBetGame} d-inline-flex`}
                                      >
                                        {match.team_one_name} -{" "}
                                        {match.team_two_name}
                                      </div>
                                    </div>
                                  </div>
                                  <div
                                    className={`${styles.betStatusValBox} d-inline-flex align-items-center justify-content-end`}
                                  >
                                    <div
                                      className={`position-relative d-inline-flex align-items-center`}
                                    >
                                      <span className={styles.betStatusVal}>
                                        0&nbsp;&nbsp;:&nbsp;&nbsp;
                                      </span>
                                      <span className={styles.betStatusVal}>
                                        0
                                      </span>
                                    </div>
                                    <i
                                      className={`${styles.gameOpenArrow} icon-arrow-down`}
                                    ></i>
                                  </div>
                                </div>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      ) : (
        <NoData title="No Data" />
      )}
    </React.Fragment>
  );
};

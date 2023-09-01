import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../GameList/GameList.module.css";
import { encrypt } from "../../../utils/crypto";
import { NoData } from "../NoData/NoData";
import { GameListCompetition } from "../GameListCompetition/GameListCompetition";
import { ToastPopup } from "../ToastPopup/ToastPopup";
import {
  getDateYearNumFormat,
  formatTimeHh,
  checkECricket,
} from "../../../utils/helper";
import { useAuth } from "../../../context/AuthContextProvider";
import ApiService from "../../../services/ApiService";

export const GameByTime = ({
  allGameList,
  tournamentList,
  setTournamentList,
  inPlay,
  gameType,
  setsortGameList,
  sortGameList,
  playType,
  setFaveGame,
  faveGame,
}) => {
  const navigate = useNavigate();
  const [passChange, setPassChange] = useState(false);
  const auth = useAuth();
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

  const setGameFavrite = (event, matchId) => {
    if (auth.auth.loggedIn) {
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
          setPassChange(true);
        })
        .catch((err) => {});
    } else {
      navigate("/login");
    }
    event.stopPropagation();
  };

  return (
    <React.Fragment>
      {allGameList.length > 0 ? (
        allGameList.map((tour, tourIndex) => {
          return (
            <div
              key={tourIndex}
              className={`${styles.singleGameContiner} p-0 position-relative col-12 d-inline-block`}
            >
              {tour !== gameType ? (
                <div
                  className={`${styles.allTabTitle} ${styles.GameTabTitle} col-12 d-inline-flex justify-content-between`}
                >
                  <div
                    className={`${styles.titleGameName} position-relative d-inline-flex`}
                  >
                    {tour}
                  </div>
                </div>
              ) : (
                <div
                  className={`${styles.gameAllCompeteBox} col-12 d-inline-flex`}
                >
                  <GameListCompetition setsortGameList={setsortGameList} />
                </div>
              )}
              <div
                className={`${styles.singleCatgTourmentBox} col-12 d-inline-flex flex-column`}
              >
                <div className="col-12 d-inline-flex flex-column">
                  <div
                    className={`${styles.gamesCardContainer} d-inline-block col-12`}
                  >
                    <div
                      className={`${styles.singleGameCardBox} p-0 col-12 d-inline-block`}
                    >
                      {tournamentList[tour]?.matches
                        ?.sort(function (a, b) {
                          if (sortGameList === "by Time") {
                            if (a.date < b.date) {
                              return -1;
                            }
                            if (a.date > b.date) {
                              return 1;
                            }
                            return 0;
                          }
                          if (sortGameList === "by Matched") {
                            if (a.totalMatched === b.totalMatched) {
                              return 0;
                            }

                            if (!a.totalMatched) {
                              return 1;
                            }
                            if (!b.totalMatched) {
                              return -1;
                            }

                            if (a.totalMatched > b.totalMatched) {
                              return -1;
                            }
                            if (a.totalMatched < b.totalMatched) {
                              return 1;
                            }
                            return 0;
                          }
                        })
                        .map((match, matchIndex) => {
                          return (
                            <div
                              key={matchIndex}
                              className={`${styles.singleGameCardRow} col-12 d-inline-flex align-items-stretch justify-content-between`}
                              onClick={() => openGameDetail(match)}
                            >
                              {sortGameList === "by Time" && (
                                <>
                                  {inPlay ? (
                                    <div
                                      className={`${styles.bgInPlay} d-inline-flex flex-shrink-0 align-items-center justify-content-center`}
                                    >
                                      In-play
                                    </div>
                                  ) : playType === "Today" ? (
                                    <div
                                      className={`${styles.todayPlay} d-inline-flex flex-shrink-0 align-items-center justify-content-center flex-wrap text-center`}
                                    >
                                      Today <br />
                                      {formatTimeHh(match.date, 1)}
                                    </div>
                                  ) : playType === "Tomorrow" ? (
                                    <div
                                      className={`${styles.tomorrowPlay} d-inline-flex flex-shrink-0 align-items-center justify-content-center flex-wrap text-center`}
                                    >
                                      {getDateYearNumFormat(match.date, 1)}{" "}
                                      <br />
                                      {formatTimeHh(match.date, 1)}
                                    </div>
                                  ) : (
                                    ""
                                  )}
                                </>
                              )}
                              <div
                                className={`${styles.gameHeaderRow} ps-2 col-12 flex-shrink-1 d-inline-flex align-items-center justify-content-between`}
                              >
                                <div
                                  className={`${styles.gamesTypeName} d-inline-flex align-items-center`}
                                >
                                  <div
                                    className={`${styles.gameFavorate} ${
                                      styles.bookMarkGame
                                    } ${
                                      faveGame.indexOf(match.id) > -1 ||
                                      match.is_fav === 1
                                        ? styles.favourateGame
                                        : ""
                                    } position-relative`}
                                    onClick={(event) =>
                                      setGameFavrite(event, match.id)
                                    }
                                  >
                                    <span className="icon-star invisible"></span>
                                  </div>
                                  <div className="d-inline-flex flex-column">
                                    <div
                                      className={`${styles.currentBetGame} d-inline-flex`}
                                    >
                                      {match.team_one_name} -{" "}
                                      {match.team_two_name}
                                    </div>
                                    <div
                                      className={`${styles.gameBetType} d-inline-flex align-items-center`}
                                    >
                                      <i className="icon-live"></i>
                                      <span className={styles.matchedData}>
                                        Matched -{" "}
                                        {match.totalMatched
                                          ? match.totalMatched
                                          : 0}
                                      </span>
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
                                      {checkECricket(match) && (
                                        <span className={styles.gameE}>
                                          <i></i> {match.name}
                                        </span>
                                      )}
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
                            </div>
                          );
                        })}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <NoData title="No Data" />
      )}
      {passChange && (
        <ToastPopup
          status={true}
          betbox={true}
          title="Marked Favourite"
          message="Game set to mark as Favourite"
          setPassChange={setPassChange}
        />
      )}
    </React.Fragment>
  );
};

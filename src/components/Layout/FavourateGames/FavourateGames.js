import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { encrypt } from "../../../utils/crypto";
import styles from "../GameList/GameList.module.css";
import {
  getDateYearNumFormat,
  formatTimeHh,
  checkECricket,
} from "../../../utils/helper";
import { ToastPopup } from "../ToastPopup/ToastPopup";
import ApiService from "../../../services/ApiService";
import { useApp } from "../../../context/AppContextProvider";
import { NoData } from "../NoData/NoData";

export const FavourateGames = ({
  faveMatchList,
  setFaveMatchList,
  faveMatchCount,
  setFaveMatchCount,
}) => {
  const navigate = useNavigate();
  const appData = useApp();
  const [faveGame, setFaveGame] = useState([]);
  const [passChange, setPassChange] = useState(false);

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

  const setGameFavrite = (event, date, matchId) => {
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
        appData.setAppData({ ...appData.appData, listLoading: true });
        setFaveMatchList([]);
        setFaveMatchCount(0);
        ApiService.tournamentMatchList("all", "", "fav", "", "")
          .then((res) => {
            if (res?.data) {
              setFaveMatchList(res?.data);
              setFaveMatchCount(res?.data.length);
              appData.setAppData({ ...appData.appData, listLoading: false });
            } else {
              setFaveMatchList([]);
              setFaveMatchCount(0);
              appData.setAppData({ ...appData.appData, listLoading: false });
            }
          })
          .catch((error) => {
            appData.setAppData({ ...appData.appData, listLoading: false });
          });
      })
      .catch((err) => {
        appData.setAppData({ ...appData.appData, listLoading: false });
      });

    event.stopPropagation();
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.Favourats} overflow-y-auto position-fixed start-0 end-0 m-auto d-inline-flex flex-column`}
      >
        <div
          className={`${styles.singleGameContiner} position-relative col-12 d-inline-block`}
        >
          <div className={`${styles.gamesCardContainer} d-inline-block col-12`}>
            <div
              className={`${styles.singleGameCardBox} col-12 d-inline-block`}
            >
              {faveMatchCount === 0 && <NoData title="No Favourite" />}
              {faveMatchCount > 0 &&
                faveMatchList.map((match, matchIndex) => {
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
                          className={`${styles.gameFavorate} ${styles.bookMarkGame} ${styles.favourateGame} position-relative`}
                          onClick={(event) =>
                            setGameFavrite(event, match.date, match.id)
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
                            {match?.date && (
                              <span
                                className={`${styles.mateDateBox} d-inline-flex align-items-center`}
                              >
                                {getDateYearNumFormat(match.date, 1)}{" "}
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
                            {match.team_one_name} - {match.team_two_name}
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
                          <span className={styles.betStatusVal}>0</span>
                        </div>
                        <i
                          className={`${styles.gameOpenArrow} icon-arrow-down`}
                        ></i>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
      {passChange && (
        <ToastPopup
          status={true}
          betbox={true}
          title="Marked UnFavourite"
          message="Game set to mark as UnFavourite"
          setPassChange={setPassChange}
        />
      )}
    </React.Fragment>
  );
};

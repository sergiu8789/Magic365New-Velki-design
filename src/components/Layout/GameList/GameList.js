import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBet } from "../../../context/BetContextProvider";
import styles from "./GameList.module.css";

export const GameList = () => {
  const navigate = useNavigate();
  const betData = useBet();
  const [closeMatchBox, setcloseMatchBox] = useState(true);

  const openBetSlip = () => {
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: "true",
    });
  };

  const openGameDetail = () => {
    navigate("/full-market");
  };

  const openMatchDetail = () => {
    if (closeMatchBox) {
      setcloseMatchBox(false);
    } else {
      setcloseMatchBox(true);
    }
  };

  const closeAllMatch = () => {
    if (closeMatchBox) {
      setcloseMatchBox(false);
    } else {
      setcloseMatchBox(true);
    }
  };

  return (
    <React.Fragment>
      <div
        className={`${styles.singleGameContiner} position-relative col-12 d-inline-block`}
      >
        <div
          className={`${styles.allTabTitle} col-12 d-inline-flex justify-content-between`}
        >
          <div
            className={`${styles.titleGameName} position-relative d-inline-flex`}
          >
            Cricket
          </div>
          <div
            className={`${styles.sortFilterBtn} ${
              closeMatchBox === false && styles.closeAllGames
            } d-inline-flex align-items-center justify-content-center`}
            onClick={closeAllMatch}
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
          <div className="col-12 d-inline-flex flex-column">
            <div
              className={`${styles.singleGameHeader} ${
                closeMatchBox === false && styles.closeGameHeader
              } col-12 d-inline-flex align-items-center justify-content-between position-relative`}
              onClick={openMatchDetail}
            >
              <div
                className={`${styles.gameCountTitle} d-inline-flex align-items-center`}
              >
                <span
                  className={`${styles.gameEventCount} d-inline-flex align-items-center justify-content-center`}
                >
                  1
                </span>
                <span className={`${styles.gameEventName} d-inline-flex`}>
                  Test Matches
                </span>
              </div>
              <span
                className={`${styles.gameArrow} ${
                  closeMatchBox === true && styles.gameArrowOpen
                }  icon-arrow-down-sencodary position-absolute d-inline-block`}
              ></span>
            </div>
            <div
              className={`${styles.gamesCardContainer} ${
                closeMatchBox === true ? "d-inline-block" : "d-none"
              } col-12`}
            >
              <div
                className={`${styles.singleGameCardBox} col-12 d-inline-block`}
              >
                <div
                  className={`${styles.gameHeaderRow} col-12 d-inline-flex align-items-center justify-content-between`}
                  onClick={openGameDetail}
                >
                  <div
                    className={`${styles.gamesTypeName} d-inline-flex align-items-center`}
                  >
                    <div className={styles.gameFavorate}>
                      <span className="icon-star"></span>
                    </div>
                    <div className="d-inline-flex flex-column">
                      <div
                        className={`${styles.gameBetType} d-inline-flex align-items-center`}
                      >
                        <i className="icon-live"></i>
                        <div className="icon-fancybet">
                          <span className="icon-fancybet path1"></span>
                          <span className="icon-fancybet path2"></span>
                          <span className="icon-fancybet path3"></span>
                          <span className="icon-fancybet path4"></span>
                        </div>
                        <div className="icon-sportsbook">
                          <span className="icon-sportsbook path1"></span>
                          <span className="icon-sportsbook path2"></span>
                          <span className="icon-sportsbook path3"></span>
                        </div>
                        <div className="icon-bookmaker">
                          <span className="icon-bookmaker path1"></span>
                          <span className="icon-bookmaker path2"></span>
                          <span className="icon-bookmaker path3"></span>
                          <span className="icon-bookmaker path4"></span>
                        </div>
                        <div
                          className={`${styles.bgInPlay} d-inline-flex align-items-center justify-content-center`}
                        >
                          In-play
                        </div>
                      </div>
                      <div className={`${styles.currentBetGame} d-inline-flex`}>
                        Sri Lanka - Pakistan
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
                <div
                  className={`${styles.gameStatsContainer} d-inline-flex align-items-center col-12 position-relatve overflow-hidden flex-column`}
                >
                  <div
                    className={`${styles.gameStatsHeader} d-inline-flex align-items-center col-12`}
                  >
                    <div
                      className={`${styles.matchOddBetCount} col-8 d-inline-flex align-items-center`}
                    >
                      <span className={styles.matchOdds}>Match Odds</span>
                      <div className={`d-inline-flex align-items-center`}>
                        <span className={styles.betMatchText}>Matched</span>
                        <span className={styles.matchOddCount}>24,298,446</span>
                      </div>
                    </div>
                    <div className="col-4 d-inline-flex align-items-center">
                      <span
                        className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
                      >
                        Back
                      </span>
                      <span
                        className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
                      >
                        Lay
                      </span>
                    </div>
                  </div>
                  <div
                    className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
                  >
                    <div
                      className={`${styles.gameName} d-inline-flex align-items-center col-8`}
                    >
                      Sri Lanka
                    </div>
                    <div
                      className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                    >
                      <div
                        className={`${styles.backBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                        onClick={openBetSlip}
                      >
                        <span className={`${styles.oddStake}`}>5.6</span>
                        <span className={`${styles.oddExposure}`}>123</span>
                      </div>
                      <div
                        className={`${styles.LayBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>8.9</span>
                        <span className={`${styles.oddExposure}`}>450</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
                  >
                    <div
                      className={`${styles.gameName} d-inline-flex align-items-center col-8`}
                    >
                      Pakistan
                    </div>
                    <div
                      className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                    >
                      <div
                        className={`${styles.backBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>5.6</span>
                        <span className={`${styles.oddExposure}`}>123</span>
                      </div>
                      <div
                        className={`${styles.LayBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>8.9</span>
                        <span className={`${styles.oddExposure}`}>450</span>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
                  >
                    <div
                      className={`${styles.gameName} d-inline-flex align-items-center col-8`}
                    >
                      The Draw
                    </div>
                    <div
                      className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                    >
                      <div
                        className={`${styles.backBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>5.6</span>
                        <span className={`${styles.oddExposure}`}>123</span>
                      </div>
                      <div
                        className={`${styles.LayBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>8.9</span>
                        <span className={`${styles.oddExposure}`}>450</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

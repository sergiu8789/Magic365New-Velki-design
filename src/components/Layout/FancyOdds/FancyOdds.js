import React, { useState, useEffect, useRef } from "react";
import styles from "./FancyOdds.module.css";
import { FancyBookOdds } from "../FancyBookOdds/FancyBookOdds";
import { useBet } from "../../../context/BetContextProvider";
import { useExposure } from "../../../context/ExposureContextProvider";
import { useApp } from "../../../context/AppContextProvider";

export const FancyOdds = ({
  oddsList,
  matchId,
  time,
  betList,
  teamone,
  teamtwo,
  playWindow,
}) => {
  const betData = useBet();
  const expoData = useExposure();
  const appData = useApp();
  const [matchFancyOdds, setMatchFancyOdds] = useState("");
  const [fancyBookOdd, setFancyBookOdds] = useState(false);
  const prevCountRef = useRef(matchFancyOdds);
  const [selectionDetails, setSelectionDetails] = useState({});

  const showBookOdds = (item, exposure) => {
    const details = {
      teamone: teamone,
      teamtwo: teamtwo,
      name: item.nat,
      aboveValue: exposure.above.val,
      belowValue: exposure.below.val,
      abovePL: exposure.above.pl,
      belowPL: exposure.below.pl,
    };
    setSelectionDetails(details);
    setFancyBookOdds(true);
  };

  const placeBet = (item, type, event) => {
    const betSelection = {
      amount: "",
      type: type,
      size: type === 1 ? item?.b1 : item?.l1,
      odds: type === 1 ? item?.bs1 : item?.ls1,
      selection: item.nat,
      runner_name: item.nat,
      selection_id: item.sid,
      market_id: item.mid,
      match_id: matchId,
      market_name: "",
      status: item.gstatus,
      market_type: "fancy",
    };
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: true,
      betSelection: betSelection,
    });
    let cuurentElem = event.currentTarget.getBoundingClientRect().top - 70;
    setTimeout(function () {
      let cuurentScroll = playWindow.current.scrollTop;
      cuurentScroll = cuurentElem + cuurentScroll;
      playWindow.current.scrollTop = cuurentScroll;
    }, 500);
  };

  useEffect(() => {
    let allRunners = [];
    if (oddsList?.length) {
      let matched = oddsList.filter((item) => {
        if (
          item.nat === betData?.betData?.betSelection?.selection &&
          item.gstatus !== betData?.betData?.betSelection?.status
        ) {
          return item;
        }
      });
      if (matched?.length) {
        betData.setBetData({
          ...betData.betData,
          betSelection: {
            ...betData.betData.betSelection,
            status: matched[0].gstatus,
          },
        });
      } else {
        betData.setBetData({
          ...betData.betData,
          betSelection: { ...betData.betData.betSelection, status: "" },
        });
      }
      oddsList?.map((item, index) => {
        let gameName = {
          Back: item?.b1,
          BackSize: item?.bs1,
          Lay: item?.l1,
          LaySize: item?.ls1,
        };
        allRunners.push(gameName);
      });
      setMatchFancyOdds(allRunners);
      prevCountRef.current = matchFancyOdds;
    }
  }, [oddsList]);

  useEffect(() => {
    let fancyExposure = {};

    betList?.forEach((bet) => {
      if (bet.market_type === "fancy") {
        bet.selection_id = bet?.selection_id?.toString();
        if (fancyExposure[bet.selection_id]) {
          fancyExposure[bet.selection_id].stake =
            fancyExposure[bet.selection_id].stake +
            (bet.type === 1
              ? parseFloat(bet.amount)
              : (parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                parseFloat(bet.amount));
          if (bet.type === 1) {
            if (fancyExposure[bet.selection_id].above.val >= bet.size) {
              fancyExposure[bet.selection_id].above.pl =
                fancyExposure[bet.selection_id].above.pl +
                ((parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                  parseFloat(bet.amount));
              fancyExposure[bet.selection_id].below.pl =
                fancyExposure[bet.selection_id].below.pl -
                parseFloat(bet.amount);
            } else {
              fancyExposure[bet.selection_id].between = {
                val:
                  fancyExposure[bet.selection_id].above.val +
                  "-" +
                  (bet.size - 1),
                pl:
                  fancyExposure[bet.selection_id].above.pl -
                  parseFloat(bet.amount),
              };
              fancyExposure[bet.selection_id].above.val = bet.size;
              fancyExposure[bet.selection_id].above.pl =
                fancyExposure[bet.selection_id].above.pl +
                ((parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                  parseFloat(bet.amount));
              fancyExposure[bet.selection_id].below.pl =
                fancyExposure[bet.selection_id].below.pl -
                parseFloat(bet.amount);
            }
          } else {
            if (fancyExposure[bet.selection_id].below.val <= bet.size) {
              fancyExposure[bet.selection_id].above.pl =
                fancyExposure[bet.selection_id].above.pl -
                ((parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                  parseFloat(bet.amount));
              fancyExposure[bet.selection_id].below.pl =
                fancyExposure[bet.selection_id].below.pl +
                parseFloat(bet.amount);
            }
            //console.log(bet.selection_name,fancyExposure[bet.selection_name])
          }
        } else {
          fancyExposure[bet.selection_id] = {
            stake:
              bet.type === 1
                ? parseFloat(bet.amount)
                : (parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                  parseFloat(bet.amount),
          };
          if (bet.type === 1) {
            fancyExposure[bet.selection_id].above = {
              val: bet.size,
              pl:
                (parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                parseFloat(bet.amount),
            };
            fancyExposure[bet.selection_id].below = {
              val: bet.size - 1,
              pl: -parseFloat(bet.amount),
            };
          } else {
            fancyExposure[bet.selection_id].above = {
              val: bet.size + 1,
              pl: -parseFloat(bet.amount),
            };
            fancyExposure[bet.selection_id].below = {
              val: bet.size,
              pl:
                (parseFloat(bet.odds) / 100 + 1) * parseFloat(bet.amount) -
                parseFloat(bet.amount),
            };
          }
        }
      }
    });
    expoData.setFancyExpoData({ oldExpoData: fancyExposure, updatedExpo: {} });
  }, [betList]);

  useEffect(() => {
    if (betData.betData.betSelection.amount) {
      if (betData.betData.betSelection.market_type === "fancy") {
        let fancyExposure = {};

        if (
          expoData?.fancyExpoData?.oldExpoData &&
          expoData.fancyExpoData.oldExpoData[
            betData.betData.betSelection.selection_id
          ]
        ) {
          if (betData.betData.betSelection.amount) {
            fancyExposure[
              betData.betData.betSelection.selection_id?.toString()
            ] = {
              stake:
                expoData.fancyExpoData.oldExpoData[
                  betData.betData.betSelection.selection_id
                ].stake +
                (betData.betData.betSelection.type === 1
                  ? parseFloat(betData.betData.betSelection.amount)
                  : (parseFloat(betData.betData.betSelection.odds) / 100 + 1) *
                      parseFloat(betData.betData.betSelection.amount) -
                    parseFloat(betData.betData.betSelection.amount)),
            };
          } else
            fancyExposure[
              betData.betData.betSelection.selection_id?.toString()
            ] = {
              stake:
                expoData.fancyExpoData.oldExpoData[
                  betData.betData.betSelection.selection_id
                ].stake,
            };
        } else {
          if (betData.betData.betSelection.amount) {
            fancyExposure[
              betData.betData.betSelection.selection_id?.toString()
            ] = {
              stake:
                betData.betData.betSelection.type === 1
                  ? parseFloat(betData.betData.betSelection.amount)
                  : (parseFloat(betData.betData.betSelection.odds) / 100 + 1) *
                      parseFloat(betData.betData.betSelection.amount) -
                    parseFloat(betData.betData.betSelection.amount),
            };
          } else {
            fancyExposure[
              betData.betData.betSelection.selection_id?.toString()
            ] = { stake: 0 };
          }
        }
        expoData.setFancyExpoData({
          ...expoData.fancyExpoData,
          updatedExpo: fancyExposure,
        });
      }
    } else {
      expoData.setFancyExpoData({
        oldExpoData: expoData.fancyExpoData.oldExpoData,
        updtedExpo: {},
      });
    }
  }, [
    betData.betData.betSelection.amount,
    betData.betData.betSelection.selection_id,
  ]);

  return (
    <React.Fragment>
      <div className="col-12 d-inline-flex justify-content-end">
        <div className={`${styles.lastUpdate} col-8 align-items-center`}>
          Last Updated: {time}
        </div>
        <div className="col-4 d-inline-flex align-items-center">
          <span
            className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
          >
            No
          </span>
          <span
            className={`${styles.backLayText} d-inline-flex justify-content-center col-6`}
          >
            Yes
          </span>
        </div>
      </div>
      {oddsList
        ?.sort(function (a, b) {
          if (a.nat < b.nat) {
            return -1;
          }
          if (a.nat > b.nat) {
            return 1;
          }
          return 0;
        })
        ?.map((item, index) => {
          return (
            <React.Fragment key={index}>
              <div className="position-relative col-12 d-inline-flex flex-wrap">
                <div
                  className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
                >
                  <div
                    className={`${styles.MatchOddsBox} d-inline-flex flex-column justify-content-center align-items-center col-8`}
                  >
                    <label
                      className={`${styles.gameName} d-inline-flex col-12`}
                    >
                      {item.nat}
                    </label>
                    <div className="col-12 d-inline-flex align-items-center">
                      {item.sid &&
                        expoData?.fancyExpoData?.oldExpoData[item.sid]
                          ?.stake && (
                          <span
                            className={`${styles.runningExposure} ${
                              parseFloat(
                                expoData?.fancyExpoData?.oldExpoData[item.sid]
                                  ?.stake
                              )?.toFixed(2) > 0
                                ? styles.runningPos
                                : styles.runningNeg
                            } d-inline-flex`}
                          >
                            {expoData?.fancyExpoData?.oldExpoData[
                              item.sid
                            ]?.stake?.toFixed(2)}
                          </span>
                        )}
                      {expoData?.fancyExpoData?.updatedExpo &&
                        item?.sid &&
                        expoData?.fancyExpoData?.updatedExpo[item.sid]
                          ?.stake && (
                          <span
                            className={`${styles.runningExposure} ${
                              expoData?.fancyExpoData?.updatedExpo[
                                item.sid
                              ]?.stake?.toFixed(2) > 0
                                ? styles.runningPos
                                : styles.runningNeg
                            } d-inline-flex align-items-center`}
                          >
                            <div
                              className={`${styles.ExposureArrow} icon-arrow-left`}
                            ></div>
                            {expoData?.fancyExpoData?.updatedExpo[
                              item.sid
                            ]?.stake?.toFixed(2)}
                          </span>
                        )}
                    </div>
                  </div>
                  <div
                    className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                  >
                    <div
                      onClick={(event) => placeBet(item, 2, event)}
                      className={`${
                        styles.LayBetBox
                      } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                        item.l1 != prevCountRef.current[index]?.Lay && appData.appData.highlightOdds
                          ? styles.animateSparkLay
                          : ""
                      } ${
                        item.ls1 != prevCountRef.current[index]?.LaySize && appData.appData.highlightOdds
                          ? styles.animateSparkLay
                          : ""
                      }`}
                    >
                      <span className={`${styles.oddStake}`}>{item.l1}</span>
                      <span className={`${styles.oddExposure}`}>
                        {item.ls1}
                      </span>
                    </div>
                    <div
                      onClick={(event) => placeBet(item, 1, event)}
                      className={`${
                        styles.backBetBox
                      } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center  ${
                        item.b1 != prevCountRef.current[index]?.Back && appData.appData.highlightOdds
                          ? styles.animateSparkBack
                          : ""
                      } ${
                        item.bs1 != prevCountRef.current[index]?.BackSize && appData.appData.highlightOdds
                          ? styles.animateSparkBack
                          : ""
                      }`}
                    >
                      <span className={`${styles.oddStake}`}>{item.b1}</span>
                      <span className={`${styles.oddExposure}`}>
                        {item.bs1}
                      </span>
                    </div>
                    {/* SUSPEND BOX */}
                    {item.gstatus != "" && (
                      <div
                        className={`${styles.oddsDisabled} text-capitalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                      >
                        {item.gstatus}
                      </div>
                    )}
                    {/* END SUSPEND BOX */}
                  </div>
                </div>
              </div>
              <div className="col-12 d-inline-flex align-items-center justify-content-end mt-1">
                <div
                  className={`${styles.betMinMaxAmt} d-inline-flex justify-content-end align-items-center`}
                >
                  <i className="icon-min-max"></i>
                  <span className={styles.minText}>min/max</span>
                  <span className={styles.betMinMax}>
                    {/* {item.min}/{item.max} */}
                    1/500
                  </span>
                </div>
                {expoData?.fancyExpoData?.oldExpoData &&
                  expoData?.fancyExpoData?.oldExpoData[item.sid] && (
                    <div
                      className={`${styles.marketDepthBox} ms-2 d-inline-flex justify-content-center align-items-center`}
                      onClick={() =>
                        showBookOdds(
                          item,
                          expoData?.fancyExpoData?.oldExpoData[item.sid]
                        )
                      }
                    >
                      <i className="icon-graph"></i>
                      <span
                        className={`${styles.marketDepthTxt} d-inline-flex`}
                      >
                        {" "}
                        Book{" "}
                      </span>
                    </div>
                  )}
              </div>
            </React.Fragment>
          );
        })}
      {fancyBookOdd && (
        <FancyBookOdds
          selection={selectionDetails}
          fancyBookOdd={fancyBookOdd}
          setFancyBookOdds={setFancyBookOdds}
        />
      )}
    </React.Fragment>
  );
};

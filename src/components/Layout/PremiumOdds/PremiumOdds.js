import React, { useState, useEffect, useRef } from "react";
import styles from "../MatchOdds/MatchOdds.module.css";
import { useBet } from "../../../context/BetContextProvider";
import { useExposure } from "../../../context/ExposureContextProvider";

export const PremiumOdds = ({ oddsList, betList, playWindow }) => {
  const betData = useBet();
  const expoData = useExposure();
  const [matchPremiumOdds, setMatchPremiumOdds] = useState("");
  const [premiumOddsId, setpremiumOddsId] = useState([]);
  const prevCountRef = useRef(matchPremiumOdds);

  const placeBet = (item, selection, event) => {
    const betSelection = {
      amount: "",
      type: 1,
      size: "",
      odds: selection.odds,
      selection: selection.selectionName,
      runner_name: item.marketName + " --- (" + selection.selectionName + ")",
      selection_id: selection.id,
      market_id: item.id,
      match_id: item.betfairEventId ? item.betfairEventId.toString() : "",
      status: item.apiSiteStatus,
      market_type: "premium",
      pmo: item,
    };
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: true,
      betSelection: betSelection,
    });
    let cuurentElem = event.currentTarget.getBoundingClientRect().top - 100;
    setTimeout(function () {
      let cuurentScroll = playWindow.current.scrollTop;
      cuurentScroll = cuurentElem + cuurentScroll;
      playWindow.current.scrollTop = cuurentScroll;
    }, 500);
  };

  const togglePopularBet = (id, subOdds) => {
    if (subOdds) {
      let newBetArray = [];
      newBetArray = [...premiumOddsId];
      if (newBetArray.indexOf(id) < 0) {
        setpremiumOddsId((prevopenBetList) => [...prevopenBetList, id]);
      } else {
        setpremiumOddsId(premiumOddsId.filter((x) => x !== id));
      }
    }
  };

  useEffect(() => {
    let premiumExposure = {};
    betList?.forEach((bet) => {
      bet.selection_id = parseInt(bet.selection_id);
      bet.market_id = parseInt(bet.market_id);
      if (bet.market_type === "premium") {
        const filteredMarket = oddsList.filter(
          (item) => item.id == bet.market_id
        );
        if (premiumExposure[bet.market_id]) {
          if (filteredMarket.length) {
            filteredMarket[0]?.sportsBookSelection?.map((item) => {
              if (item.id == bet.selection_id)
                premiumExposure[bet.market_id][item.id] =
                  premiumExposure[bet.market_id][item.id] +
                  parseFloat(bet.amount) * parseFloat(bet.odds) -
                  parseFloat(bet.amount);
              else
                premiumExposure[bet.market_id][item.id] =
                  premiumExposure[bet.market_id][item.id] -
                  parseFloat(bet.amount);
            });
          }
        } else {
          premiumExposure[bet.market_id] = {};
          if (filteredMarket.length) {
            filteredMarket[0]?.sportsBookSelection?.map((item) => {
              if (item.id == bet.selection_id)
                premiumExposure[bet.market_id][item.id] =
                  parseFloat(bet.amount) * parseFloat(bet.odds) -
                  parseFloat(bet.amount);
              else
                premiumExposure[bet.market_id][item.id] = -parseFloat(
                  bet.amount
                );
            });
          }
        }
      }
    });
    if (!expoData.premiumExpoData.oldExpoData)
      expoData.setPremiumExpoData({
        ...expoData.premiumExpoData,
        oldExpoData: premiumExposure,
      });
  }, [betList, oddsList]);

  useEffect(() => {
    let betSelection = betData.betData.betSelection;
    if (betSelection.market_type === "premium") {
      if (betSelection.amount) {
        let marketExpo = {};
        let premiumExposure = {};
        const filteredMarket = oddsList.filter(
          (item) => item.id === betSelection.market_id
        );
        if (
          expoData?.premiumExpoData?.oldExpoData &&
          expoData?.premiumExpoData?.oldExpoData[betSelection.market_id] &&
          expoData.premiumExpoData.oldExpoData[betSelection.market_id][
            betSelection.selection_id
          ]
        ) {
          if (filteredMarket.length) {
            filteredMarket[0]?.sportsBookSelection?.map((item) => {
              if (item.id == betSelection.selection_id)
                premiumExposure[item.id] =
                  expoData.premiumExpoData.oldExpoData[betSelection.market_id][
                    item.id
                  ] +
                  parseFloat(betSelection.amount) *
                    parseFloat(betSelection.odds) -
                  parseFloat(betSelection.amount);
              else
                premiumExposure[item.id] =
                  expoData.premiumExpoData.oldExpoData[betSelection.market_id][
                    item.id
                  ] - parseFloat(betSelection.amount);
            });
          }
        } else {
          if (filteredMarket.length) {
            filteredMarket[0]?.sportsBookSelection?.map((item) => {
              if (item.id == betSelection.selection_id)
                premiumExposure[item.id] =
                  parseFloat(betSelection.amount) *
                    parseFloat(betSelection.odds) -
                  parseFloat(betSelection.amount);
              else premiumExposure[item.id] = -parseFloat(betSelection.amount);
            });
          }
        }
        marketExpo[betSelection.market_id] = premiumExposure;
        expoData.setPremiumExpoData({
          ...expoData.premiumExpoData,
          updatedExpoData: marketExpo,
        });
      } else
        expoData.setPremiumExpoData({
          ...expoData.premiumExpoData,
          updatedExpoData: {},
        });
    }
  }, [
    betData.betData.betSelection.amount,
    betData.betData.betSelection.selection_id,
    expoData.premiumExpoData.oldExpoData,
  ]);

  useEffect(() => {
    let allRunners = [];
    if (oddsList?.length) {
      let matched = oddsList.filter((item) => {
        if (
          item.id === betData?.betData?.betSelection?.market_id &&
          item.apiSiteStatus !== betData?.betData?.betSelection?.status
        ) {
          return item;
        }
      });
      if (matched?.length)
        betData.setBetData({
          ...betData.betData,
          betSelection: {
            ...betData.betData.betSelection,
            status: matched[0].apiSiteStatus,
          },
        });
    } else
      betData.setBetData({
        ...betData.betData,
        betSelection: { ...betData.betData.betSelection, status: "" },
      });

    oddsList?.map((item) => {
      item?.sportsBookSelection?.map((selection) => {
        let gameName = {
          Back: selection?.odds,
          GameName: selection.selectionName,
        };
        allRunners.push(gameName);
      });
    });
    setMatchPremiumOdds(allRunners);
    prevCountRef.current = matchPremiumOdds;
  }, [oddsList]);

  return (
    <React.Fragment>
      {oddsList?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${styles.singlePopularBet} ${
              premiumOddsId.includes("PopularBet_" + index)
                ? styles.ClosePopularBet
                : ""
            } col-12 mb-1 d-inline-flex flex-column position-relative`}
            id={`PopularBet_${index}`}
          >
            <div
              className={`${styles.popularTabTitle} col-12 d-inline-flex position-relative align-items-center`}
              onClick={() =>
                togglePopularBet(
                  "PopularBet_" + index,
                  item?.sportsBookSelection
                )
              }
            >
              <div className={`d-inline-flex align-items-center`}>
                <i className="icon-star"></i>
                <label className={styles.popularOddTitle}>
                  {item.marketName}
                </label>
              </div>
              {item?.sportsBookSelection && (
                <i
                  className={`${styles.gameOpenArrow} position-absolute icon-arrow-down`}
                ></i>
              )}
            </div>
            <div
              className={`${styles.poplarOddRow} position-relative col-12 justify-content-end flex-wrap`}
            >
              {item?.sportsBookSelection?.map((selection, selectionIndex) => {
                return (
                  <div
                    onClick={(event) => placeBet(item, selection, event)}
                    key={selectionIndex}
                    className={`${
                      styles.popularOddsStake
                    } d-inline-flex flex-column align-items-center justify-content-center me-auto ${
                      prevCountRef?.current &&
                      selection.odds != prevCountRef.current[index]?.Back
                        ? styles.animateSparkBack
                        : ""
                    }`}
                  >
                    <span
                      className={`${styles.popularExposure} ${styles.oddExposure}`}
                    >
                      {selection.selectionName}
                    </span>
                    <span className={`${styles.oddStake}`}>
                      {selection.odds}
                    </span>
                    <div className="col-12 d-inline-flex justify-content-center align-items-center">
                      {expoData?.premiumExpoData?.oldExpoData &&
                        expoData?.premiumExpoData?.oldExpoData[item.id] &&
                        expoData?.premiumExpoData?.oldExpoData[item.id][
                          selection.id
                        ] && (
                          <span
                            className={`${styles.runningExposure} ${
                              styles.premiumExposure
                            } ${
                              parseFloat(
                                expoData?.premiumExpoData?.oldExpoData[item.id][
                                  selection.id
                                ]
                              )?.toFixed(2) > 0
                                ? styles.runningPos
                                : styles.runningNeg
                            } d-inline-flex align-items-center`}
                          >
                            {expoData?.premiumExpoData?.oldExpoData &&
                              expoData?.premiumExpoData?.oldExpoData[item.id] &&
                              expoData?.premiumExpoData?.oldExpoData[item.id][
                                selection.id
                              ]?.toFixed(2)}
                          </span>
                        )}
                      {expoData?.premiumExpoData?.updatedExpoData &&
                        expoData?.premiumExpoData?.updatedExpoData[item.id] &&
                        expoData?.premiumExpoData?.updatedExpoData[item.id][
                          selection.id
                        ] && (
                          <span
                            className={`${styles.runningExposure} ${
                              styles.premiumExposure
                            } ${
                              parseFloat(
                                expoData?.premiumExpoData?.updatedExpoData[
                                  item.id
                                ][selection.id]
                              )?.toFixed(2) > 0
                                ? styles.runningPos
                                : styles.runningNeg
                            } d-inline-flex align-items-center`}
                          >
                            {expoData?.premiumExpoData?.updatedExpoData &&
                              expoData?.premiumExpoData?.updatedExpoData[
                                item.id
                              ] &&
                              expoData?.premiumExpoData?.updatedExpoData[
                                item.id
                              ][selection.id]?.toFixed(2)}
                          </span>
                        )}
                    </div>
                  </div>
                );
              })}
              {/* SUSPEND BOX */}
              {item.marketStatus != 1 && (
                <div
                  className={`${styles.oddsDisabled} text-capitalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                >
                  Suspend
                </div>
              )}
              {/* END SUSPEND BOX */}
            </div>
          </div>
        );
      })}
    </React.Fragment>
  );
};

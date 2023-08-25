import React, { useEffect, useState, useRef } from "react";
import styles from "../MatchOdds/MatchOdds.module.css";
import ApiService from "../../../services/ApiService";
import { socket } from "../../../services/socket";
import { useBet } from "../../../context/BetContextProvider";
import { useExposure } from "../../../context/ExposureContextProvider";

export const ExchangeOdds = ({
  matchId,
  marketId,
  marketType,
  sethideMarketDepth,
  selectedRunner,
  setSelectedRunner,
  betList,
  playWindow,
}) => {
  const betData = useBet();
  const expoData = useExposure();
  const [matchOddsRunner, setMatchOddsRunner] = useState([]);

  const [fooEvents, setFooEvents] = useState([]);
  const prevCountRef = useRef(matchOddsRunner);
  const tabRef = useRef(null);
  const [selectedMarket, setSelectedMarket] = useState({
    market_id: marketId,
    market: marketType,
  });
  const [exchangeTabList, setExchangeTabList] = useState([]);
  const [marketIdList, setMarketList] = useState([]);
  const [MarketLineWidth, setMarketLineWidth] = useState("");
  const [MarketPosLeft, setMarketPosLeft] = useState("");
  const [allSelections, setAllSelections] = useState([]);

  const selectMarketTab = (event) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let scrollPos = document.querySelector(
      "." + styles.matchOddTitleRow
    ).scrollLeft;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset - 5;
    TabPos = TabPos + scrollPos;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setMarketLineWidth(widthTab);
    setMarketPosLeft(TabPos);
  };

  const placeBet = (item, type, market, event) => {
    const betSelection = {
      amount: "",
      type: type,
      size:
        type === 1
          ? item?.ExchangePrices?.AvailableToBack[0]?.size
          : item?.ExchangePrices?.AvailableToLay[0]?.size,
      odds:
        type === 1
          ? item?.ExchangePrices?.AvailableToBack[0]?.price
          : item?.ExchangePrices?.AvailableToLay[0]?.price,
      selection: item.runnerName,
      runner_name: item.runnerName,
      selection_id: item.SelectionId,
      market_id: market.MarketId,
      match_id: market.eventId,
      market_name: "",
      status: item.Status,
      market_type: selectedMarket.market,
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

  /****** method to fetch other market list from API  ********/
  const getMatchOdds = () => {
    let marketTypes = [selectedMarket];
    setExchangeTabList(marketTypes);
    ApiService.getMatchOdds(matchId).then((res) => {
      if (res?.data?.odds?.length) {
        let marketIds = [];
        res?.data?.odds[0]?.forEach((item) => {
          if (
            item.market_type !== "fancy" &&
            item.market_type !== "bookmaker" &&
            item.market_type !== selectedMarket.market
          ) {
            if (
              !marketTypes?.filter((type) => type.market_id === item.market_id)
                ?.length
            )
              marketTypes.push({
                market_id: item.market_id,
                market: item.market_type,
              });
            marketIds.push(item.market_id);
          }
        });
        if (marketIds.length) {
          marketIds = [...new Set(marketIds)];
          setMarketList(marketIds);
        }
        setExchangeTabList(marketTypes);
      }
    });
  };

  useEffect(() => {
    /******** Exchange odds brodacasting  *****/
    function onBroadCast(value) {
      let allRunners = [];
      if (value?.length) {
        value?.map((item) => {
          // match marketId with socket response
          if (item.MarketId === selectedMarket.market_id) {
            setSelectedRunner(item);
            let selections = [];
            item?.Runners?.map((item, index) => {
              let gameName = {
                Back: item?.ExchangePrices?.AvailableToBack[0].price,
                BackSize: item?.ExchangePrices?.AvailableToBack[0].size,
                Lay: item?.ExchangePrices?.AvailableToLay[0].price,
                LaySize: item?.ExchangePrices?.AvailableToLay[0].size,
              };
              selections.push(item.SelectionId);
              allRunners.push(gameName);
            });
            setAllSelections((previousState) => {
              if (previousState?.join() !== selections?.join())
                return selections;
              else return previousState;
            });
            setMatchOddsRunner(allRunners);
          }
        });
      }
    }
    socket.on("broadcast", onBroadCast); // exchange odds broadcast method
    return () => {
      socket.off("broadcast", onBroadCast);
    };
  }, [fooEvents, selectedMarket.market_id]);

  useEffect(() => {
    getMatchOdds();
    socket.emit("subscription", [marketId]); // socket emit event for exchange odd market
  }, [matchId]);

  useEffect(() => {
    if (marketIdList?.length) socket.emit("subscription", marketIdList); // socket emit event for other exchange odd market
  }, [marketIdList]);

  useEffect(() => {
    prevCountRef.current = matchOddsRunner;
  }, [matchOddsRunner]);

  useEffect(() => {
    let exposure = {};
    allSelections.map((item) => {
      exposure[item] = 0;
    });
    if (betList.length) {
      const filteredBets = betList?.filter(
        (item) => item.market_type === selectedMarket.market
      );
      filteredBets?.map((item) => {
        allSelections?.map((selection) => {
          if (item?.selection_id === selection?.toString()) {
            if (item.type === 1)
              exposure[selection] =
                exposure[selection] + (parseFloat(item.amount) * parseFloat(item.odds) - parseFloat(item.amount));
            else
              exposure[selection] =
                exposure[selection] - (parseFloat(item.amount) * parseFloat(item.odds) - parseFloat(item.amount));
          } else {
            if (item.type === 1)
              exposure[selection] = exposure[selection] - parseFloat(item.amount);
            else
              exposure[selection] = exposure[selection] + parseFloat(item.amount);
          }
        });
      });
    }
    expoData.setExchangeExpoData({
      oldExpoData: exposure,
      showUpdate: false,
    });
  }, [betList, allSelections]);

  useEffect(() => {
    if (selectedRunner?.Runners?.length) {
      selectedRunner?.Runners?.map((item) => {
        if (item.SelectionId === betData.betData.betSelection.selection_id) {
          if (item.Status !== betData.betData.betSelection.status)
            betData.setBetData({
              ...betData.betData,
              betSelection: {
                ...betData.betData.betSelection,
                status: item.Status,
              },
            });
          if (
            betData.betData.betSelection.type === 1 &&
            item.ExchangePrices?.AvailableToBack[0]?.price !==
              betData.betData.betSelection.odds
          ) {
            betData.setBetData({
              ...betData.betData,
              betSelection: {
                ...betData.betData.betSelection,
                odds: item.ExchangePrices?.AvailableToBack[0].price,
              },
            });
          }
          if (
            betData.betData.betSelection.type === 2 &&
            item.ExchangePrices?.AvailableToLay[0]?.price !==
              betData.betData.betSelection.odds
          ) {
            betData.setBetData({
              ...betData.betData,
              betSelection: {
                ...betData.betData.betSelection,
                odds: item.ExchangePrices?.AvailableToLay[0]?.price,
              },
            });
          }
        }
      });
    }
  }, [selectedRunner]);

  useEffect(() => {
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  }, [exchangeTabList]);

  useEffect(() => {
    if (
      betData.betData.betSelection.market_type !== "fancy" &&
      betData.betData.betSelection.market_type !== "bookmaker" &&
      betData.betData.betSelection.market_type !== "premium"
    ) {
      if (betData.betData.betSelection.amount) {
        if (expoData?.exchangeExpoData?.oldExpoData) {
          let updated = {};
          let betSelection = betData?.betData?.betSelection;
          Object.keys(expoData?.exchangeExpoData?.oldExpoData)?.map((item) => {
            if (betSelection?.selection_id?.toString() === item) {
              if (betSelection?.type === 1)
                updated[item] =
                  expoData?.exchangeExpoData?.oldExpoData[item] +
                  (betSelection?.amount !== ""
                    ? parseFloat(betSelection?.odds) *
                        parseFloat(betSelection?.amount) -
                      parseFloat(betSelection?.amount)
                    : 0);
              else
                updated[item] =
                  expoData?.exchangeExpoData?.oldExpoData[item] -
                  (betSelection?.amount !== ""
                    ? parseFloat(betSelection?.odds) *
                        parseFloat(betSelection?.amount) -
                      parseFloat(betSelection?.amount)
                    : 0);
            } else {
              if (betSelection?.type === 1)
                updated[item] =
                  expoData?.exchangeExpoData?.oldExpoData[item] -
                  (betSelection?.amount !== ""
                    ? parseFloat(betSelection?.amount)
                    : 0);
              else
                updated[item] =
                  expoData?.exchangeExpoData?.oldExpoData[item] +
                  (betSelection?.amount !== ""
                    ? parseFloat(betSelection?.amount)
                    : 0);
            }
          });
          expoData.setExchangeExpoData({
            ...expoData.exchangeExpoData,
            updatedExpo: updated,
            showUpdate: true,
          });
        }
      } else {
        expoData.setExchangeExpoData({
          ...expoData.exchangeExpoData,
          updatedExpo: {},
          showUpdate: false,
        });
      }
    }
  }, [betData.betData.betSelection.amount, betData.betData.betSelection.odds]);

  return (
    <React.Fragment>
      <div
        className={`${styles.matchExchange} col-12 d-inline-flex align-items-center justify-content-between`}
      >
        <label className={`${styles.exchangeText} d-inline-flex`}>
          Exchange
        </label>
        <div className={`d-inline-flex align-items-center justify-content-end`}>
          <div className={`d-inline-flex align-items-center`}>
            <span className={styles.betMatchText}>Matched</span>
            <span className={styles.matchOddCount}>
              PTE {selectedRunner?.TotalMatched}
            </span>
          </div>
          <span
            className={`${styles.marketStatus} ${styles.marketStatusLow} d-inline-flex align-items-center`}
          >
            Low
          </span>
        </div>
      </div>
      {exchangeTabList && (
        <div>
          <div
            className={`${styles.matchOddTitleRow} position-relative d-inline-flex align-items-center col-12`}
          >
            {exchangeTabList?.map((item, index) => {
              return (
                <div
                  key={index}
                  onClick={(event) => {
                    setSelectedMarket(item);
                    selectMarketTab(event);
                  }}
                  ref={index === 0 ? tabRef : null}
                  className={`${styles.matchTitleHighlight} d-inline-flex align-items-center flex-shrink-0`}
                >
                  <i className="icon-star"></i>
                  <label className={styles.matchOddTitle + " text-capitalize"}>
                    {item?.market ? item.market?.replace("_", " ") : ""}
                  </label>
                </div>
              );
            })}
            <div
              className={`${styles.oddsActiveLine} d-inline-block position-absolute`}
              style={{
                width: MarketLineWidth + "px",
                transform: "translateX(" + MarketPosLeft + "px)",
              }}
            ></div>
          </div>
          <div
            className={`${styles.marketOddsBox} overflow-hidden col-12 d-inline-block`}
          >
            <div className="col-12 d-inline-flex justify-content-end">
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
            <div className="position-relative col-12 d-inline-flex flex-wrap">
              {selectedRunner?.Runners?.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={`${styles.allMatchBox} col-12 d-inline-flex align-items-stretch position-relative`}
                  >
                    <div
                      className={`${styles.MatchOddsBox} d-inline-flex flex-column justify-content-center align-items-center col-8`}
                    >
                      <label
                        className={`${styles.gameName} d-inline-flex col-12`}
                      >
                        {item.runnerName}
                      </label>
                      <div className="col-12 d-inline-flex align-items-center">
                        <span
                          className={`${styles.runningExposure} ${
                            expoData?.exchangeExpoData?.oldExpoData && 
                            expoData?.exchangeExpoData?.oldExpoData[item.SelectionId] &&
                            expoData?.exchangeExpoData?.oldExpoData[
                              item.SelectionId
                            ].toFixed(2) > 0
                              ? styles.runningPos
                              : styles.runningNeg
                          } ${
                            item.SelectionId &&
                            expoData?.exchangeExpoData?.oldExpoData &&
                            expoData?.exchangeExpoData?.oldExpoData[
                              item.SelectionId
                            ]
                              ? "d-inline-flex"
                              : "d-none"
                          }`}
                        >
                          {parseFloat(
                            expoData?.exchangeExpoData?.oldExpoData[
                              item.SelectionId
                            ]
                          ).toFixed(2)}
                        </span>
                        {expoData?.exchangeExpoData?.showUpdate &&
                          expoData?.exchangeExpoData?.updatedExpo &&
                          expoData?.exchangeExpoData?.updatedExpo[
                            item.SelectionId
                          ] && (
                            <span
                              className={`${styles.runningExposure} ${ 
                                expoData?.exchangeExpoData?.updatedExpo &&
                                expoData?.exchangeExpoData?.updatedExpo[item.SelectionId] &&
                                expoData?.exchangeExpoData?.updatedExpo[
                                  item.SelectionId
                                ].toFixed(2) > 0
                                  ? styles.runningPos
                                  : styles.runningNeg
                              } d-inline-flex align-items-center`}
                            >
                              <div
                                className={`${styles.ExposureArrow} icon-arrow-left`}
                              ></div>
                              {parseFloat(
                                expoData?.exchangeExpoData?.updatedExpo[
                                  item.SelectionId
                                ]
                              ).toFixed(2)}
                            </span>
                          )}
                      </div>
                    </div>

                    <div
                      className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                    >
                      <div
                        onClick={(event) =>
                          placeBet(item, 1, selectedRunner, event)
                        }
                        className={`${
                          styles.backBetBox
                        } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                          item?.ExchangePrices?.AvailableToBack[0].price !=
                          prevCountRef.current[index]?.Back
                            ? styles.animateSparkBack
                            : ""
                        } ${
                          item?.ExchangePrices?.AvailableToBack[0].size !=
                          prevCountRef.current[index]?.BackSize
                            ? styles.animateSparkBack
                            : ""
                        }`}
                      >
                        <span className={`${styles.oddStake}`}>
                          {item?.ExchangePrices?.AvailableToBack[0].price}
                        </span>
                        <span className={`${styles.oddExposure}`}>
                          {item?.ExchangePrices?.AvailableToBack[0].size}
                        </span>
                      </div>
                      <div
                        onClick={(event) =>
                          placeBet(item, 2, selectedRunner, event)
                        }
                        className={`${
                          styles.LayBetBox
                        } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                          item?.ExchangePrices?.AvailableToLay[0].price !=
                          prevCountRef.current[index]?.Lay
                            ? styles.animateSparkLay
                            : ""
                        } ${
                          item?.ExchangePrices?.AvailableToLay[0].size !=
                          prevCountRef.current[index]?.LaySize
                            ? styles.animateSparkLay
                            : ""
                        }`}
                      >
                        <span className={`${styles.oddStake}`}>
                          {item?.ExchangePrices?.AvailableToLay[0].price}
                        </span>
                        <span className={`${styles.oddExposure}`}>
                          {item?.ExchangePrices?.AvailableToLay[0].size}
                        </span>
                      </div>
                      {/* SUSPEND BOX */}
                      {item.Status !== "ACTIVE" && (
                        <div
                          className={`${styles.oddsDisabled} text-captalize position-absolute d-inline-flex justify-content-center align-items-center col-12 h-100`}
                        >
                          {item.Status}
                        </div>
                      )}
                      {/* END SUSPEND BOX */}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="col-12 d-inline-flex align-items-center justify-content-between mt-2">
              <div
                className={`${styles.marketDepthBox} d-inline-flex justify-content-center align-items-center`}
                onClick={() => sethideMarketDepth(true)}
              >
                <i className="icon-graph"></i>
                <span className={`${styles.marketDepthTxt} d-inline-flex`}>
                  {" "}
                  Market Depth{" "}
                </span>
              </div>
              <div
                className={`${styles.betMinMaxAmt} d-inline-flex justify-content-end align-items-center`}
              >
                <i className="icon-min-max"></i>
                <span className={styles.minText}>min/max</span>
                <span className={styles.betMinMax}>1/500</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

import React, { useEffect, useState, useRef } from "react";
import styles from "../MatchOdds/MatchOdds.module.css";
import ApiService from "../../../services/ApiService";
import { socket } from "../../../services/socket";
import { useBet } from "../../../context/BetContextProvider";

export const ExchangeOdds = ({
  matchId,
  marketId,
  marketType,
  sethideMarketDepth,
  selectedRunner,
  setSelectedRunner,
}) => {
  const betData = useBet();
  const [matchOddsRunner, setMatchOddsRunner] = useState("");
  const [fooEvents, setFooEvents] = useState([]);
  const prevCountRef = useRef(matchOddsRunner);
  const [selectedMarket, setSelectedMarket] = useState({
    market_id: marketId,
    market: marketType,
  });
  const [exchangeTabList, setExchangeTabList] = useState([]);
  const [marketIdList, setMarketList] = useState([]);
  const [MarketLineWidth, setMarketLineWidth] = useState("");
  const [MarketPosLeft, setMarketPosLeft] = useState("");

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

  const placeBet = (item, type, market) => {
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
            item.market_type !== "bookmaker"
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
        setMarketList(marketIds);
        setExchangeTabList(marketTypes);
      }
    });
  };

  useEffect(() => {
    getMatchOdds();
  }, [matchId]);

  useEffect(() => {
    if (marketIdList?.length) socket.emit("subscription", marketIdList); // socket emit event for other exchange odd market
  }, [marketIdList]);

  useEffect(() => {
    prevCountRef.current = matchOddsRunner;
  }, [matchOddsRunner]);

  useEffect(() => {
    if (
      document.querySelector(
        "." + styles.allTabList + " ." + styles.popularTab + ":nth-child(1)"
      )
    ) {
      document
        .querySelector(
          "." + styles.allTabList + " ." + styles.popularTab + ":nth-child(1)"
        )
        .click();
    }
    if (
      document.querySelector(
        "." +
          styles.matchOddTitleRow +
          " ." +
          styles.matchTitleHighlight +
          ":nth-child(1)"
      )
    ) {
      document
        .querySelector(
          "." +
            styles.matchOddTitleRow +
            " ." +
            styles.matchTitleHighlight +
            ":nth-child(1)"
        )
        .click();
    }
  }, []);

  useEffect(() => {
    /******** Exchange odds brodacasting  *****/
    function onBroadCast(value) {
      let allRunners = [];
      if (value?.length) {
        value?.map((item) => {
          // match marketId with socket response
          if (item.MarketId === selectedMarket.market_id) {
            setSelectedRunner(item);
            item?.Runners?.map((item, index) => {
              let gameName = {
                Back: item?.ExchangePrices?.AvailableToBack[0].price,
                BackSize: item?.ExchangePrices?.AvailableToBack[0].size,
                Lay: item?.ExchangePrices?.AvailableToLay[0].price,
                LaySize: item?.ExchangePrices?.AvailableToLay[0].size,
              };
              allRunners.push(gameName);
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
                      className={`${styles.gameName} d-inline-flex align-items-center col-8`}
                    >
                      {item.runnerName}
                    </div>
                    <div
                      className={`${styles.oddBetsBox} col-4 position-relative d-inline-flex align-items-stretch`}
                    >
                      <div
                        onClick={() => placeBet(item, 1, selectedRunner)}
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
                          {prevCountRef.current.Back}
                          {item?.ExchangePrices?.AvailableToBack[0].price}
                        </span>
                        <span className={`${styles.oddExposure}`}>
                          {item?.ExchangePrices?.AvailableToBack[0].size}
                        </span>
                      </div>
                      <div
                        onClick={() => placeBet(item, 2, selectedRunner)}
                        className={`${
                          styles.LayBetBox
                        } col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center ${
                          item?.ExchangePrices?.AvailableToBack[0].price !=
                          prevCountRef.current[index]?.Lay
                            ? styles.animateSparkLay
                            : ""
                        } ${
                          item?.ExchangePrices?.AvailableToBack[0].size !=
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

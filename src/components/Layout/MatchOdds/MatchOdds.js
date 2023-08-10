import React, { useState, useEffect } from "react";
import styles from "./MatchOdds.module.css";
import { MarketDepth } from "../../MarketDepth/MarketDepth";
import ApiService from "../../../services/ApiService";
import { socket } from "../../../services/socket";
import { FancyOdds } from "../FancyOdds/FancyOdds";
import { PremiumOdds } from "../PremiumOdds/PremiumOdds";
import { BookmakerOdds } from "../BookmakerOdds/BookmakerOdds";

export const MatchOdds = ({ matchId, marketId, marketType }) => {
  const [hideBookMarker, sethideBookMarker] = useState("false");
  const [hideMarketDepth, sethideMarketDepth] = useState(false);
  const [fancyTabActive, setfancyTabActive] = useState("Fancybet");
  const [popularTabActive, setpopularTabActive] = useState("All");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [selectedMarket, setSelectedMarket] = useState({
    market_id: marketType,
    market: marketType,
  });
  const [fooEvents, setFooEvents] = useState([]);
  const [selectedRunner, setSelectedRunner] = useState("");
  const [fancyOddsList, setFancyOddsList] = useState([]);
  const [bookmakerOddsList, setBookmakerOddsList] = useState("");
  const [premiumOddsList, setPremiumOddsList] = useState([]);

  const selectFancyTab = (tab) => {
    setfancyTabActive(tab);
  };

  /****** method to fetch other market list from API  ********/
  const getMatchOdds = () => {
    ApiService.getMatchOdds(matchId).then((res) => {});
  };

  const openMarketDepth = () => {
    sethideMarketDepth(true);
  };

  const selectPopularTab = (event, name) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let inplay = parseInt(27);
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setTabLineWidth(widthTab);
    setTabPosLeft(TabPos);
    setpopularTabActive(name);
  };

  /******* Sockets events *********/
  useEffect(() => {
    /******** Exchange odds brodacasting  *****/
    function onBroadCast(value) {
      if (value?.length) {
        value?.map((item) => {
          if (item.MarketId === marketId)
            // match marketId with socket response
            setSelectedRunner(item);
        });
      }
    }

    /******** Fancy and Bookmaker odds brodacasting  *****/
    function onFancyBookBroadCast(value) {
      if (value.matchId === matchId) {
        if (value.fancy) setFancyOddsList(value.fancy);
        if (value.bookmaker) setBookmakerOddsList(value.bookmaker);
      }
    }

    /******* Premium odds brodacasting  *****/
    function onPremiumBroadCast(value) {
      if (value?.length) {
        if (value[0]?.betfairEventId == matchId) {
          setPremiumOddsList(value);
        }
      }
    }

    socket.on("broadcast", onBroadCast); // exchange odds broadcast method
    socket.on("broadcastFancy", onFancyBookBroadCast); // fancy and boomaker odds broadcast method
    socket.on("broadcastPremium", onPremiumBroadCast); // premium odds broadcast method

    return () => {
      socket.off("broadcast", onBroadCast);
      socket.off("broadcastFancy", onFancyBookBroadCast);
      socket.off("broadcastPremium", onPremiumBroadCast);
    };
  }, [fooEvents]);

  useEffect(() => {
    socket.emit("fancySubscription", [matchId]); // socket emit event for Fancy and Boomaker markets
    socket.emit("premiumSubscription", [matchId]); // socket emit event for premium markets
    socket.emit("subscription", [matchId]); // socket emit event for exchange odd market
    getMatchOdds(); // method to fetch other market data
  }, [matchId]);

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
  }, []);

  const TabList = ["All", "Popular", "Match", "Over", "Innings", "Players"];
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
            <span className={styles.matchOddCount}>PTE 24,298,446</span>
          </div>
          <span
            className={`${styles.marketStatus} ${styles.marketStatusLow} d-inline-flex align-items-center`}
          >
            Low
          </span>
        </div>
      </div>

      {/* Match Odds Container */}
      {marketId && selectedRunner && (
        <div>
          <div
            className={`${styles.matchOddTitleRow} position-relative d-inline-flex align-items-center col-12`}
          >
            <div
              className={`${styles.matchTitleHighlight} d-inline-flex align-items-center`}
            >
              <i className="icon-star"></i>
              <label className={styles.matchOddTitle + " text-capitalize"}>
                {selectedMarket?.market
                  ? selectedMarket.market?.replace("_", " ")
                  : ""}
              </label>
            </div>
            <div
              className={`${styles.oddsActiveLine} d-inline-block position-absolute`}
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
                        className={`${styles.backBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>
                          {item?.ExchangePrices?.AvailableToBack[0].price}
                        </span>
                        <span className={`${styles.oddExposure}`}>
                          {item?.ExchangePrices?.AvailableToBack[0].size}
                        </span>
                      </div>
                      <div
                        className={`${styles.LayBetBox} col-6 flex-shrink-1 d-inline-flex flex-column align-items-center justify-content-center`}
                      >
                        <span className={`${styles.oddStake}`}>
                          {item?.ExchangePrices?.AvailableToLay[0].price}
                        </span>
                        <span className={`${styles.oddExposure}`}>
                          {item?.ExchangePrices?.AvailableToLay[0].price}
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
                onClick={openMarketDepth}
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
                <span className={styles.betMinMax}>1/2,500</span>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* BookMarker container */}
      <BookmakerOdds oddsList={bookmakerOddsList} />

      {/* Fancy Premium container */}
      <div className={`${styles.fancyOuterBox} col-12 d-inline-block`}>
        <div className={`${styles.fancyPremiumTabBox} col-12 d-inline-flex`}>
          <div
            className={`${styles.marketTabBox} ${styles.FancyTabBox} ${
              fancyTabActive === "Fancybet" && styles.marketTabActive
            } d-inline-flex align-items-center justify-content-center position-relative`}
            onClick={() => selectFancyTab("Fancybet")}
          >
            Fancybet
          </div>
          <div
            className={`${styles.marketTabBox} ${styles.PremiumTabBox} ${
              fancyTabActive === "PremiumBet" && styles.marketTabActive
            } d-inline-flex align-items-center justify-content-center position-relative`}
            onClick={() => selectFancyTab("PremiumBet")}
          >
            PremiumBet
          </div>
        </div>

        <div
          className={`col-12 d-inline-flex position-relative align-items-center`}
        >
          <div
            className={`${styles.allTabList} col-12 d-inline-flex align-items-center`}
          >
            {TabList.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <div
                    className={`${styles.popularTab} ${
                      popularTabActive === item && styles.popularTabActive
                    } d-inline-flex align-items-center justify-content-center flex-shrink-0`}
                    onClick={(event) => selectPopularTab(event, item)}
                  >
                    {item}
                  </div>
                </React.Fragment>
              );
            })}
            <div
              className={`${styles.popularActiveLine} position-absolute d-inline-block`}
              style={{
                width: TabLineWidth + "px",
                transform: "translateX(" + TabPosLeft + "px)",
              }}
            ></div>
          </div>
        </div>

        <div
          className={`${styles.allPopularBets} col-12 d-inline-flex flex-column`}
        >
          {/***** premium and Fancy odds list ********/}
          {fancyTabActive === "PremiumBet" ? (
            <PremiumOdds oddsList={premiumOddsList} />
          ) : (
            <FancyOdds oddsList={fancyOddsList} />
          )}
        </div>
      </div>
      {hideMarketDepth && (
        <MarketDepth
          hideMarketDepth={hideMarketDepth}
          sethideMarketDepth={sethideMarketDepth}
        />
      )}
    </React.Fragment>
  );
};

import React, { useState, useEffect } from "react";
import styles from "./MatchOdds.module.css";
import { MarketDepth } from "../MarketDepth/MarketDepth";
import { socket } from "../../../services/socket";
import { FancyOdds } from "../FancyOdds/FancyOdds";
import { PremiumOdds } from "../PremiumOdds/PremiumOdds";
import { BookmakerOdds } from "../BookmakerOdds/BookmakerOdds";
import { formatFancyTime } from "../../../utils/helper";
import { ExchangeOdds } from "../ExchangeOdds/ExchangeOdds";
import { useApp } from "../../../context/AppContextProvider";

export const MatchOdds = ({ matchId, marketId, marketType }) => {
  const appData = useApp();
  const [hideMarketDepth, sethideMarketDepth] = useState(false);
  const [fancyTabActive, setfancyTabActive] = useState("Fancybet");
  const [popularTabActive, setpopularTabActive] = useState("All");
  const [TabLineWidth, setTabLineWidth] = useState("");
  const [TabPosLeft, setTabPosLeft] = useState("");
  const [fooEvents, setFooEvents] = useState([]);
  const [selectedRunner, setSelectedRunner] = useState("");
  const [fancyOddsList, setFancyOddsList] = useState([]);
  const [bookmakerOddsList, setBookmakerOddsList] = useState("");
  const [premiumOddsList, setPremiumOddsList] = useState([]);
  const [fancyBookUpdated, setFancyBookUpdated] = useState("");
  const TabList = ["All", "Popular", "Match", "Over", "Innings", "Players"];

  const selectFancyTab = (tab) => {
    setfancyTabActive(tab);
  };

  const selectPopularTab = (event, name) => {
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let scrollPos = document.querySelector("." + styles.allTabList).scrollLeft;
    let inplay = parseInt(27);
    pageOffset = pageOffset + inplay;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset;
    TabPos = TabPos + scrollPos;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setTabLineWidth(widthTab);
    setTabPosLeft(TabPos);
    setpopularTabActive(name);
  };

  useEffect(() => {
    /******** Fancy and Bookmaker odds brodacasting  *****/
    function onFancyBookBroadCast(value) {
      if (value.matchId === matchId) {
        //appData.setAppData({...appData.appData,updatedFancyTime:Math.floor((new Date()).getTime() / 1000)});
        if (value.fancy) setFancyOddsList(value.fancy);
        if (value.bookmaker?.bm1) setBookmakerOddsList(value.bookmaker);
        if (value?.servertime)
          setFancyBookUpdated(formatFancyTime(value.servertime));
      }
    }

    /******* Premium odds brodacasting  *****/
    function onPremiumBroadCast(value) {
      if (value?.length) {
        if (value[0]?.betfairEventId == matchId) {
          //appData.setAppData({...appData.appData, updatedPremiumTime :Math.floor((new Date()).getTime() / 1000)});
          setPremiumOddsList(value);
        }
      }
    }

    socket.on("broadcastFancy", onFancyBookBroadCast); // fancy and boomaker odds broadcast method
    socket.on("broadcastPremium", onPremiumBroadCast); // premium odds broadcast method

    return () => {
      socket.off("broadcastFancy", onFancyBookBroadCast);
      socket.off("broadcastPremium", onPremiumBroadCast);
    };
  }, [fooEvents]);

  /******* Sockets events *********/
  useEffect(() => {
    socket.emit("fancySubscription", [matchId]); // socket emit event for Fancy and Boomaker markets
    socket.emit("premiumSubscription", [matchId]); // socket emit event for premium markets
  }, [matchId]);

  return (
    <React.Fragment>
      {/* Exchange Odds Container */}
      {marketId && (
        <ExchangeOdds
          matchId={matchId}
          marketId={marketId}
          marketType={marketType}
          sethideMarketDepth={sethideMarketDepth}
          selectedRunner={selectedRunner}
          setSelectedRunner={setSelectedRunner}
        />
      )}

      {/* BookMarker container */}
      {bookmakerOddsList && (
        <BookmakerOdds oddsList={bookmakerOddsList} matchId={matchId} />
      )}

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
            Sportsbook
          </div>
        </div>

        <div
          className={`col-12 d-inline-flex position-relative align-items-center`}
        >
          <div
            className={`${styles.allTabList} col-12 d-inline-flex align-items-center position-relative`}
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
            <FancyOdds
              oddsList={fancyOddsList}
              matchId={matchId}
              time={fancyBookUpdated}
            />
          )}
        </div>
      </div>
      {hideMarketDepth && (
        <MarketDepth
          selectedRunner={selectedRunner}
          hideMarketDepth={hideMarketDepth}
          sethideMarketDepth={sethideMarketDepth}
        />
      )}
    </React.Fragment>
  );
};

import React, { useEffect, useState, useRef } from "react";
import styles from "./InPlayGames.module.css";
import { useApp } from "../../../context/AppContextProvider";
import { MatchLiveCard } from "../../Layout/MatchLiveCard/MatchLiveCard";
import { MatchScoreCard } from "../../Layout/MatchScoreCard/MatchScoreCard";
import { MatchOdds } from "../../Layout/MatchOdds/MatchOdds";
import { HomeFooter } from "../../Layout/HomeFooter/HomeFooter";
import { useLocation } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { BetSlip } from "../../Layout/BetSlip/BetSlip";
import { useBet } from "../../../context/BetContextProvider";

export const InPlayGames = () => {
  const appData = useApp();
  const betData = useBet();
  const playWindow = useRef(null);
  const liveWindow = useRef(null);
  const location = useLocation();
  const [streamUrl, setStreamUrl] = useState("");
  const [streamOut, setStreamOut] = useState(false);
  const [streamOutscroll, setStreamOutScroll] = useState(0);
  const [scorecardUrl, setScoreCardUrl] = useState("");
  const [slideUpPage, setSlideUpPage] = useState(false);
  const [MarketPosLeft, setMarketPosLeft] = useState("");
  const [MarketLineWidth, setMarketLineWidth] = useState("");
  const tabRef = useRef(null);
  const [scoreTabList,setScoreTabList] = useState(["Live","Scoreboard"]);
  const [selectedScoreTab,setSelectedScoreTab] = useState("Live");

  const closeBetPopup = () => {
    appData.setAppData({
      ...appData.appData,
      appBetSlipOpen: false,
    });
    betData.setBetData({
      ...betData.betData,
      betSlipStatus: false,
      betSelection: {
        ...betData.betData.betSelection,
        amount: "",
      },
    });
  };

  const selectScoreTab = (event,name) => {
    setSelectedScoreTab(name)
    let pageOffset = document.querySelector("#centerMobileMode").offsetLeft;
    let TabPos = event.currentTarget.getBoundingClientRect().left;
    TabPos = TabPos - pageOffset - 5;
    TabPos = TabPos;
    let widthTab = event.currentTarget.getBoundingClientRect().width;
    setMarketLineWidth(widthTab);
    setMarketPosLeft(TabPos);
  };

  useEffect(() => {
    if (location?.state?.match_id) {
      ApiService.getScoreCard(location?.state?.match_id).then((res) => {
        if (res?.streamingUrl) setStreamUrl(res.streamingUrl);
        if (res?.scoreUrl) setScoreCardUrl(res.scoreUrl);
      });
    }
  }, [location?.state?.match_id]);

  useEffect(() => {
    setSlideUpPage(appData.appData.appBetSlipOpen);
  }, [appData.appData.appBetSlipOpen]);
  

  useEffect(() => {
    const handleScroll = () => {
      if (playWindow.current && liveWindow.current) {
        const el = playWindow.current;
        const playerBox = liveWindow.current.clientHeight;
        if (el.scrollTop > playerBox) {
          if (streamOutscroll === 0) {
            setStreamOut(true);
          }
        } else {
          setStreamOut(false);
          setStreamOutScroll(0);
        }
      }
    };

    const element = playWindow.current;
    element.addEventListener("scroll", handleScroll);

    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [streamOutscroll]);
  
  useEffect(() => {
    console.log(selectedScoreTab)
    if (tabRef && tabRef.current) {
      tabRef.current.click();
    }
  }, [scoreTabList]);

  return (
    <React.Fragment>
      <div
        className={`${styles.inPlayBetPage} ${
          slideUpPage && styles.pageSlideUp
        } col-12 d-inline-flex flex-column`}
        ref={playWindow}
      >
        <div
          className={`${styles.allPlayDetail} position-relative d-inline-block`}
        >
          {streamUrl && scorecardUrl &&
          <div className={styles.scoreBoard+ " col-12 d-flex justify-content-center"}>
            {scoreTabList?.map((item,index) => {
              return(
                <div key={index} onClick={(e) => selectScoreTab(e,item)} ref={index === 0 ? tabRef : null}
                   className={`${styles.matchTitleHighlight} col-6 d-inline-flex align-items-center justify-content-center flex-shrink-0`}
                >
                  <label className={styles.scoreboardTitle}>
                    {item}
                  </label>
                </div>
              )
            })}
               <div
               className={`${styles.scoreActiveLine} d-inline-block position-absolute`}
                style={{ width: MarketLineWidth + "px", transform: "translateX(" + MarketPosLeft + "px)",}}
            ></div>
          </div> }
          { selectedScoreTab === 'Live' && streamUrl && 
          <MatchLiveCard
            liveWindow={liveWindow}
            streamUrl={streamUrl}
            streamOut={streamOut}
            setStreamOut={setStreamOut}
            setStreamOutScroll={setStreamOutScroll}
          /> }
           { ((selectedScoreTab === 'Scoreboard' && scorecardUrl) || !streamUrl) &&  
           <MatchScoreCard scoreUrl={scorecardUrl} />
          }
          <MatchOdds
            matchId={location?.state?.match_id}
            marketId={location?.state?.market_id}
            marketType={location?.state?.type}
            teamone={location?.state?.teamone}
            teamtwo={location?.state?.teamtwo}
            playWindow={playWindow}
          />
          <div
            className={`${styles.betCoverLayer} ${
              slideUpPage ? "d-inline-block" : "d-none"
            } position-absolute h-100`}
            onClick={closeBetPopup}
          ></div>
          <BetSlip />
          <HomeFooter />
        </div>
      </div>
    </React.Fragment>
  );
};

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
      console.log(playWindow.current.scrollTop);
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
          <MatchLiveCard
            liveWindow={liveWindow}
            streamUrl={streamUrl}
            streamOut={streamOut}
            setStreamOut={setStreamOut}
            setStreamOutScroll={setStreamOutScroll}
          />
          <MatchScoreCard scoreUrl={scorecardUrl} />
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

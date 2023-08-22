import React, { useEffect, useState } from "react";
import styles from "./InPlayGames.module.css";
import { useApp } from "../../../context/AppContextProvider";
import { MatchLiveCard } from "../../Layout/MatchLiveCard/MatchLiveCard";
import { MatchScoreCard } from "../../Layout/MatchScoreCard/MatchScoreCard";
import { MatchOdds } from "../../Layout/MatchOdds/MatchOdds";
import { HomeFooter } from "../../Layout/HomeFooter/HomeFooter";
import { useLocation } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { BetSlip } from "../../Layout/BetSlip/BetSlip";

export const InPlayGames = () => {
  const appData = useApp();
  const location = useLocation();
  const [streamUrl, setStreamUrl] = useState("");
  const [scorecardUrl, setScoreCardUrl] = useState("");
  const [slideUpPage, setSlideUpPage] = useState(false);

  const closeBetPopup = () => {
    appData.setAppData({
      ...appData.appData,
      appBetSlipOpen: false,
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

  return (
    <React.Fragment>
      <div
        className={`${styles.inPlayBetPage} ${
          slideUpPage && styles.pageSlideUp
        } col-12 d-inline-flex flex-column`}
      >
        <div
          className={`${styles.allPlayDetail} position-relative d-inline-block`}
        >
          <MatchLiveCard streamUrl={streamUrl} />
          <MatchScoreCard scoreUrl={scorecardUrl} />
          <MatchOdds
            matchId={location?.state?.match_id}
            marketId={location?.state?.market_id}
            marketType={location?.state?.type}
            teamone={location?.state?.teamone}
            teamtwo={location?.state?.teamtwo}
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

import React, { useEffect, useState } from "react";
import styles from "./InPlayGames.module.css";
import { MatchLiveCard } from "../../Layout/MatchLiveCard/MatchLiveCard";
import { MatchScoreCard } from "../../Layout/MatchScoreCard/MatchScoreCard";
import { MatchOdds } from "../../Layout/MatchOdds/MatchOdds";
import { HomeFooter } from "../../Layout/HomeFooter/HomeFooter";
import { useLocation } from "react-router-dom";
import ApiService from "../../../services/ApiService";
import { BetSlip } from "../../Layout/BetSlip/BetSlip";

export const InPlayGames = () => {
  const location = useLocation();
  const [streamUrl, setStreamUrl] = useState("");
  const [scorecardUrl, setScoreCardUrl] = useState("");

  useEffect(() => {
    if (location?.state?.match_id) {
      ApiService.getScoreCard(location?.state?.match_id).then((res) => {
        if (res?.streamingUrl) setStreamUrl(res.streamingUrl);
        if (res?.scoreUrl) setScoreCardUrl(res.scoreUrl);
      });
    }
  }, [location?.state?.match_id]);

  return (
    <React.Fragment>
      <div
        className={`${styles.inPlayBetPage} col-12 d-inline-flex flex-column`}
      >
        <MatchLiveCard streamUrl={streamUrl} />
        <MatchScoreCard scoreUrl={scorecardUrl} />
        <MatchOdds
          matchId={location?.state?.match_id}
          marketId={location?.state?.market_id}
          marketType={location?.state?.type}
        />
        <BetSlip />
        <HomeFooter />
      </div>
    </React.Fragment>
  );
};

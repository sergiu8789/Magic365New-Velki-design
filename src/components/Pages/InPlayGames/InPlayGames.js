import React from "react";
import styles from "./InPlayGames.module.css";
import { MatchScoreCard } from "../../Layout/MatchScoreCard/MatchScoreCard";
import { MatchOdds } from "../../Layout/MatchOdds/MatchOdds";
import { HomeFooter } from "../../Layout/HomeFooter/HomeFooter";
import { useLocation } from "react-router-dom";

export const InPlayGames = () => {
  const location = useLocation();
  return (
    <React.Fragment>
      <div
        className={`${styles.inPlayBetPage} col-12 d-inline-flex flex-column`}
      >
        <MatchScoreCard matchId={location?.state?.match_id}/>
        <MatchOdds matchId={location?.state?.match_id} marketId={location?.state?.market_id} marketType={location?.state?.type}/>
        <HomeFooter />
      </div>
    </React.Fragment>
  );
};

import React from "react";
import styles from "./InPlayGames.module.css";
import { MatchScoreCard } from "../../Layout/MatchScoreCard/MatchScoreCard";
import { MatchOdds } from "../../Layout/MatchOdds/MatchOdds";
import { HomeFooter } from "../../Layout/HomeFooter/HomeFooter";

export const InPlayGames = () => {
  return (
    <React.Fragment>
      <div
        className={`${styles.inPlayBetPage} col-12 d-inline-flex flex-column`}
      >
        <MatchScoreCard />
        <MatchOdds />
        <HomeFooter />
      </div>
    </React.Fragment>
  );
};

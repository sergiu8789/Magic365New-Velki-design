import React from "react";
import styles from "./FavourateGames.module.css";
import { NoData } from "../NoData/NoData";

export const FavourateGames = () => {
  return (
    <React.Fragment>
      <div
        className={`${styles.Favourats} overflow-y-auto position-fixed start-0 end-0 m-auto d-inline-flex flex-column`}
      >
        <NoData title="No Event" />
      </div>
    </React.Fragment>
  );
};

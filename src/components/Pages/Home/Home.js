import React from "react";
import { Banner } from "../../Layout/Banner/Banner";
import { News } from "../../Layout/News/News";
import { GamesCategory } from "../../Layout/GamesCategory/GamesCategory";
import { HomeGameCard } from "../../Layout/HomeGameCard/HomeGameCard";
import { HomeFooter } from "../../Layout/HomeFooter/HomeFooter";

export const Home = () => {
  return (
    <React.Fragment>
      <Banner />
      <News />
      <GamesCategory />
      <HomeGameCard />
      <HomeFooter />
    </React.Fragment>
  );
};

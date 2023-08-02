import React from "react";
import styles from "./GamesCategory.module.css";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

const gameCategoryHover = (event) => {
  let hoverX = event.clientX;
  let pageOffset = document.querySelector(".center-mobile-mode").offsetLeft;
  let navTabPos = hoverX - pageOffset + 20;
  if (navTabPos > 20 && navTabPos < 460) {
    document.getElementById("categoryTabIndicator").style.transform =
      "translateX(" + navTabPos + "px)";
  }
};

const gameCategoryOut = () => {
  let pageOffset = document.querySelector(
    ".home-game-category-row .swiper-slide-active"
  ).offsetLeft;
  document.getElementById("categoryTabIndicator").style.transform =
    "translateX(" + pageOffset + "px)";
};

export const GamesCategory = () => {
  return (
    <React.Fragment>
      <div
        className="home-game-category-row col-12 d-inline-block overflow-hidden"
        onMouseOver={(event) => gameCategoryHover(event)}
        onMouseLeave={(event) => gameCategoryOut(event)}
      >
        <Swiper
          modules={[Pagination]}
          spaceBetween={10}
          pagination={{ clickable: true }}
          slidesPerView={5}
        >
          <SwiperSlide>
            <div className="d-inline-flex flex-column align-items-center justify-content-center game-category-box">
              <span className="game-name">Sports</span>
              <span className="category-game-icon">
                <i className="icon-game-hall-sports"></i>
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-inline-flex flex-column align-items-center justify-content-center game-category-box">
              <span className="game-name">Live</span>
              <span className="category-game-icon">
                <i className="icon-game-hall-live "></i>
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-inline-flex flex-column align-items-center justify-content-center game-category-box">
              <span className="game-name">Table</span>
              <span className="category-game-icon">
                <i className="icon-game-hall-table"></i>
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-inline-flex flex-column align-items-center justify-content-center game-category-box">
              <span className="game-name">Slot</span>
              <span className="category-game-icon">
                <i className="icon-game-hall-slot"></i>
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-inline-flex flex-column align-items-center justify-content-center game-category-box">
              <span className="game-name">Fishing</span>
              <span className="category-game-icon">
                <i className="icon-game-hall-fishing"></i>
              </span>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-inline-flex flex-column align-items-center justify-content-center game-category-box">
              <span className="game-name">Egame</span>
              <span className="category-game-icon">
                <i className="icon-game-hall-egame"></i>
              </span>
            </div>
          </SwiperSlide>
          <div
            id="categoryTabIndicator"
            className={`${styles.categoryTabIndicator} d-inline-block position-absolute`}
          ></div>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

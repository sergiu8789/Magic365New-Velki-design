import React from "react";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from "../../../assets/images/baner-casino.png";
import banner2 from "../../../assets/images/banner-evo.png";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

export const Banner = () => {
  return (
    <React.Fragment>
      <div className="banner-contaner col-12 position-relative">
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={0}
          loop={true}
          navigation
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
        >
          <SwiperSlide>
            <img src={banner1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={banner2} />
          </SwiperSlide>
        </Swiper>
      </div>
    </React.Fragment>
  );
};

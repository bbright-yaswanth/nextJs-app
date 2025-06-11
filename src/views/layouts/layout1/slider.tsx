import { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Media, Row } from "reactstrap";
import { getAllBanners, BannerModel } from '../../../app/services/api.service';

// var settings = {
//   autoplay: true,
//   autoplaySpeed: 2500,
// };


interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

const SliderButtons: React.FC<{ buttons: ButtonProps[] }> = ({ buttons }) => {
  return buttons.map(({ id, link, text }) => (
    <a target="_blank" key={id} href={link}>
      <span>{text}</span>
    </a>
  ));
};




// Swiper components, modules and styles
import { Autoplay, Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Our custom button component
//import SliderButtons from "./SliderButtons";

interface Slide {
  id: number;
  title: string;
  tagline: string;
  image: string;
  buttons: ButtonProps[];
}

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

interface SliderProps {
  data: BannerModel[];
}

const SlideBanner: React.FC<SliderProps> = ({ data }) => {
  return (
    <section className="w-full section-py-space">
      <div className="custom-container rts-banner-area-one">

        <Swiper
          spaceBetween={1}
          slidesPerView={1}
          loop={true}
          speed={2000}
          autoplay={{
            delay: 4000,
          }}
          mousewheel={true}
          navigation={true}

          breakpoints={{
            0: { slidesPerView: 1, spaceBetween: 0 },
            320: { slidesPerView: 1, spaceBetween: 0 },
            480: { slidesPerView: 1, spaceBetween: 0 },
            640: { slidesPerView: 1, spaceBetween: 0 },
            840: { slidesPerView: 1, spaceBetween: 0 },
            1140: { slidesPerView: 1, spaceBetween: 0 },
          }}
          modules={[Autoplay, Navigation, Mousewheel, Keyboard]}
        >
          {data.map((item) => (
            <SwiperSlide>
             
                  <Media src={item.img[0]} className="bg-img  img-fluid" alt={item.name} />
              
             
              {/* <div
                className="h-full w-full absolute left-0 top-0 bannerCover"
                style={{
                  background: `url("${item.img[0]}") cover center / cover scroll no-repeat`
                }}
              ></div>
              <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div> */}
              {/* <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  {item.name && (
                    <p className="text-md sm:text-xl lg:text-3xl font-semibold ">
                      {item.name}
                    </p>
                  )}
                  <p className="text-3xl sm:text-6xl lg:text-8xl font-bold">
                    {item.name}
                  </p>
                  
                </div>
              </div> */}

            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

//export default Slider;
var banners: BannerModel[] = [];
const SliderBanner: NextPage = () => {
  useEffect(() => {
    getAllBanners('ikngosji').then((data) => {
      banners = data;
    });
  }, []);
  return (
    <>

      <SlideBanner data={banners}>
      </SlideBanner>

    </>
  );
};

export default SliderBanner;


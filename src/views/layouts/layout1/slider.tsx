import { NextPage } from "next";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Col, Media, Row } from "reactstrap";
import { getBanners, BannerModel } from '../../../app/services/api.service';

// var settings = {
//   autoplay: true,
//   autoplaySpeed: 2500,
// };

// interface slider {
//   img1: string;
//   img2: string;
//   title1: string;
//   title2: string;
//   subTitle1: string;
//   subTitle2: string;
//   btn: string;
//   category: string;
// }

// interface sliderProps {
//   banner: BannerModel;
// }

// var banners:BannerModel[] = [];

// const BannerList: React.FC<sliderProps> = ({ banner }) => {
//   const [elemOne, setElemOne] = useState({});
//   const onMouseHover = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     const pageX = e.clientX - window.innerWidth / 1;
//     const pageY = e.clientY - window.innerHeight / 1;
//     var elemOne = {
//       transform: "translateX(" + (7 + pageX / 150) + "%) translateY(" + (1 + pageY / 150) + "%)",
//     };
//     setElemOne(elemOne);
//   };

//   return (
//     <div className="slider-banner p-center slide-banner-1" onMouseMove={(e) => onMouseHover(e)}>

//       <div className="slider-img">

//         <ul>

//           <li id="img-2" className="slide-center" style={elemOne}>
//             <Media src={banner.img[0]} className="img-fluid" alt="slider" />
//           </li>

//         </ul>
//       </div>
//       <div className="slider-banner-contain">
//         <div>
//           <h1>
//             {banner.name}
//             <span>{banner.title}</span>
//           </h1>
//           <h4>{banner.name}</h4>
//           <h2>{banner.title}</h2>
//           <Link
//             className="btn btn-normal"
//             href={{
//               pathname: "/collections/leftsidebar/",
//               query: {
//                 category: banner.id,
//               },
//             }}
//           >
//             {banner.btn}
//           </Link>
//         </div>
//       </div>

//     </div>
//   );
// };

// const SliderBanner: NextPage = () => {
// useEffect(() => {
//     getBanners('ikngosji', 'bbb14cc0-c3f1-46f5-bebd-ec2a4cfe5bec').then((data) => {
//     banners = data; 
//   });
//   }, []);
//   return (
//     <>
//       <section className="theme-slider b-g-white " id="theme-slider">
//         <div className="custom-container">
//           <Row>
//             <Col>
//               <div className="slide-1 no-arrow">
//                 <Slider {...settings}>
//                   {banners.map((banner, i) => (
//                     <BannerList banner={banner} key={i} />
//                   ))}
//                 </Slider>
//               </div>
//             </Col>
//           </Row>
//         </div>
//       </section>
//     </>
//   );
// };

//export default SliderBanner;


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
           navigation= {true}
          
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
            <SwiperSlide key={item.id}>
              <div
                className="h-full w-full absolute left-0 top-0 bannerCover"
                style={{
                  background: `url("${item.img[0]}") center center / cover scroll no-repeat`
                }}
              > </div>
              <div className="h-full w-full absolute left-0 top-0 bg-black opacity-20"></div>
              <div className="relative z-10 h-full flex items-center justify-center">
                <div className="text-center">
                  {item.name && (
                    <p className="text-md sm:text-xl lg:text-3xl font-semibold ">
                      {item.name}
                    </p>
                  )}
                  <p className="text-3xl sm:text-6xl lg:text-8xl font-bold">
                    {item.name}
                  </p>
                  {/* {buttons && buttons.length > 0 ? ( */}
                  <p className=" bg-gray-800 inline-block px-9 py-2 rounded-full  mt-10 lg:mt-20">
                    <SliderButtons buttons={[]} />
                  </p>
                  {/* ) : null} */}
                </div>
              </div>

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
    getBanners('ikngosji', 'bbb14cc0-c3f1-46f5-bebd-ec2a4cfe5bec').then((data) => {
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


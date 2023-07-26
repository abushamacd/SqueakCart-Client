import React from "react";
import Slider from "react-slick";
import banner_1 from "../assets/banner/1.jpg";
import banner_2 from "../assets/banner/2.jpg";
import banner_3 from "../assets/banner/3.jpg";
import side_1 from "../assets/banner/side_1.png";
import side_2 from "../assets/banner/side_2.png";

const Banner = () => {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    autoplay: true,
    fade: true,
    // speed: 3000,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="hero_area layout md:px-[50px] p-[20px] md:py-[30px] flex md:flex-row flex-col md:gap-[30px] gap-[10px] md:h-[500px]">
      <div className="left_banner md:w-[70%] w-full">
        <Slider {...settings}>
          <div className="slider relative">
            <img
              className="w-full rounded-xl md:h-[440px] md:object-cover"
              src={banner_1}
              alt="banner"
            />
          </div>
          <div className="slider relative">
            <img
              className="w-full rounded-xl md:h-[440px] md:object-cover"
              src={banner_2}
              alt="banner"
            />
            <div className="silder_info h-full w-full rounded-xl absolute top-0 bottom-0 md:pt-[30%] pt-[10%] pl-[5%] ">
              <h4 className="capitalize text-sm leading-[24px] tracking-[.3px] mb-[6px] text-[#38b5fe] ">
                A trusted online shop
              </h4>
              <h4 className="capitalize text-3xl md:leading-[34px] leading-[35px] tracking-[.2px] font-medium text-white mb-4">
                All in one place
              </h4>
              <button
                type="submit"
                className="rounded-md px-5 py-1 text-sm text-black bg-[#38b5fe] uppercase"
              >
                Shop Now
              </button>
            </div>
          </div>
          <div className="slider relative">
            <img
              className="w-full rounded-xl md:h-[440px] md:object-cover"
              src={banner_3}
              alt="banner"
            />
          </div>
        </Slider>
      </div>
      <div className="right_banner md:gap-[30px] gap-[10px] md:w-[30%] w-full flex flex-col">
        <div className="side_banner w-full relative">
          <img
            className="w-full h-[200px] rounded-xl object-fill"
            src={side_1}
            alt="banner"
          />
        </div>
        <div className="side_banner w-full relative">
          <img
            className="w-full h-[200px] rounded-xl object-fill"
            src={side_2}
            alt="banner"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;

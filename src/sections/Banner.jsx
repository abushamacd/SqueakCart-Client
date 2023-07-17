import React from "react";
import Slider from "react-slick";

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
              className="w-full rounded-xl h-[440px] object-cover"
              src="/images/main-banner-1.jpg"
              alt="banner"
            />
            <div className="silder_info h-full w-full rounded-xl absolute top-0 bottom-0 pt-[10%] pl-[5%] ">
              <h4 className="banner_subtitle capitalize text-[16px] leading-[24px] tracking-[.3px] md:mb-[12px] mb-[6px] ">
                Subtitle
              </h4>
              <h4 className="capitalize text-[42px] md:leading-[54px] leading-[35px] tracking-[.2px] font-medium ">
                Title
              </h4>
              <p className="text-[18px] leading-[28px] tracking-[.4px]">
                Lorem ipsum dolor sit amet.
              </p>
              <button
                type="submit"
                className="first_button rounded-md px-5 py-1 text-sm text-white uppercase"
              >
                Save
              </button>
            </div>
          </div>
          <div className="slider relative">
            <img
              className="w-full rounded-xl h-[440px] object-cover"
              src="/images/main-banner-1.jpg"
              alt="banner"
            />
            <div className="silder_info h-full w-full rounded-xl absolute top-0 bottom-0 pt-[10%] pl-[5%] ">
              <h4 className="banner_subtitle capitalize text-[16px] leading-[24px] tracking-[.3px] md:mb-[12px] mb-[6px] ">
                Subtitle
              </h4>
              <h4 className="capitalize text-[42px] md:leading-[54px] leading-[35px] tracking-[.2px] font-medium ">
                Title
              </h4>
              <p className="text-[18px] leading-[28px] tracking-[.4px]">
                Lorem ipsum dolor sit amet.
              </p>
              <button
                type="submit"
                className="first_button rounded-md px-5 py-1 text-sm text-white uppercase"
              >
                Save
              </button>
            </div>
          </div>
          <div className="slider relative">
            <img
              className="w-full rounded-xl h-[440px] object-cover"
              src="/images/main-banner-1.jpg"
              alt="banner"
            />
            <div className="silder_info h-full w-full rounded-xl absolute top-0 bottom-0 pt-[10%] pl-[5%] ">
              <h4 className="banner_subtitle capitalize text-[16px] leading-[24px] tracking-[.3px] md:mb-[12px] mb-[6px] ">
                Subtitle
              </h4>
              <h4 className="capitalize text-[42px] md:leading-[54px] leading-[35px] tracking-[.2px] font-medium ">
                Title
              </h4>
              <p className="text-[18px] leading-[28px] tracking-[.4px]">
                Lorem ipsum dolor sit amet.
              </p>
              <button
                type="submit"
                className="first_button rounded-md px-5 py-1 text-sm text-white uppercase"
              >
                Save
              </button>
            </div>
          </div>
        </Slider>
      </div>
      <div className="right_banner md:gap-[30px] gap-[10px] md:w-[30%] w-full flex flex-col">
        {[1, 2].map((single) => (
          <div key={single} className="side_banner w-full relative">
            <img
              className="w-full h-[200px] rounded-xl object-cover"
              src="/images/catbanner-01.jpg"
              alt="banner"
            />
            <div className="silder_info h-[200px] w-full rounded-xl absolute top-0 bottom-0  pt-[5%] pl-[5%] ">
              <h4 className="banner_subtitle capitalize text-[14px] leading-[24px] tracking-[.3px] md:mb-[8px] ">
                Subtiele
              </h4>
              <h4 className="capitalize text-[22px] md:leading-[34px] leading-[30px] tracking-[.2px] font-medium ">
                Title
              </h4>
              <p className="hidden md:block text-[14px] leading-[22px] tracking-[.4px]">
                Lorem ipsum dolor sit amet.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Banner;

import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";

const FamousCollection = () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
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
    <section className="famous_collection_section py-[50px]">
      <Slider {...settings}>
        {numbers.map((product) => (
          <div key={product} className="famous_product md:w-1/4  py-[20px]">
            <Link to={"/"}>
              <div className="slider overflow-hidden box_shadow relative rounded-xl h-[400px]">
                <img
                  className="w-full duration-300 h-full bg-cover rounded-xl"
                  src="/images/main-banner-1.jpg"
                  alt="banner"
                />
                <div className="silder_info h-full w-full rounded-xl absolute top-0 bottom-0 pt-[10%] pl-[5%] ">
                  <h4 className=" capitalize text-sm leading-[24px] tracking-[.3px] text-[#fff] ">
                    Brands
                  </h4>
                  <h4 className="capitalize text-[28px] tracking-[.2px] font-bold text-[#fff] ">
                    Title
                  </h4>
                  <p className="text-[14px] leading-[28px] tracking-[.4px] text-[#fff] ">
                    Lorem ipsum dolor sit amet.
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default FamousCollection;

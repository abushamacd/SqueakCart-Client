import React from "react";
import Slider from "react-slick";

const Services = () => {
  var settings = {
    arrows: false,
    dots: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    slidesToShow: 5,
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
          // centerMode: true,
          // centerPadding: "60px",
        },
      },
    ],
  };
  return (
    <section className="service_sections md:pb-[40px] pb-[20px] md:pt-[20px] ">
      <div className="services flex-wrap justify-between items-center">
        <Slider {...settings}>
          <div className="">
            <div className="service flex justify-center items-center gap-[10px]">
              <img src="/images/service.png" alt="" className="" />
              <div className="service_info">
                <h6 className="capitalize setvice_title font-bold ">
                  Free Shipping
                </h6>
                <p className="service_details capitalize text-[14px]">
                  From all order over $5
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="service flex justify-center items-center gap-[10px]">
              <img src="/images/service-02.png" alt="" className="" />
              <div className="service_info">
                <h6 className="capitalize setvice_title font-bold ">
                  Daily Surprise offer
                </h6>
                <p className="service_details capitalize text-[14px]">
                  Save Upto 30%
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="service flex justify-center items-center gap-[10px]">
              <img src="/images/service-03.png" alt="" className="" />
              <div className="service_info">
                <h6 className="capitalize setvice_title font-bold ">
                  support 24/7
                </h6>
                <p className="service_details capitalize text-[14px]">
                  Shop with an expart
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="service flex justify-center items-center gap-[10px]">
              <img src="/images/service-04.png" alt="" className="" />
              <div className="service_info">
                <h6 className="capitalize setvice_title font-bold ">
                  Afordable Price
                </h6>
                <p className="service_details capitalize text-[14px]">
                  get factory default price
                </p>
              </div>
            </div>
          </div>
          <div className="">
            <div className="service flex justify-center items-center gap-[10px]">
              <img src="/images/service-05.png" alt="" className="" />
              <div className="service_info">
                <h6 className="capitalize setvice_title font-bold ">
                  Secure Payment
                </h6>
                <p className="service_details capitalize text-[14px]">
                  100% Protected paymet
                </p>
              </div>
            </div>
          </div>
        </Slider>
      </div>
    </section>
  );
};

export default Services;

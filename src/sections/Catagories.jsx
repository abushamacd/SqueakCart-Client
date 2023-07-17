import React from "react";
import Slider from "react-slick";

const Catagories = () => {
  const settings = {
    className: "center",
    arrows: false,
    infinite: true,
    slidesToShow: 2,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    slidesToScroll: 1,
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
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          rows: 2,
          slidesPerRow: 1,
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <section className="catagories bg-white rounded-xl p-[15px] box_shadow ">
      <Slider {...settings}>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map(
          (catarory) => (
            <div key={catarory}>
              <div className="catagory flex justify-between items-center gap-[10px] px-[15px] py-[10px] ">
                <div className="catagory_info">
                  <h6 className="catagory_title capitalize font-bold">
                    Catagory title
                  </h6>
                  <p className="catagory_desc text-sm">info</p>
                </div>
                <img
                  className="w-[100px] h-[100px] "
                  src="/images/camera.jpg"
                  alt="catagory"
                />
              </div>
            </div>
          )
        )}
      </Slider>
    </section>
  );
};

export default Catagories;

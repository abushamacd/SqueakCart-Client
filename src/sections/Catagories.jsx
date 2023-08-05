import React from "react";
import Slider from "react-slick";
import { useGetProCatsQuery } from "../redux/features/proCat/proCatApi";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQueryCat } from "../redux/features/product/productSlice";

const Catagories = () => {
  const dispatch = useDispatch();
  const { data: getData, isLoading: getIsLoading } = useGetProCatsQuery();
  const proCats = getData?.data?.data;

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

  if (getIsLoading) {
    return <Loading />;
  }
  return (
    <section className="catagories bg-white rounded-xl p-[15px] box_shadow ">
      <Slider {...settings}>
        {proCats?.map((catarory) => (
          <div key={catarory?._id}>
            <Link
              onClick={() => dispatch(setQueryCat(catarory?._id))}
              to={`/products`}
            >
              <div className="catagory flex justify-between items-center gap-[10px] px-[15px] py-[10px] ">
                <div className="catagory_info">
                  <h4 className="catagory_title capitalize text-lg font-bold">
                    {catarory?.title}
                  </h4>
                </div>
                <img
                  className="w-[120px] h-[120px] "
                  src={catarory?.images[0]?.url}
                  alt="catagory"
                />
              </div>
            </Link>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default Catagories;

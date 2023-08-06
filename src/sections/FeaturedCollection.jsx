import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import QuickView from "../components/QuickView";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";

const FeaturedCollection = () => {
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery({ data: `` });
  const products = productData?.data?.data;
  const featuredProducts = products?.filter((product) =>
    product?.tag?.includes("featured")
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
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
        },
      },
    ],
  };

  if (productIsLoading) {
    return <Loading />;
  }

  return (
    <section className="featured_collection_section rounded-xl section_gap">
      <div className="section_heading">
        <h4 className="section_title">Featured Collections</h4>
      </div>
      <Slider {...settings}>
        {featuredProducts?.map((product) => (
          <div
            key={product?._id}
            className="product min-h-[380px] md:w-1/5 relative"
          >
            <div className="product_inner bg-white rounded-xl box_shadow min-h-[340px] my-[20px] p-4">
              {product?.status === "unavailable" && (
                <div className="product_tag duration-300 badge badge-warning absolute top-[7%] left-[2%] capitalize font-medium text-xs">
                  <p className="">Out of stock</p>
                </div>
              )}
              <button className="wishlist absolute right-[2%]  top-[7%] ">
                <img
                  className=" bg-white h-[25px] duration-300 w-[25px] rounded-full p-[5px] "
                  src="/images/wish.svg"
                  alt=""
                />
              </button>
              <div className="action_bar absolute top-[14%] flex flex-col gap-[5px]">
                <label htmlFor="my-modal-5">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/view.svg"
                    alt=""
                  />
                </label>
              </div>
              <Link to={`/products/${product?._id}`}>
                <div className="product_image h-[200px] flex justify-center items-center overflow-hidden rounded-xl">
                  <img
                    className="rounded-xl bg-center  "
                    src={product?.images[0]?.url}
                    alt="product"
                  />
                </div>
                <div className="product_info">
                  <h6 className="product_brand uppercase my-[12px] text-sm font-medium">
                    {product?.brand?.title}
                  </h6>
                  <h2 className="product_title capitalize font-medium text-[15px] leading-[22px] tracking-[.3px] min-h-[50px]">
                    {product?.title}
                  </h2>
                  <div className="flex justify-between items-center">
                    <ReactStars
                      count={5}
                      className="my-[10px]"
                      size={20}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p className="product_price product_brand">
                      $ <span className="font-bold">{product?.price}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
      <QuickView />
    </section>
  );
};

export default FeaturedCollection;

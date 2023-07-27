import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";

const PopularCollection = () => {
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery();
  const products = productData?.data?.data;

  if (productIsLoading || !Array.isArray(products)) {
    return <Loading />;
  }

  const popularProducts = [...products]?.sort((a, b) => b.view - a.view);

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
  return (
    <section className="featured_collection_section rounded-xl section_gap">
      <div className="section_heading">
        <h4 className="section_title">Popular Collections</h4>
      </div>
      <Slider {...settings}>
        {popularProducts?.map((product) => (
          <div
            key={product._id}
            className="product min-h-[380px] md:w-1/5 relative"
          >
            <div className="product_inner bg-white rounded-xl box_shadow min-h-[340px] my-[20px] p-4">
              {/* <div className="product_tag duration-300 badge badge-warning absolute top-[7%] left-[2%] capitalize font-medium text-xs">
                tag
              </div> */}
              <div className="wishlist absolute md:right-[2%] right-[2%] top-[7%] ">
                <img
                  className=" bg-white h-[25px] duration-300 w-[25px] rounded-full p-[5px] "
                  src="/images/wish.svg"
                  alt=""
                />
              </div>
              <div className="action_bar absolute top-[16%] flex flex-col gap-[5px]">
                <Link to="/">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/prodcompare.svg"
                    alt=""
                  />
                </Link>
                <Link to="/">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/view.svg"
                    alt=""
                  />
                </Link>
                <Link to="/">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/add-cart.svg"
                    alt=""
                  />
                </Link>
              </div>
              <Link to="/product/:id">
                <div className="product_image h-[200px] flex justify-center items-center overflow-hidden rounded-xl">
                  <img
                    className="rounded-xl bg-center  "
                    src={product?.images[0]?.url}
                    alt="product"
                  />
                </div>
              </Link>
              <div className="product_info">
                <h6 className="product_brand uppercase my-[12px] text-sm font-medium">
                  {product?.brand?.title}
                </h6>
                <Link to="/product/:id">
                  <h2 className="product_title capitalize font-medium text-[15px] leading-[22px] tracking-[.3px] min-h-[50px]">
                    {product?.title}
                  </h2>
                </Link>
                <div className="flex justify-between items-center">
                  <ReactStars
                    count={5}
                    className="my-[10px]"
                    size={20}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="product_price">
                    $ <span className="font-bold">{product?.price}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PopularCollection;

import React from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";

const FamousCollection = () => {
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery({ data: `` });
  const products = productData?.data?.data;
  const famousProducts = products?.filter((product) =>
    product?.tag?.includes("Famous")
  );

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    arrows: false,
    autoPlay: true,
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

  if (productIsLoading) {
    return <Loading />;
  }
  return (
    <section className="famous_collection_section py-[50px]">
      <Slider {...settings}>
        {famousProducts?.map((product) => (
          <div
            key={product?._id}
            className="famous_product md:w-1/4  py-[20px]"
          >
            <Link to={`/products/${product?._id}`}>
              <div className="slider overflow-hidden box_shadow relative rounded-xl h-[400px]">
                <img
                  className="w-full duration-300 h-full object-cover rounded-xl"
                  src={product?.images[0]?.url}
                  alt="banner"
                />
                <div className="h-full w-full rounded-xl absolute top-0 bottom-0 pt-[10%] pl-[5%] ">
                  <h4 className=" capitalize text-sm leading-[24px] tracking-[.3px] text-[#000] ">
                    {product?.brand?.title}
                  </h4>
                  <h4 className="capitalize text-[24px] tracking-[.2px] font-bold text-[#000] ">
                    {product?.title.length > 18
                      ? product?.title.slice(0, 18) + "..."
                      : product?.title}
                  </h4>
                  <p className="product_price text-[#000]">
                    $ <span className="font-bold">{product?.price}</span>{" "}
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

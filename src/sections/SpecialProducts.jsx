import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import Loading from "../components/Loading";
import { useGetProductsQuery } from "../redux/features/product/productApi";

const SpecialProducts = () => {
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery();
  const products = productData?.data?.data;
  const specialProducts = products?.filter((product) =>
    product?.tag?.includes("special")
  );

  var image_settings = {
    arrows: true,
  };
  var product_settings = {
    className: "center",
    infinite: true,
    slidesToShow: 1,
    speed: 500,
    rows: 2,
    slidesPerRow: 2,
    draggable: false,
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
          rows: 1,
          slidesPerRow: 1,
          slidesToShow: 1,
        },
      },
    ],
  };

  if (productIsLoading) {
    return <Loading />;
  }
  return (
    <section className="special_products_section section_gap">
      <div className="section_heading">
        <h4 className="section_title">Special Products</h4>
      </div>
      <Slider {...product_settings}>
        {specialProducts?.map((product) => (
          <div key={product._id} className="py-[10px] ">
            <div className="special_product md:pr-[20px] md:px-0 px-[10px] ">
              <div className="special_product_inner rounded-xl bg-white box_shadow flex md:flex-row flex-col gap-[20px] p-[20px]">
                <div className="product_photo md:w-1/2 relative">
                  <Slider {...image_settings}>
                    {product?.images?.map((image) => (
                      <div key={image._id} className="">
                        <div className="product_image h-[300px] flex justify-center items-center overflow-hidden rounded-xl">
                          <img
                            className="rounded-xl bg-center  "
                            src={image?.url}
                            alt="product"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div className="wishlist absolute md:right-[-3%] right-[-2%] top-[3%] ">
                    <img
                      className=" bg-white h-[25px] duration-300 w-[25px] rounded-full p-[5px] "
                      src="/images/wish.svg"
                      alt=""
                    />
                  </div>
                  <div className="action_bar absolute top-[11%] flex flex-col gap-[5px]">
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
                </div>
                <div className="product_info md:w-1/2">
                  <h6 className="product_brand uppercase my-[12px] text-sm font-medium">
                    {product?.brand?.title}
                  </h6>
                  <Link to="/">
                    <h2 className="product_title capitalize font-medium text-[15px] leading-[22px] tracking-[.3px] min-h-[50px] ">
                      {product?.title}
                    </h2>
                  </Link>
                  <div className="md:flex  justify-between items-center my-[10px]">
                    <ReactStars
                      count={5}
                      className=""
                      size={20}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <div className="flex">
                      <p className="offer_price">
                        $
                        <span>
                          <del>
                            {product?.price +
                              parseInt(((130 / 100) * 15).toFixed(2))}
                          </del>
                        </span>
                      </p>
                      <p className="product_price ml-1">
                        $ <span className="font-bold">{product?.price}</span>
                      </p>
                    </div>
                  </div>
                  <div className="stock">
                    <h4 className="stock_item text-sm">
                      Items in stock: {product?.quantity}
                    </h4>
                    <progress
                      className="progress progress-primary w-full"
                      value="10"
                      max="100"
                    ></progress>
                  </div>
                  <button className="btn btn-sm product_option rounded-full mt-[20px] ">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default SpecialProducts;

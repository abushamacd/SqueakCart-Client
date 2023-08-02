import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";

const StoreProducts = () => {
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery();
  const products = productData?.data?.data;

  if (productIsLoading) {
    <Loading />;
  }

  return (
    <div className="flex flex-wrap md:gap-[1%] gap-[2%]">
      {products?.map((product) => (
        <div
          key={product?._id}
          className="product min-h-[380px] md:w-[19%] w-[48%] relative"
        >
          <div className="product_inner bg-white rounded-xl box_shadow min-h-[340px] my-[20px] p-4">
            <div className="wishlist absolute right-[2%]  top-[7%] ">
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
                <h2
                  title={product?.title}
                  className="product_title capitalize font-medium text-[15px] leading-[22px] tracking-[.3px] min-h-[50px]"
                >
                  {product?.title.length > 30
                    ? product?.title.slice(0, 30) + "..."
                    : product?.title}
                </h2>

                <div className="md:flex justify-between items-center">
                  <ReactStars
                    count={5}
                    className="my-[10px]"
                    size={20}
                    value={3}
                    edit={false}
                    activeColor="#ffd700"
                  />
                  <p className="product_price product_brand">
                    $ <span className="font-bold">{product?.price}</span>{" "}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StoreProducts;

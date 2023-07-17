import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";

const Wishlist = () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Head title="Wish List ||" />
      <div className="body_wrapper p-[20px]">
        <BreadCrumb title="Wish List" />
        <div className="wishlist_products layout">
          <div className="flex flex-wrap md:gap-[1%] gap-[2%]">
            {numbers.map((product) => (
              <div
                key={product}
                className="product min-h-[380px] md:w-[19%] w-[48%] relative"
              >
                <img
                  className="absolute cursor-pointer duration-300 cross h-[15px] w-[15px] right-[10px] top-[30px] "
                  src="images/cross.svg"
                  alt=""
                />
                <div className="product_inner bg-white rounded-xl box_shadow min-h-[300px] my-[20px] p-4">
                  <Link to="/">
                    <div className="product_image h-[200px] flex justify-center items-center overflow-hidden rounded-xl">
                      <img
                        className="rounded-xl bg-center  "
                        src="images/watch.jpg"
                        alt="product"
                      />
                    </div>
                  </Link>
                  <div className="product_info  text-sm ">
                    <h2 className="product_name font-bold">
                      Lorem, ipsum dolor sit amet consectetur adipisicing
                    </h2>
                    <p className="product_price font-bold my-2">
                      $ <span>10.45</span>{" "}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Wishlist;

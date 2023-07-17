import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";

const CompareProducts = () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Head title="Compare Products ||" />
      <div className="body_wrapper p-[20px]">
        <BreadCrumb title="Compare Products" />
        <div className="compare_products layout ">
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
                <div className="product_inner bg-white rounded-xl box_shadow min-h-[340px] my-[20px] p-4">
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
                      Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                      Impedit, atque!
                    </h2>
                    <p className="product_price font-bold my-2">
                      $ <span>10.45</span>{" "}
                    </p>
                    <ul className="info_list">
                      <li className="flex justify-between border-t py-[5px] ">
                        <span className="font-bold capitalize">test:</span>
                        <span className="info_right capitalize">test</span>
                      </li>
                      <li className="flex justify-between border-t py-[5px] ">
                        <span className="font-bold capitalize">test:</span>
                        <span className="info_right capitalize">test</span>
                      </li>
                    </ul>
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

export default CompareProducts;

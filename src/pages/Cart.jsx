import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";

const Cart = () => {
  return (
    <>
      <Head title="Cart ||" />
      <BreadCrumb title="Cart" />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="container mx-auto mt-10">
            <div className="flex md:flex-row flex-col my-10">
              <div className="md:w-3/4 bg-white px-10 py-10 rounded-lg box_shadow">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">3 Items</h2>
                </div>
                <div className="flex mb-5 border-b py-4">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase md:w-2/5">
                    Product Details
                  </h3>
                  <h3 className="hidden md:block font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="hidden md:block font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Price
                  </h3>
                  <h3 className="hidden md:block font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                    Total
                  </h3>
                </div>
                {/* Single product */}
                <div className="flex md:flex-row flex-col gap-4 items-center rounded-lg hover:bg-gray-100 md:px-6 px-2 py-5 pb-4 border-b">
                  <div className="flex md:w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">Iphone 6S</span>
                      <span className="text-red-500 text-xs">Apple</span>
                      <Link
                        to=""
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-row h-8 md:w-1/5 rounded-lg relative bg-transparent mt-1">
                    <button className=" border text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="text-center border w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value="0"
                      readOnly
                    ></input>
                    <button className="border text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                  <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                    <p className="block md:hidden">Price :</p>
                    <p>$400.00</p>
                  </div>
                  <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                    <p className="block md:hidden">Total :</p>
                    <p>$400.00</p>
                  </div>
                </div>
                {/* Single product */}
                <div className="flex md:flex-row flex-col gap-4 items-center rounded-lg hover:bg-gray-100 md:px-6 px-2 py-5 pb-4 border-b">
                  <div className="flex md:w-2/5">
                    <div className="w-20">
                      <img
                        className="h-24"
                        src="https://drive.google.com/uc?id=18KkAVkGFvaGNqPy2DIvTqmUH_nk39o3z"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col justify-between ml-4 flex-grow">
                      <span className="font-bold text-sm">Iphone 6S</span>
                      <span className="text-red-500 text-xs">Apple</span>
                      <Link
                        to=""
                        className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                      >
                        Remove
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-row h-8 md:w-1/5 rounded-lg relative bg-transparent mt-1">
                    <button className=" border text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none">
                      <span className="m-auto text-2xl font-thin">−</span>
                    </button>
                    <input
                      type="number"
                      className="text-center border w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                      name="custom-input-number"
                      value="0"
                      readOnly
                    ></input>
                    <button className="border text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer">
                      <span className="m-auto text-2xl font-thin">+</span>
                    </button>
                  </div>
                  <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                    <p className="block md:hidden">Price :</p>
                    <p>$400.00</p>
                  </div>
                  <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                    <p className="block md:hidden">Total :</p>
                    <p>$400.00</p>
                  </div>
                </div>
                <Link
                  to={`${window.location.origin}/product`}
                  className="flex items-center gap-2 font-semibold text-indigo-600 text-sm mt-10"
                >
                  <BsArrowLeft />
                  Continue Shopping
                </Link>
              </div>

              <div id="summary" className="md:w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm uppercase">
                    Items 3
                  </span>
                  <span className="font-semibold text-sm">590$</span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm rounded-md">
                    <option>Standard shipping - $10.00</option>
                  </select>
                </div>
                <div className="py-10">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm w-full input_bg_white rounded-md"
                  />
                </div>
                <button className="first_button rounded-full px-5 py-2 text-sm text-white uppercase">
                  Apply
                </button>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>$600</span>
                  </div>
                  <Link to={`${window.location.origin}/checkout`}>
                    <button className="first_button rounded-full font-semibold py-3 text-sm text-white uppercase w-full">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

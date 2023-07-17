import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleLeft,
  FaShoppingCart,
} from "react-icons/fa";

const Checkout = () => {
  const [openDetails, setOpenDetails] = useState(true);
  return (
    <>
      <Head title="Checkout ||" />
      <BreadCrumb title="Checkout" />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="information">
            <div className="flex md:flex-row flex-col-reverse justify-center">
              <div className="md:w-7/12 bg-[#fff] rounded-lg box_shadow md:pl-[100px] md:pr-[50px] md:py-[30px] px-[15px] py-[15px] ">
                <div className="text-sm breadcrumbs">
                  <ul>
                    <li>
                      <Link to="/">Information</Link>
                    </li>
                    <li>
                      <Link to="/">Shipping</Link>
                    </li>
                    <li>Payment</li>
                  </ul>
                </div>
                <form action="" className="shipping_form ">
                  <div className="md:flex justify-between items-end">
                    <h3 className=" font-bold text-[18px]">
                      Contact information
                    </h3>
                    <p className="flex  text-[14px] gap-[5px] md:mt-0 mt-[10px]">
                      <span className="text-gray-500">
                        Already have an account?
                      </span>
                      <Link to="/">Log in</Link>
                    </p>
                  </div>
                  <input
                    placeholder="Email"
                    className="w-full input-sm py-[8px] px-2 text-[14px] mt-[25px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                    required
                    type="email"
                    name="email"
                    id="email"
                  />
                  <div className="flex justify-start items-center">
                    <label className="ml-[10px] text-[14px] order-2">
                      Email me with news and offers
                    </label>
                    <input
                      name=""
                      className="rounded-[3px] border-[2px] border-gray-200 order-1"
                      id=""
                      type="checkbox"
                      value="false"
                    />
                  </div>
                  <h3 className=" font-bold text-[18px]  mb-[25px] mt-[30px]">
                    Shipping address
                  </h3>
                  <input
                    placeholder="Country"
                    className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                    required
                    type="text"
                    name="country"
                    id="country"
                  />
                  <div className="flex gap-[10px]">
                    <div className="md:w-1/2">
                      <input
                        placeholder="First Name (optional) "
                        className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                        type="text"
                        name="fName"
                        id="fName"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <input
                        placeholder="Last Name"
                        className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                        required
                        type="text"
                        name="lName"
                        id="lName"
                      />
                    </div>
                  </div>
                  <input
                    placeholder="Company (optional)"
                    className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                    type="text"
                    name="company"
                    id="company"
                  />
                  <input
                    placeholder="Address"
                    className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                    required
                    type="text"
                    name="address"
                    id="address"
                  />
                  <input
                    placeholder="Apartment,Suit, etc (optional)"
                    className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                    type="text"
                    name="apartment"
                    id="apartment"
                  />
                  <div className="flex gap-[10px]">
                    <div className="md:w-1/2">
                      <input
                        placeholder="City"
                        className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                        required
                        type="text"
                        name="city"
                        id="city"
                      />
                    </div>
                    <div className="md:w-1/2">
                      <input
                        placeholder="Post Code"
                        className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                        required
                        type="text"
                        name="pcode"
                        id="pcode"
                      />
                    </div>
                  </div>
                  <input
                    placeholder="Phone"
                    className="w-full input-sm py-[8px] px-2 text-[14px] mb-[10px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                    required
                    type="text"
                    name="phone"
                    id="phone"
                  />
                  <div className="flex justify-start items-center">
                    <label className="ml-[10px] text-[14px] order-2">
                      Text me with news and offers
                    </label>
                    <input
                      name=""
                      className="rounded-[3px] border-[2px] border-gray-200 order-1"
                      id=""
                      type="checkbox"
                      value="false"
                    />
                  </div>
                  <div className="flex md:flex-row flex-col-reverse justify-between items-center">
                    <Link to="" className="">
                      <p className="text-[14px] flex items-center gap-1">
                        <FaAngleLeft />
                        Return to Cart
                      </p>
                    </Link>
                    <button
                      type="submit"
                      className="first_button w-full rounded-full md:w-2/6  py-[8px] px-[20px] text-[14px] text-[#fff] bg-[#000] mt-[20px]  mb-[20px]   "
                    >
                      Continue to Shipping
                    </button>
                  </div>
                </form>
                <hr className="md:mt-[30px] mt-[20px]" />
              </div>
              <div className="md:w-5/12 md:block md:pr-[100px] md:pl-[50px] md:py-[30px]">
                <div className="summary_button md:hidden flex justify-between py-[30px]">
                  <div className="flex items-center gap-1 text-[16px]">
                    <FaShoppingCart />
                    {!openDetails ? (
                      <div
                        onClick={() => setOpenDetails(!openDetails)}
                        className="show_order flex items-center gap-1"
                      >
                        <span className="capitalize px-1">
                          Show order summary
                        </span>
                        <FaAngleDown />
                      </div>
                    ) : (
                      <div
                        onClick={() => setOpenDetails(!openDetails)}
                        className="hide_order flex items-center gap-1 "
                      >
                        <span className="capitalize px-1">
                          Hide order summary
                        </span>
                        <FaAngleUp />
                      </div>
                    )}
                  </div>
                  <h5 className=" text-[20px] font-bold">
                    $<span className="amount">345.23</span>
                  </h5>
                </div>
                {openDetails && (
                  <div className="order_details ">
                    <div className="products max-h-[300px] overflow-auto">
                      <div className="product my-[12px] flex items-center md:gap-[15px]">
                        <div className="relative w-1/6 md:mr-0 mr-[10px]">
                          <img
                            src="./assets/images/banner/81234.jpg"
                            alt=""
                            className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                          />
                          <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                            1
                          </span>
                        </div>
                        <div className="product_info mr-[10px]  w-4/6">
                          <h2 className="product_name  font-bold text-[14px]">
                            Sportv Cable - 2.0m | USB C | Lightning
                          </h2>
                          <p className="variant  text-gray-500 text-[12px]">
                            2.0M / Lightning
                          </p>
                        </div>
                        <p className="price  font-bold text-[14px]  w-1/6">
                          $ <span className="amount">24.95</span>
                        </p>
                      </div>
                      <div className="product my-[12px] flex items-center md:gap-[15px]">
                        <div className="relative w-1/6 md:mr-0 mr-[10px]">
                          <img
                            src="./assets/images/banner/81234.jpg"
                            alt=""
                            className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                          />
                          <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                            1
                          </span>
                        </div>
                        <div className="product_info mr-[10px]  w-4/6">
                          <h2 className="product_name  font-bold text-[14px]">
                            Sportv Cable - 2.0m | USB C | Lightning
                          </h2>
                          <p className="variant  text-gray-500 text-[12px]">
                            2.0M / Lightning
                          </p>
                        </div>
                        <p className="price  font-bold text-[14px]  w-1/6">
                          $ <span className="amount">24.95</span>
                        </p>
                      </div>
                      <div className="product my-[12px] flex items-center md:gap-[15px]">
                        <div className="relative w-1/6 md:mr-0 mr-[10px]">
                          <img
                            src="./assets/images/banner/81234.jpg"
                            alt=""
                            className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                          />
                          <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                            1
                          </span>
                        </div>
                        <div className="product_info mr-[10px]  w-4/6">
                          <h2 className="product_name  font-bold text-[14px]">
                            Sportv Cable - 2.0m | USB C | Lightning
                          </h2>
                          <p className="variant  text-gray-500 text-[12px]">
                            2.0M / Lightning
                          </p>
                        </div>
                        <p className="price  font-bold text-[14px]  w-1/6">
                          $ <span className="amount">24.95</span>
                        </p>
                      </div>
                      <div className="product my-[12px] flex items-center md:gap-[15px]">
                        <div className="relative w-1/6 md:mr-0 mr-[10px]">
                          <img
                            src="./assets/images/banner/81234.jpg"
                            alt=""
                            className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                          />
                          <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                            1
                          </span>
                        </div>
                        <div className="product_info mr-[10px]  w-4/6">
                          <h2 className="product_name  font-bold text-[14px]">
                            Sportv Cable - 2.0m | USB C | Lightning
                          </h2>
                          <p className="variant  text-gray-500 text-[12px]">
                            2.0M / Lightning
                          </p>
                        </div>
                        <p className="price  font-bold text-[14px]  w-1/6">
                          $ <span className="amount">24.95</span>
                        </p>
                      </div>
                    </div>
                    <div className="cupon border-t-[1px] border-b-[1px] border-[#C2C2C2] py-[20px]">
                      <form action="" className="newsletter flex gap-[10px]">
                        <input
                          placeholder="Gift card or discount code"
                          className="w-full input-sm py-[8px] px-2 text-[14px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                          type="text"
                          name="company"
                          id="company"
                        />
                        <button
                          type="submit"
                          className="first_button rounded px-[20px] text-[12px] text-[#fff] bg-[#000]"
                        >
                          Apply
                        </button>
                      </form>
                    </div>
                    <div className="caculation border-b-[1px] border-[#C2C2C2] py-[20px]">
                      <div className="flex justify-between items-center mb-[5px]">
                        <h5 className=" text-[14px] text-[#6d6d6d]">
                          Subtotal
                        </h5>
                        <h5 className=" text-[14px] font-bold ">
                          $<span className="amount">345.23</span>
                        </h5>
                      </div>
                      <div className="flex justify-between items-center mb-[5px]">
                        <h5 className=" text-[14px] text-[#6d6d6d]">
                          Shipping
                        </h5>
                        <h5 className=" text-[12px] font-bold text-[#6d6d6d] ">
                          Calculated at next step
                        </h5>
                      </div>
                    </div>
                    <div className="flex justify-between items-center my-[20px]">
                      <h5 className=" text-[14px] ">Total</h5>
                      <h5 className=" text-[20px] font-bold ">
                        $<span className="amount">345.23</span>
                      </h5>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

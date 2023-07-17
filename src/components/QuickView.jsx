import React from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useState } from "react";
import {
  FaAngleDown,
  FaClipboardCheck,
  FaRegClipboard,
  FaShippingFast,
} from "react-icons/fa";
import { GiExplosiveMaterials, GiSelfLove, GiShare } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";

const QuickView = () => {
  const [copied, setCopied] = useState(false);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const numbers = [1, 2, 3, 4, 5, 6];
  const navigator = useNavigate();

  var image_settings = {
    arrows: false,
  };
  const copyToClipboard = (text) => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };
  return (
    <div className="quick_view">
      <input type="checkbox" id="my-modal-5" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl bg-gray-100">
          <label
            htmlFor="my-modal-5"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="product_details quick_view">
            <section className="overflow-hidden bg-white p-[20px] rounded-lg box_shadow ">
              <div className="mx-auto">
                <div className="lg:w-full mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full lg:h-auto h-64">
                    <Slider
                      {...image_settings}
                      asNavFor={nav2}
                      ref={(slider1) => setNav1(slider1)}
                    >
                      {numbers.map((image, index) => (
                        <div key={index} className="">
                          <div className="product_image  flex justify-center items-center overflow-hidden object-cover object-center border rounded-lg ">
                            <img
                              className="rounded-xl bg-center  "
                              src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                              alt="product"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                    <Slider
                      className="mt-[20px]"
                      asNavFor={nav1}
                      ref={(slider2) => setNav2(slider2)}
                      slidesToShow={4}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {numbers.map((image, index) => (
                        <div key={index} className="p-[10px]">
                          <img
                            className="rounded-xl border"
                            src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8&w=1000&q=80"
                            alt=""
                          />
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <p className="text-sm text-gray-500 uppercase">
                      BRAND NAME
                    </p>
                    <h2 className="text-gray-900 text-3xl  font-medium mb-1">
                      The Catcher in the Rye
                    </h2>
                    <h1 className=" font-medium text-2xl text-gray-900">
                      $ 58.00
                    </h1>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center">
                        <ReactStars
                          count={5}
                          className="my-[10px]"
                          size={20}
                          value={3}
                          edit={false}
                          activeColor="#ffd700"
                        />
                        <span className="text-gray-600 ml-3 text-sm">
                          (4 Reviews)
                        </span>
                      </span>
                    </div>
                    <div className="flex md:flex-row flex-col flex-wrap gap-6 border-t-2 pt-4 md:items-center md:justify-between pb-5 border-b-2 border-gray-100 mb-5">
                      <div className="flex">
                        <span className="mr-3">Color</span>
                        <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                        <button className="border-2 border-gray-300 ml-1 bg-indigo-500 rounded-full w-6 h-6 focus:outline-none"></button>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-3">Size</span>
                        <div className="relative">
                          <select className="rounded border appearance-none border-gray-300 py-2 pl-3 pr-10">
                            <option>SM</option>
                            <option>M</option>
                            <option>L</option>
                            <option>XL</option>
                          </select>
                          <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                            <FaAngleDown />
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="mr-3">Quantity</span>
                        <div className="relative">
                          <div className="flex flex-row h-10 w-[140px] rounded-lg relative bg-transparent mt-1">
                            <button className=" border text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-l cursor-pointer outline-none">
                              <span className="m-auto text-2xl font-thin">
                                −
                              </span>
                            </button>
                            <input
                              type="number"
                              className="text-center border w-full bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700  outline-none"
                              name="custom-input-number"
                              value="0"
                              readOnly
                            ></input>
                            <button className="border text-gray-600 hover:text-gray-700 hover:bg-gray-200 h-full w-20 rounded-r cursor-pointer">
                              <span className="m-auto text-2xl font-thin">
                                +
                              </span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col justify-between md:items-center mt-[20px] gap-4">
                      <div className="flex gap-[20px]">
                        <button className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium ">
                          Add to Cart
                        </button>
                        <button>
                          <p className="second_button cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium ">
                            Buy Now
                          </p>
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <div className="wishlist cursor-pointer flex justify-center items-center gap-1">
                          <img
                            className=" bg-white h-[25px] duration-300 w-[25px] rounded-full p-[5px] "
                            src="/images/wish.svg"
                            alt=""
                          />
                          <p className="text-sm md:hidden block">
                            Add to wishlist
                          </p>
                        </div>
                        <div className="wishlist cursor-pointer flex justify-center items-center gap-1">
                          <img
                            className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                            src="/images/prodcompare.svg"
                            alt=""
                          />
                          <p className="text-sm md:hidden block">
                            Add to compare
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="accordion_section mt-[30px]">
                      <Accordion className="border-0">
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <span className="flex gap-2 items-center">
                                <FaShippingFast /> Shipping & Returns
                              </span>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="py-2 px-4">
                            <p>
                              Free shipping and returns available on all orders!
                              <br />
                              We ship all US domestic orders within
                              <strong> 5-10 business days!</strong>
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <span className="flex gap-2 items-center">
                                <GiExplosiveMaterials /> Materials
                              </span>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="py-2 px-4">
                            <p>
                              Running Shoes cushions your stride with soft foam
                              to keep you running in comfort. Lightweight knit
                              material wraps your foot in breathable support,
                              while a minimalist design fits in just about
                              anywhere your day takes you.
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <span className="flex gap-2 items-center">
                                <RxDimensions /> Dimensions
                              </span>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="py-2 px-4">
                            <p>
                              Running Shoes cushions your stride with soft foam
                              to keep you running in comfort. Lightweight knit
                              material wraps your foot in breathable support,
                              while a minimalist design fits in just about
                              anywhere your day takes you.
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <span className="flex gap-2 items-center">
                                <GiSelfLove /> Care Instructions
                              </span>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="py-2 px-4">
                            <p>
                              Use a soft damp cloth and a drop of mild soap to
                              remove any haze. Air dry.
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                        <AccordionItem>
                          <AccordionItemHeading>
                            <AccordionItemButton>
                              <span className="flex gap-2 items-center">
                                <GiShare /> Share
                              </span>
                            </AccordionItemButton>
                          </AccordionItemHeading>
                          <AccordionItemPanel className="py-2 px-4 relative">
                            <p className="">
                              {window.location.href}
                              {copied ? (
                                <FaClipboardCheck
                                  size="20px"
                                  className="absolute right-[20px] top-0"
                                />
                              ) : (
                                <FaRegClipboard
                                  onClick={() =>
                                    copyToClipboard(window.location.href)
                                  }
                                  size="20px"
                                  className="absolute right-[20px] top-0"
                                />
                              )}
                            </p>
                          </AccordionItemPanel>
                        </AccordionItem>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickView;

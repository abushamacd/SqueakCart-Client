import React from "react";
import Head from "../components/Head";
import PopularCollection from "../sections/PopularCollection";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Slider from "react-slick";
import {
  FaAngleDown,
  FaShippingFast,
  FaRegClipboard,
  FaClipboardCheck,
} from "react-icons/fa";
import { GiShare, GiSelfLove, GiExplosiveMaterials } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import "react-accessible-accordion/dist/fancy-example.css";

const ProductDetails = () => {
  const [openReview, setOpenReview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
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
    <>
      <Head title="Product Title ||" />
      <BreadCrumb title="Product Title" />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="product_details">
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
                      <a
                        className="text-gray-600 text-sm hover:underline"
                        onClick={() => setOpenReview(true)}
                        href="#review"
                      >
                        Write a review
                      </a>
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
          <div className="product_desc my-4">
            <h4 className="text-[26px] mb-2 font-bold ">Description</h4>
            <div className="desc_box bg-white p-[20px] text-justify rounded-lg box_shadow ">
              <p className="text-[14px] ">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Ducimus iusto iste error sequi accusantium atque odio, fugit a
                rem, excepturi voluptate quis, labore quos molestiae enim alias
                itaque. Praesentium ut illum excepturi aliquam molestiae
                similique aperiam omnis distinctio numquam qui vero ipsum iusto
                repellat illo officiis, quam dicta, iste odit. Incidunt aut
                porro ullam omnis praesentium explicabo at doloremque voluptates
                ut eius, magnam ducimus, optio, mollitia deleniti exercitationem
                reprehenderit in totam alias libero quae provident ab
                asperiores! Cumque quam minima quidem eos rem quia esse vel
                animi aperiam sequi. Veritatis placeat quasi soluta velit maxime
                eveniet dolor nihil beatae cupiditate.
              </p>
            </div>
          </div>
          <div className="product_review my-4">
            <h4 id="review" className="text-[26px] mb-2 font-bold">
              Reviews
            </h4>
            <div className="review_box bg-white p-[20px] text-justify rounded-lg box_shadow ">
              <div className="review_header border-b pb-[25px]">
                <h5 className="text-lg font-medium mb-2 ">Customer Reviews</h5>
                <div className="flex justify-between md:items-center">
                  <div className="flex  md:flex-row flex-col gap-[15px] text-sm">
                    <ReactStars
                      count={5}
                      className="my-[10px]"
                      size={20}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <p>Based on 3 reviews</p>
                  </div>
                  <p
                    onClick={() => setOpenReview(!openReview)}
                    className="duration-300 hover:underline text-sm cursor-pointer"
                  >
                    Write a review
                  </p>
                </div>
              </div>
              {openReview && (
                <div className="write_review py-[20px] border-b">
                  <h5 className="text-lg mb-2">Write A Review</h5>
                  <form action="">
                    <div className="form-control w-full mb-2">
                      <label htmlFor="name" className="label pl-0">
                        <span className="label-text">Name *</span>
                      </label>
                      <input
                        required
                        name="name"
                        id="name"
                        type="text"
                        placeholder="Type your name"
                        className="input input-sm input-bordered w-full"
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label htmlFor="email" className="label pl-0">
                        <span className="label-text">Email *</span>
                      </label>
                      <input
                        required
                        name="email"
                        id="email"
                        type="email"
                        placeholder="Type your email"
                        className="input input-sm input-bordered w-full"
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label htmlFor="rate" className="label pl-0">
                        <span className="label-text">Rating *</span>
                      </label>
                      <ReactStars
                        count={5}
                        className="my-[10px]"
                        size={20}
                        value={3}
                        edit={true}
                        activeColor="#ffd700"
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label htmlFor="rTitle" className="label pl-0">
                        <span className="label-text">Review Title</span>
                      </label>
                      <input
                        name="rTitle"
                        id="rTitle"
                        type="text"
                        placeholder="Type a review title"
                        className="input input-sm input-bordered w-full"
                      />
                    </div>
                    <div className="form-control w-full mb-2">
                      <label htmlFor="rMessage" className="label pl-0">
                        <span className="label-text">
                          Body of Review (1500)
                        </span>
                      </label>
                      <textarea
                        name="rMessage"
                        id="rMessage"
                        cols="30"
                        rows="5"
                        placeholder="Write your comments here"
                        className="input h-[150px] input-bordered w-full"
                      ></textarea>
                    </div>
                    <div className="flex justify-end mt-4">
                      <button
                        type="submit"
                        className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium"
                      >
                        Submit Review
                      </button>
                    </div>
                  </form>
                </div>
              )}
              <div className="customer_review py-4 border-b">
                <ReactStars
                  count={5}
                  className="my-[10px]"
                  size={20}
                  value={3}
                  edit={false}
                  activeColor="#ffd700"
                />
                <h3 className="review_title font-semibold">review title</h3>
                <p className=" text-[14px] mt-1 ">
                  <span className="customer_name font-medium italic">
                    Shama
                  </span>{" "}
                  <span className="article">on</span>
                  <span className="review_date font-medium italic"> date</span>
                </p>
                <p className="review_message mt-3 text-[14px] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  eaque soluta alias? Possimus natus numquam repellendus in
                  necessitatibus corporis perferendis, perspiciatis omnis, odit,
                  facilis unde? Nobis veritatis dolorem in dolorum!
                </p>
              </div>
              <div className="customer_review py-4 border-b">
                <ReactStars
                  count={5}
                  className="my-[10px]"
                  size={20}
                  value={3}
                  edit={false}
                  activeColor="#ffd700"
                />
                <h3 className="review_title font-semibold">review title</h3>
                <p className=" text-[14px] mt-1 ">
                  <span className="customer_name font-medium italic">
                    Shama
                  </span>{" "}
                  <span className="article">on</span>
                  <span className="review_date font-medium italic"> date</span>
                </p>
                <p className="review_message mt-3 text-[14px] ">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
                  eaque soluta alias? Possimus natus numquam repellendus in
                  necessitatibus corporis perferendis, perspiciatis omnis, odit,
                  facilis unde? Nobis veritatis dolorem in dolorum!
                </p>
              </div>
            </div>
          </div>

          <PopularCollection />
        </div>
      </div>
    </>
  );
};

export default ProductDetails;

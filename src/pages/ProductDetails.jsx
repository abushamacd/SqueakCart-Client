import React, { useEffect } from "react";
import Head from "../components/Head";
import PopularCollection from "../sections/PopularCollection";
import BreadCrumb from "../components/BreadCrumb";
import ReactStars from "react-rating-stars-component";
import { useState } from "react";
import Slider from "react-slick";
import {
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
import { useNavigate, useParams } from "react-router-dom";
import { useGetProductQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useAddToCartMutation } from "../redux/features/cart/cartApi";
import { FiHeart } from "react-icons/fi";
import { useAddToWishlistMutation } from "../redux/features/user/userApi";
const httpStatus = require("http-status");

const ProductDetails = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState("");
  const params = useParams();
  const navigate = useNavigate();
  const { data: productData, isLoading: productIsLoading } = useGetProductQuery(
    params?.id
  );
  const product = productData?.data;

  const [
    addToCart,
    {
      isSuccess: addToCartIsSuccess,
      data: addToCartData,
      isError: addToCartIsError,
      error: addToCartError,
      reset: addToCartReset,
    },
  ] = useAddToCartMutation();

  const [
    addToWishlist,
    {
      data: addToWishlistData,
      error: addToWishlistError,
      isError: addToWishlistIsError,
      isSuccess: addToWishlistIsSuccess,
      reset: addToWishlistReset,
    },
  ] = useAddToWishlistMutation();

  if (addToWishlistIsSuccess) {
    toast(addToWishlistData?.message);
    addToWishlistReset();
  } else if (addToWishlistIsError) {
    toast.error(addToWishlistError?.data?.message);
    addToWishlistReset();
  }

  const [openReview, setOpenReview] = useState(false);
  const [copied, setCopied] = useState(false);
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();
  var image_settings = {
    arrows: false,
  };
  const slideNumber =
    product?.images?.length <= 4 ? product?.images?.length : 5;

  const slideNumberForMobile =
    product?.images?.length <= 2 ? product?.images?.length : 3;

  var thumb_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,
    slidesToShow: slideNumber,
    initialSlide: 0,
    swipeToSlide: true,
    focusOnSelect: true,
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
          slidesToShow: slideNumberForMobile,
        },
      },
    ],
  };

  const copyToClipboard = (text) => {
    setCopied(true);
    navigator.clipboard.writeText(text);
    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  const handleAddToCart = (product) => {
    if (selectColor === "") {
      toast.error("Please select a color");
    } else {
      const data = {
        productId: product?._id,
        count: Number(quantity),
        color: selectColor,
        price: product?.price,
      };
      addToCart(data);
    }
  };

  const handleBuyNow = async (product) => {
    if (selectColor === "") {
      toast.error("Please select a color");
    } else {
      const data = {
        productId: product?._id,
        count: Number(quantity),
        color: selectColor,
      };
      localStorage.setItem("sc_buyNow", JSON.stringify(data));
      navigate("/buy");
    }
  };

  useEffect(() => {
    if (addToCartError?.status === 401) {
      toast.error("Please login first");
    } else if (addToCartError?.status === httpStatus.FORBIDDEN) {
      toast.error("First logout then login");
    }

    if (addToCartIsSuccess) {
      toast(addToCartData?.message);
      addToCartReset();
    } else if (addToCartIsError) {
      toast.error("First logout then login");
      addToCartReset("Product added failed");
    }
  }, [
    addToCartError,
    addToCartData,
    addToCartIsSuccess,
    addToCartIsError,
    addToCartReset,
  ]);

  if (productIsLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title={`${product?.title} ||`} />
      <BreadCrumb title={product?.title} />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="product_details">
            <section className="overflow-hidden bg-white p-[20px] rounded-lg box_shadow ">
              <div className="mx-auto">
                <div className="lg:w-full mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full lg:h-auto">
                    <Slider
                      {...image_settings}
                      asNavFor={nav2}
                      ref={(slider1) => setNav1(slider1)}
                    >
                      {product?.images?.map((image) => (
                        <div key={image._id} className="">
                          <div className="product_image md:w-[500px] md:h-[500px] mx-auto overflow-hidden rounded-xl">
                            <img
                              className="rounded-xl"
                              src={image?.url}
                              alt="product"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                    <Slider
                      {...thumb_settings}
                      className="mt-[20px]"
                      asNavFor={nav1}
                      ref={(slider2) => setNav2(slider2)}
                      swipeToSlide={true}
                      focusOnSelect={true}
                    >
                      {product?.images?.map((image) => (
                        <div key={image._id} className="">
                          <div className="p-[10px]">
                            <img
                              className="rounded-xl border h-[100px] w-[100px] "
                              src={image?.url}
                              alt="product"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                  </div>
                  <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                    <p className="product_brand text-sm text-gray-500 uppercase">
                      {product?.brand?.title}
                    </p>
                    <h2 className="text-gray-900 text-3xl  font-medium mb-1">
                      {product?.title}
                    </h2>
                    <h1 className=" font-medium text-2xl text-gray-900">
                      $ <span className="font-bold">{product?.price}</span>
                    </h1>
                    <div className="flex items-center justify-between mb-4">
                      <span className="flex items-center">
                        <ReactStars
                          count={5}
                          className="my-[10px]"
                          size={20}
                          value={3}
                          edit={false}
                          activeColor="#febd69"
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
                        {product?.color?.map((color, i) => (
                          <button
                            onClick={() => setSelectColor(color?._id)}
                            style={{ backgroundColor: `${color.code}` }}
                            key={i}
                            className={`${
                              selectColor === color?._id &&
                              `border-4 border-black`
                            } ml-1 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        ))}
                      </div>
                      <div className="flex items-center">
                        <span className="mr-3">Quantity</span>
                        <input
                          type="number"
                          min="1"
                          value={quantity}
                          onChange={(e) => setQuantity(e.target.value)}
                          max={product?.quantity}
                          className="text-center border w-20 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none rounded-md"
                          name=""
                        />
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col justify-between md:items-center mt-[20px] gap-4">
                      <div className="flex gap-[20px]">
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                        >
                          Add to Cart
                        </button>
                        <button onClick={() => handleBuyNow(product)}>
                          <p className="second_button cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium ">
                            Buy Now
                          </p>
                        </button>
                      </div>
                      <div className="flex gap-4">
                        <div className="wishlist cursor-pointer flex justify-center items-center gap-1">
                          <FiHeart
                            onClick={() =>
                              addToWishlist({
                                data: { productId: product?._id },
                              })
                            }
                            className="duration-300 text-black p-1 rounded-full "
                            size="24"
                          />
                          <p className="text-sm md:hidden block">
                            Add to wishlist
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
                              We ship all orders within
                              <strong> 3-14 working days!</strong>
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
                            <p>See on descriptions</p>
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
                            <p>See on descriptions</p>
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
                              Use carefully. Don't use in overheated, dusty and
                              raining area.
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
              <div
                className="text-sm desc_show"
                dangerouslySetInnerHTML={{
                  __html: product?.description,
                }}
              ></div>
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
                      activeColor="#febd69"
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
                        activeColor="#febd69"
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
                  activeColor="#febd69"
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

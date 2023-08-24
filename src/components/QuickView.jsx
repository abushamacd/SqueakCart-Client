import React, { useEffect } from "react";
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import { useState } from "react";
import {
  FaClipboardCheck,
  FaRegClipboard,
  FaShippingFast,
} from "react-icons/fa";
import { GiExplosiveMaterials, GiSelfLove, GiShare } from "react-icons/gi";
import { RxDimensions } from "react-icons/rx";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { FiHeart } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useAddToCartMutation } from "../redux/features/cart/cartApi";
import { toast } from "react-toastify";
import httpStatus from "http-status";
import { setView } from "../redux/features/site/siteSlice";
import { useAddToWishlistMutation } from "../redux/features/user/userApi";

const QuickView = () => {
  const dispatch = useDispatch();
  const { view } = useSelector((state) => state.site);
  const [quantity, setQuantity] = useState(1);
  const [selectColor, setSelectColor] = useState("");
  const navigate = useNavigate();
  const product = view?.data;

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

  return (
    <>
      <div className="quick_view">
        <input type="checkbox" id="my-modal-5" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box w-11/12 max-w-5xl bg-gray-100">
            <label
              onClick={() => dispatch(setView({ data: null, state: false }))}
              htmlFor="my-modal-5"
              className="btn btn-sm btn-circle absolute right-2 top-2"
            >
              ✕
            </label>
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
                                <div className="product_image md:w-[400px] md:h-[400px] mx-auto overflow-hidden rounded-xl">
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
                            ${" "}
                            <span className="font-bold">{product?.price}</span>
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
                                    Free shipping and returns available on all
                                    orders!
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
                                    Running Shoes cushions your stride with soft
                                    foam to keep you running in comfort.
                                    Lightweight knit material wraps your foot in
                                    breathable support, while a minimalist
                                    design fits in just about anywhere your day
                                    takes you.
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
                                    Running Shoes cushions your stride with soft
                                    foam to keep you running in comfort.
                                    Lightweight knit material wraps your foot in
                                    breathable support, while a minimalist
                                    design fits in just about anywhere your day
                                    takes you.
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
                                    Use a soft damp cloth and a drop of mild
                                    soap to remove any haze. Air dry.
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default QuickView;

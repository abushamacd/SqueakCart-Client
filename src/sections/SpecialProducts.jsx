import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import Slider from "react-slick";
import Loading from "../components/Loading";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { FiHeart, FiEye } from "react-icons/fi";
import { setView } from "../redux/features/site/siteSlice";
import { useDispatch } from "react-redux";
import { useAddToWishlistMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";

const SpecialProducts = () => {
  const dispatch = useDispatch();
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery({ data: `` });
  const products = productData?.data?.data;
  const specialProducts = products?.filter((product) =>
    product?.tag?.includes("special")
  );

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
                          <Link to={`/products/${product?._id}`}>
                            <img
                              className="rounded-xl bg-center  "
                              src={image?.url}
                              alt="product"
                            />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div className="wishlist absolute md:right-[-3%] right-[-2%] top-[3%] ">
                    <FiHeart
                      onClick={() =>
                        addToWishlist({ data: { productId: product?._id } })
                      }
                      className="duration-300 text-black p-1 rounded-full "
                      size="24"
                    />
                  </div>
                  <div className="action_bar absolute top-[14%] flex flex-col gap-[5px]">
                    <label htmlFor="my-modal-5">
                      <FiEye
                        onClick={() =>
                          dispatch(setView({ data: product, state: true }))
                        }
                        className="duration-300 text-black p-1 rounded-full "
                        size="24"
                      />
                    </label>
                  </div>
                </div>
                <div className="product_info md:w-1/2">
                  <div className="flex justify-between">
                    <h6 className="product_brand uppercase my-[12px] text-sm font-medium">
                      {product?.brand?.title}
                    </h6>
                    {product?.status === "unavailable" && (
                      <div className="product_tag duration-300 badge badge-warning capitalize font-medium text-xs">
                        <p className="">Out of stock</p>
                      </div>
                    )}
                  </div>
                  <Link to={`/products/${product?._id}`}>
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
                      value={product?.quantity}
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

import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";
import { FiHeart, FiEye } from "react-icons/fi";
import { setView } from "../redux/features/site/siteSlice";
import { useDispatch } from "react-redux";
import { useAddToWishlistMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";

const PopularCollection = () => {
  const dispatch = useDispatch();
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery({ data: `` });
  const products = productData?.data?.data;
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

  if (productIsLoading || !Array.isArray(products)) {
    return <Loading />;
  }

  const popularProducts = [...products]?.sort((a, b) => b.view - a.view);

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    initialSlide: 0,
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
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="featured_collection_section rounded-xl section_gap">
      <div className="section_heading">
        <h4 className="section_title">Popular Collections</h4>
      </div>
      <Slider {...settings}>
        {popularProducts?.map((product) => (
          <div
            key={product._id}
            className="product min-h-[380px] md:w-1/5 relative"
          >
            <div className="product_inner bg-white rounded-xl box_shadow min-h-[340px] my-[20px] p-4">
              {product?.status === "unavailable" && (
                <div className="product_tag duration-300 badge badge-warning absolute top-[7%] left-[2%] capitalize font-medium text-xs">
                  <p className="">Out of stock</p>
                </div>
              )}
              <div className="wishlist absolute md:right-[2%] right-[2%] top-[7%] ">
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
                  <h2 className="product_title capitalize font-medium text-[15px] leading-[22px] tracking-[.3px] min-h-[50px]">
                    {product?.title}
                  </h2>
                  <div className="flex justify-between items-center">
                    <ReactStars
                      count={5}
                      className="my-[10px]"
                      size={20}
                      value={3}
                      edit={false}
                      activeColor="#febd69"
                    />
                    <p className="product_price">
                      $ <span className="font-bold">{product?.price}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default PopularCollection;

import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setMeta } from "../redux/features/product/productSlice";
import { FiHeart, FiEye } from "react-icons/fi";
import { useAddToWishlistMutation } from "../redux/features/user/userApi";
import { toast } from "react-toastify";
import { setView } from "../redux/features/site/siteSlice";
import QuickView from "../components/QuickView";

const StoreProducts = () => {
  const dispatch = useDispatch();
  const {
    limit,
    page,
    sortOrder,
    sortBy,
    queryCat,
    queryBrand,
    queryStatus,
    queryColor,
    searchTerm,
    minPrice,
    maxPrice,
  } = useSelector((state) => state.product);

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

  const query = `?&searchTerm=${searchTerm}&sortBy=${sortBy}&sortOrder=${sortOrder}&limit=${limit}&page=${page}&${
    queryCat && `category=${queryCat}`
  }&${queryBrand && `brand=${queryBrand}`}&${
    queryStatus && `status=${queryStatus}`
  }&${queryColor && `color=${queryColor}`}&${
    minPrice && `minPrice=${minPrice}`
  }&${maxPrice && `maxPrice=${maxPrice}`}`;

  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery({ data: query });
  const products = productData?.data?.data;
  const meta = productData?.data?.meta;

  if (meta) {
    dispatch(setMeta(meta));
  }

  if (productIsLoading) {
    return <Loading />;
  }

  return (
    <div className="flex flex-wrap md:gap-[1%] gap-[2%]">
      {products?.length > 0 ? (
        products?.map((product) => (
          <div
            key={product?._id}
            className="product min-h-[380px] md:w-[19%] w-[48%] relative"
          >
            <div className="product_inner bg-white rounded-xl box_shadow min-h-[340px] my-[20px] p-4">
              {product?.status === "unavailable" && (
                <div className="product_tag duration-300 badge badge-warning absolute top-[7%] left-[2%] capitalize font-medium text-xs">
                  <p className="">Out of stock</p>
                </div>
              )}
              <div className="wishlist absolute right-[2%]  top-[7%] ">
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
                  <h2
                    title={product?.title}
                    className="product_title capitalize font-medium text-[15px] leading-[22px] tracking-[.3px] min-h-[50px]"
                  >
                    {product?.title?.length > 30
                      ? product?.title.slice(0, 30) + "..."
                      : product?.title}
                  </h2>

                  <div className="md:flex justify-between items-center">
                    <ReactStars
                      count={5}
                      className="my-[10px]"
                      size={20}
                      value={3}
                      edit={false}
                      activeColor="#febd69"
                    />
                    <p className="product_price product_brand">
                      $ <span className="font-bold">{product?.price}</span>
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        ))
      ) : (
        <h1 className="text-4xl font-bold italic text-center my-2">
          No product found on your query
        </h1>
      )}
      <QuickView />
    </div>
  );
};

export default StoreProducts;

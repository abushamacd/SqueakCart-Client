import React from "react";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setMeta } from "../redux/features/product/productSlice";

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
      {products.length > 0 ? (
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
                <img
                  className=" bg-white h-[25px] duration-300 w-[25px] rounded-full p-[5px] "
                  src="/images/wish.svg"
                  alt=""
                />
              </div>
              <div className="action_bar absolute top-[16%] flex flex-col gap-[5px]">
                <Link to="/">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/prodcompare.svg"
                    alt=""
                  />
                </Link>
                <Link to="/">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/view.svg"
                    alt=""
                  />
                </Link>
                <Link to="/">
                  <img
                    className="duration-300 bg-white h-[25px] w-[25px] rounded-full p-[5px] "
                    src="/images/add-cart.svg"
                    alt=""
                  />
                </Link>
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
                    {product?.title.length > 30
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
                      activeColor="#ffd700"
                    />
                    <p className="product_price product_brand">
                      $ <span className="font-bold">{product?.price}</span>{" "}
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
    </div>
  );
};

export default StoreProducts;

import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from "../redux/features/product/productApi";
import { useGetBrandsQuery } from "../redux/features/brand/brandApi";
import { useGetColorsQuery } from "../redux/features/color/colorApi";
import { useGetProCatsQuery } from "../redux/features/proCat/proCatApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setQueryBrand,
  setQueryCat,
  setQueryColor,
  setQueryStatus,
} from "../redux/features/product/productSlice";
import { RiDeleteBack2Line } from "react-icons/ri";

const StoreSidebar = () => {
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
    products,
  } = useSelector((state) => state.product);
  const { data: categoryData, isLoading: categoryIsLoading } =
    useGetProCatsQuery();
  const categories = categoryData?.data?.data;

  console.log(products);

  // let categories = [];
  // for (let i = 0; i < products?.length; i++) {
  //   const isExist = categories.find(
  //     (category) => category?._id === products[i].category[0]?._id
  //   );

  //   if (!isExist) {
  //     categories.push(...products[i].category);
  //   }
  // }

  const { data: colorData, isLoading: colorIsLoading } = useGetColorsQuery();
  const colors = colorData?.data?.data;

  const { data: brandData, isLoading: brandIsLoading } = useGetBrandsQuery();
  const brands = brandData?.data?.data;

  return (
    <div>
      <div className="bycatagory filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <div className="flex justify-between items-center">
          <h4 className="filter_title capitalize">Shop By Categories</h4>
          <span>
            <RiDeleteBack2Line
              onClick={() => dispatch(setQueryCat(null))}
              color="red"
              size={20}
            />
          </span>
        </div>
        <div className="mt-[20px]">
          <ul className="filte_menu max-h-[200px] overflow-auto ">
            {categories?.map((category, i) => (
              <li
                key={category?._id}
                className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium "
              >
                <div className="flex items-center">
                  <input
                    id={`category-${i}`}
                    type="checkbox"
                    value={category?._id}
                    checked={category?._id === queryCat}
                    onChange={(e) => dispatch(setQueryCat(e.target.value))}
                    className="w-4 h-4 rounded"
                  />
                  <label htmlFor={`category-${i}`} className="ml-2 ">
                    {category?.title}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="byfilter filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <h4 className="filter_title capitalize">Filter By</h4>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Availability</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id={`In Stock`}
                  onChange={(e) => dispatch(setQueryStatus(e.target.value))}
                  type="checkbox"
                  value="available"
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor={`In Stock`} className="ml-2 capitalize ">
                  In Stock
                </label>
              </div>
            </li>
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id={`Out of Stock`}
                  onChange={(e) => dispatch(setQueryStatus(e.target.value))}
                  type="checkbox"
                  value="unavailable"
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor={`Out of Stock`} className="ml-2 capitalize ">
                  Out of Stock
                </label>
              </div>
            </li>
          </ul>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Price</h5>
          <div className="price_range flex justify-between items-center">
            <div className=" flex">
              <label className="label">
                <span className="label-text">$</span>
              </label>
              <input
                type="text"
                placeholder="From"
                className="input text-sm p-[5px] h-[2rem] input-bordered w-20 "
              />
            </div>
            <p>-</p>
            <div className=" flex">
              <label className="label">
                <span className="label-text">$</span>
              </label>
              <input
                type="text"
                placeholder="To"
                className="input text-sm p-[5px] h-[2rem] input-bordered w-20 "
              />
            </div>
          </div>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Colors</h5>
          <div className="flex flex-wrap">
            {colors?.map((color, i) => (
              <button
                onClick={() => dispatch(setQueryColor(color?._id))}
                style={{ backgroundColor: `${color.code}` }}
                key={i}
                className={`ml-1 m-1 rounded-full w-6 h-6 focus:outline-none`}
              ></button>
            ))}
          </div>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Brands</h5>
          <ul className="filte_menu  max-h-[200px] overflow-auto">
            {brands?.map((brand, i) => (
              <li
                key={brand?._id}
                className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium "
              >
                <div className="flex items-center">
                  <input
                    id={`brand-${i}`}
                    type="checkbox"
                    value={brand?._id}
                    onChange={(e) => dispatch(setQueryBrand(e.target.value))}
                    className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                  />
                  <label htmlFor={`brand-${i}`} className="ml-2 ">
                    {brand?.title}
                  </label>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      {/* <div className="bytag filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <h4 className="filter_title capitalize">Product Tag</h4>
        <div className="product_tag flex flex-wrap gap-[10px]">
          {tags?.map((tag, i) => (
            <button
              key={i}
              className="btn btn-sm border-0 text-xs font-medium capitalize"
            >
              {tag}
            </button>
          ))}
        </div>
      </div> */}
      {/* <div className="random_products filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <h4 className="filter_title capitalize">Random Products</h4>
        {randomProducts?.map((product) => (
          <Link key={product?._id} to={`/products/${product?._id}`}>
            <div className="random_product flex gap-[10px] border-b py-2">
              <img
                className="w-[80px] h-full rounded-md"
                src={product?.images[0]?.url}
                alt=""
              />
              <div className="product_info">
                <h2
                  title={product?.title}
                  className="product_title capitalize font-medium text-[14px] leading-[22px] tracking-[.3px] "
                >
                  {product?.title.length > 20
                    ? product?.title.slice(0, 20) + "..."
                    : product?.title}
                </h2>
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
        ))}
      </div> */}
    </div>
  );
};

export default StoreSidebar;

import React from "react";
import { useGetBrandsQuery } from "../redux/features/brand/brandApi";
import { useGetColorsQuery } from "../redux/features/color/colorApi";
import { useGetProCatsQuery } from "../redux/features/proCat/proCatApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setMaxPrice,
  setMinPrice,
  setQueryBrand,
  setQueryCat,
  setQueryColor,
  setQueryStatus,
} from "../redux/features/product/productSlice";
import { RiDeleteBack2Line } from "react-icons/ri";
import Loading from "../components/Loading";

const StoreSidebar = () => {
  const dispatch = useDispatch();

  const { queryCat, queryBrand, queryStatus, queryColor } = useSelector(
    (state) => state.product
  );
  const { data: categoryData, isLoading: categoryIsLoading } =
    useGetProCatsQuery();
  const categories = categoryData?.data?.data;

  const { data: colorData, isLoading: colorIsLoading } = useGetColorsQuery();
  const colors = colorData?.data?.data;

  const { data: brandData, isLoading: brandIsLoading } = useGetBrandsQuery();
  const brands = brandData?.data?.data;

  if (categoryIsLoading || colorIsLoading || brandIsLoading) {
    return <Loading />;
  }

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
        {/* status */}
        <div className="sub_filter my-[15px]">
          <div className="flex justify-between items-center">
            <h5 className="sub_filter_title">Availability</h5>
            <span>
              <RiDeleteBack2Line
                onClick={() => dispatch(setQueryStatus(null))}
                color="red"
                size={20}
              />
            </span>
          </div>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id={`In Stock`}
                  onChange={(e) => dispatch(setQueryStatus(e.target.value))}
                  type="checkbox"
                  value="available"
                  checked={"available" === queryStatus}
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
                  checked={"unavailable" === queryStatus}
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor={`Out of Stock`} className="ml-2 capitalize ">
                  Out of Stock
                </label>
              </div>
            </li>
          </ul>
        </div>
        {/* price */}
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Price</h5>
          <div className="price_range flex justify-between items-center">
            <div className=" flex">
              <label className="label">
                <span className="label-text">$</span>
              </label>
              <input
                type="number"
                placeholder="From"
                onChange={(e) => dispatch(setMinPrice(e.target.value))}
                className="input text-sm p-[5px] h-[2rem] input-bordered w-20 "
              />
            </div>
            <p>-</p>
            <div className=" flex">
              <label className="label">
                <span className="label-text">$</span>
              </label>
              <input
                type="number"
                placeholder="To"
                onChange={(e) => dispatch(setMaxPrice(e.target.value))}
                className="input text-sm p-[5px] h-[2rem] input-bordered w-20 "
              />
            </div>
          </div>
        </div>
        {/* colors */}
        <div className="sub_filter mb-[15px]">
          <div className="flex justify-between items-center">
            <h5 className="sub_filter_title">Colors</h5>
            <span>
              <RiDeleteBack2Line
                onClick={() => dispatch(setQueryColor(null))}
                color="red"
                size={20}
              />
            </span>
          </div>
          <div className="flex flex-wrap">
            {colors?.map((color, i) => (
              <button
                onClick={() => dispatch(setQueryColor(color?._id))}
                style={{ backgroundColor: `${color.code}` }}
                key={i}
                className={` ${
                  queryColor === color?._id && `border-4 border-black`
                } ml-1 m-1 rounded-full w-6 h-6 focus:outline-none`}
              ></button>
            ))}
          </div>
        </div>
        {/* brands */}
        <div className="sub_filter mb-[15px]">
          <div className="flex justify-between items-center">
            <h5 className="sub_filter_title">Brands</h5>
            <span>
              <RiDeleteBack2Line
                onClick={() => dispatch(setQueryBrand(null))}
                color="red"
                size={20}
              />
            </span>
          </div>
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
                    checked={brand?._id === queryBrand}
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
    </div>
  );
};

export default StoreSidebar;

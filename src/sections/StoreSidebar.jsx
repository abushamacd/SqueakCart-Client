import React from "react";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const StoreSidebar = () => {
  return (
    <div>
      <div className="bycatagory filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <h4 className="filter_title capitalize">Shop By Categories</h4>
        <div className="">
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              Watch
            </li>
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              Phone
            </li>
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
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="link-checkbox" className="ml-2 ">
                  In Stock
                </label>
              </div>
            </li>
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="link-checkbox" className="ml-2 ">
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
          <h5 className="sub_filter_title">Color</h5>
          <div className="color">
            <ul className="flex flex-wrap gap-[10px] ">
              <li className="w-[20px] h-[20px] bg-[red] rounded-full "></li>
              <li className="w-[20px] h-[20px] bg-[red] rounded-full "></li>
              <li className="w-[20px] h-[20px] bg-[red] rounded-full "></li>
            </ul>
          </div>
        </div>
        <div className="sub_filter mb-[15px]">
          <h5 className="sub_filter_title">Size</h5>
          <ul className="filte_menu">
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="link-checkbox" className="ml-2 ">
                  S
                </label>
              </div>
            </li>
            <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
              <div className="flex items-center">
                <input
                  id="link-checkbox"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 bg-gray-100 border-gray-300 rounded"
                />
                <label htmlFor="link-checkbox" className="ml-2 ">
                  M
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="bytag filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <h4 className="filter_title capitalize">Product Tag</h4>
        <div className="product_tag flex flex-wrap gap-[10px]">
          <button className="btn btn-sm border-0 text-xs font-medium">
            Small
          </button>
          <button className="btn btn-sm border-0 text-xs font-medium">
            Small
          </button>
        </div>
      </div>
      <div className="random_products filter_card bg-white p-[20px] rounded-xl box_shadow ">
        <h4 className="filter_title capitalize">Random Products</h4>
        <Link to={"/"}>
          <div className="random_product flex gap-[10px] border-b py-2">
            <img
              className="w-[80px] h-full rounded-md"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
            <div className="product_info">
              <h2 className="product_title capitalize font-medium text-[14px] leading-[22px] tracking-[.3px] ">
                Lorem, ipsum dolor sit amet consectetur
              </h2>
              <ReactStars
                count={5}
                className="my-[10px]"
                size={20}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="product_price">
                $ <span>10.45</span>{" "}
              </p>
            </div>
          </div>
          <div className="random_product flex gap-[10px] border-b py-2">
            <img
              className="w-[80px] h-full rounded-md"
              src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
              alt=""
            />
            <div className="product_info">
              <h2 className="product_title capitalize font-medium text-[14px] leading-[22px] tracking-[.3px] ">
                Lorem, ipsum dolor sit amet consectetur
              </h2>
              <ReactStars
                count={5}
                className="my-[10px]"
                size={20}
                value={3}
                edit={false}
                activeColor="#ffd700"
              />
              <p className="product_price">
                $ <span>10.45</span>{" "}
              </p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default StoreSidebar;

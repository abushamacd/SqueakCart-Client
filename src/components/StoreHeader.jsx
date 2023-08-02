import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSortBy,
  setSortOrder,
} from "../redux/features/product/productSlice";

const StoreHeader = () => {
  const dispatch = useDispatch();
  const { meta } = useSelector((state) => state.product);

  return (
    <div className="store_header flex justify-between items-center bg-white p-2 rounded-xl box_shadow">
      <div className="">
        <h4 className="store_header_text text-sm">{meta?.total} Products</h4>
      </div>
      <div className="flex items-center gap-[15px]">
        <div className="flex items-center gap-2">
          <h4 className="store_header_text text-sm ">Sort Order</h4>
          <select
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
            className="select min-h-[2rem] h-[2rem]"
          >
            <option value="desc">Desending</option>
            <option value="asc">Accending</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <h4 className="store_header_text text-sm ">Sort By</h4>
          <select
            onChange={(e) => dispatch(setSortBy(e.target.value))}
            className="select min-h-[2rem] h-[2rem]"
          >
            <option value="createdAt">Created</option>
            <option value="title">Title</option>
            <option value="price">Price</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StoreHeader;

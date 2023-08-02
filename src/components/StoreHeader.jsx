import React from "react";
import { useGetProductsQuery } from "../redux/features/product/productApi";

const StoreHeader = () => {
  const { data: productData } =
    useGetProductsQuery();
  const products = productData?.data?.data;
  return (
    <div className="store_header flex justify-between items-center bg-white p-2 rounded-xl box_shadow">
      <div className="flex items-center gap-[15px]">
        <h4 className="store_header_text text-sm ">Sort By</h4>
        <select className="select min-h-[2rem] h-[2rem]">
          {/* <option disabled selected>
            Pick your favorite Simpson
          </option> */}
          <option>Accending</option>
          <option>Desending</option>
          <option>Title</option>
        </select>
      </div>
      <div className="">
        <h4 className="store_header_text text-xs ">
          {products?.length} Products
        </h4>
      </div>
    </div>
  );
};

export default StoreHeader;

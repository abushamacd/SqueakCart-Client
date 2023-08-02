import { Pagination } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLimit, setPage } from "../redux/features/product/productSlice";

const StoreFooter = () => {
  const dispatch = useDispatch();
  const { meta, limit, page } = useSelector((state) => state.product);
  const onShowSizeChange = (current, pageSize) => {
    dispatch(setPage(current));
    dispatch(setLimit(pageSize));
  };
  return (
    <div className="store_header flex md:flex-row  flex-col justify-between items-center bg-white p-2 rounded-xl box_shadow">
      <div className="product_count p-2 rounded-sm">
        <h4 className="store_header_text text-sm">
          Showing {limit * page} of {meta?.total}
        </h4>
      </div>
      <div className="">
        <Pagination
          showSizeChanger
          onChange={onShowSizeChange}
          defaultCurrent={1}
          defaultPageSize={20}
          total={meta?.total}
        />
      </div>
    </div>
  );
};

export default StoreFooter;

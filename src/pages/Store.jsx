import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import StoreSidebar from "../sections/StoreSidebar";
import StoreProducts from "../sections/StoreProducts";
import StoreHeader from "../components/StoreHeader";
import StoreFooter from "../components/StoreFooter";

const Store = () => {
  return (
    <>
      <Head title="Store ||" />
      <div className="">
        <BreadCrumb title="Our Store" />
        <div className="body_wrapper ">
          <div className="flex gap-[20px] layout p-[20px]">
            <div className="filter_options hidden md:block w-[20%]">
              <StoreSidebar />
            </div>
            <div className="md:w-[80%] w-full">
              <StoreHeader />
              <StoreProducts />
              <StoreFooter />
            </div>
          </div>
        </div>
      </div>
      <div
        id="sidebar_overlay"
        className="bg-gray-900 bg-opacity-50 dark:bg-opacity-80 fixed inset-0 z-40 hidden"
      ></div>
    </>
  );
};

export default Store;

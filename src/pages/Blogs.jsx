import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";

const Blogs = () => {
  const numbers = [1, 2, 3, 4, 5, 6];
  return (
    <>
      <Head title="News ||" />
      <div className="">
        <BreadCrumb title="Latest News" />
        <div className="body_wrapper ">
          <div className="flex gap-[20px] layout p-[20px]">
            <div className="filter_options hidden md:block w-[20%]">
              <div className="bycatagory filter_card bg-white p-[20px] rounded-xl box_shadow ">
                <h4 className="filter_title capitalize">
                  Filter by Catagories
                </h4>
                <div className="">
                  <ul className="filte_menu">
                    <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                      Latest
                    </li>
                    <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                      Offers
                    </li>
                    <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                      Hot Sales
                    </li>
                    <li className="filter_menu_item text-[13px] leading-[28px] capitalize font-medium ">
                      Campaing
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="md:w-[80%] w-full flex flex-wrap gap-[2%]">
              {numbers.map((blog) => (
                <div key={blog} className="py-4 md:w-[48%]">
                  <div className="blog box_shadow rounded-xl">
                    <img
                      className="rounded-xl mb-[10px] w-full h-[300px]"
                      src="images/blog-1.jpg"
                      alt="blog images"
                    />
                    <div className="h-full flex items-start">
                      <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                          Jul
                        </span>
                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                          18
                        </span>
                      </div>
                      <div className="flex-grow pl-6">
                        <h2 className="tracking-widest text-xs title-font mb-1">
                          CATEGORY
                        </h2>
                        <h1 className="title-font text-xl font-medium text-gray-900 mb-3">
                          Neptune
                        </h1>
                        <p className="leading-relaxed mb-3 text-sm">
                          Photo booth fam kinfolk cold-pressed sriracha leggings
                          jianbing microdosing tousled waistcoat.
                        </p>
                        <Link
                          to="/blog/:id"
                          className="inline-flex items-center mb-4 capitalize text-sm text-indigo-500 hover:underline duration-200 first_button py-[10px] px-[15px] rounded-full "
                        >
                          read More{" "}
                          <HiOutlineArrowNarrowRight className="ml-2" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
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

export default Blogs;

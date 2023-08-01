import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useGetBlogsQuery } from "../redux/features/blog/blogApi";
import Loading from "../components/Loading";

const Blogs = () => {
  const { data: blogData, isLoading: blogIsLoading } = useGetBlogsQuery();
  const blogs = blogData?.data?.data;

  const monthNames = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  if (blogIsLoading) {
    return <Loading />;
  }
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
              {blogs?.map((blog) => (
                <div key={blog?._id} className="py-4 md:w-[30%]">
                  <div className="blog box_shadow rounded-xl">
                    <img
                      className="rounded-xl mb-[10px] w-full h-[200px]"
                      src={blog?.images[0]?.url}
                      alt="blog images"
                    />
                    <div className="h-full flex items-start">
                      <div className="w-12 flex-shrink-0 flex flex-col text-center leading-none">
                        <span className="text-gray-500 pb-2 mb-2 border-b-2 border-gray-200">
                          {monthNames[new Date(blog?.date)?.getMonth()]}
                        </span>
                        <span className="font-medium text-lg text-gray-800 title-font leading-none">
                          {new Date(blog?.date)?.getDate()}
                        </span>
                      </div>
                      <div className="flex-grow pl-6 pr-2">
                        <h2 className="tracking-widest text-xs title-font uppercase mb-1 ">
                          {blog?.category[0]?.title}
                        </h2>
                        <h1
                          title={blog?.title}
                          className="title-font text-md font-medium text-gray-900 mb-3 min-h-[50px] border-b"
                        >
                          {blog?.title.length > 40
                            ? blog?.title.slice(0, 40) + "..."
                            : blog?.title}
                        </h1>
                        <div
                          className="text-sm desc_show min-h-[80px]  border-b"
                          dangerouslySetInnerHTML={{
                            __html:
                              blog?.description.length > 100
                                ? blog?.description.slice(0, 100) + "..."
                                : blog?.description,
                          }}
                        ></div>
                        <Link
                          to={`/blogs/${blog?._id}`}
                          className="first_button flex items-center w-36 duration-300 rounded-full py-[8px] px-[20px] font-medium my-[10px] "
                        >
                          Read more{" "}
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

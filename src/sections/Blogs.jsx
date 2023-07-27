import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
import Slider from "react-slick";
import { useGetBlogsQuery } from "../redux/features/blog/blogApi";

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
  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="blogs_section rounded-xl section_gap">
      <div className="section_heading">
        <h4 className="section_title">Our Latest News</h4>
      </div>
      <div className="text-gray-600 body-font">
        <div className="blog relative mx-auto">
          <Slider {...settings}>
            {blogs?.map((blog) => (
              <div key={blog} className="py-4 md:w-1/4">
                <div className="blog box_shadow rounded-xl">
                  <img
                    className="rounded-xl mb-[10px] w-full h-[170px]"
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
                    <div className="flex-grow pl-6">
                      <h2 className="tracking-widest text-xs title-font uppercase mb-1 ">
                        {blog?.category[0]?.title}
                      </h2>
                      <h1
                        title={blog?.title}
                        className="title-font text-md font-medium text-gray-900 mb-3 min-h-[50px] border-b"
                      >
                        {blog?.title.length > 22
                          ? blog?.title.slice(0, 22) + "..."
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
                        to="/"
                        className="inline-flex items-center mb-2 capitalize text-sm text-indigo-500 hover:underline duration-200 "
                      >
                        read More <HiOutlineArrowNarrowRight className="ml-2" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Blogs;

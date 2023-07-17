import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link } from "react-router-dom";

const BlogDetails = () => {
  return (
    <>
      <Head title="Blog Title ||" />
      <div className="">
        <BreadCrumb title="Blog Title" />
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
            <div className="md:w-[80%] w-full">
              <div className="blog_details">
                <h2 className="text-xl font-bold">Blog Title</h2>
                <img
                  className="rounded-xl my-[15px] w-full h-[300px] border"
                  src="images/camera.jpg"
                  alt="blog images"
                />
                <p className="text-sm">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Reiciendis ea magni corporis distinctio dolores reprehenderit
                  quod ut similique nemo, ex possimus aliquid dignissimos
                  laborum debitis. Quidem cumque, velit aliquam eos voluptatibus
                  minus similique voluptatem! Quasi ipsam laborum iste ab
                  officia inventore quod, repudiandae error dolorum rerum!
                  Maiores ipsa commodi culpa quae saepe animi eius maxime eum
                  esse magnam minus doloremque, a vel, in tenetur optio ducimus
                  neque facere odio, sed quis? Nisi, labore! Repellendus dolore
                  consequuntur quibusdam quia numquam soluta maiores velit sit
                  obcaecati nisi optio quis facilis ipsam corrupti porro
                  perspiciatis odio officiis repudiandae inventore animi
                  laborum, pariatur vel.
                </p>
                <div className="blog_about flex gap-[30px] my-[20px]">
                  <p className="date text-sm text-gray-500"> 12, April 2023 </p>
                  <p className="author text-sm text-gray-500"> Author </p>
                </div>
                <div className="blog_footer flex justify-between border-y p-[15px] ">
                  <Link to="/blogs">
                    <p className="left_footer flex items-center gap-2 text-sm hover:underline">
                      <HiOutlineArrowNarrowLeft /> Back to blog
                    </p>
                  </Link>
                  <ul className="right_footer flex gap-3">
                    <li className="">f</li>
                    <li className="">t</li>
                    <li className="">p</li>
                  </ul>
                </div>
                <div className="blog_comment bg-white mt-4 rounded-lg p-4 box_shadow">
                  <h4 className="text-lg">Leave a comment</h4>
                  <form action="">
                    <input
                      className="md:w-[48%] w-full md:mr-[2%] p-2 mt-[20px] rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name*"
                      required
                    />
                    <input
                      className="md:w-[48%] w-full md:ml-[2%] p-2 mt-[20px] rounded-md"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email*"
                      required
                    />
                    <textarea
                      className="w-full mt-[20px] p-2 rounded-md"
                      name="message"
                      id="message"
                      cols="30"
                      rows="4"
                      placeholder="Comment*"
                    ></textarea>
                    <button
                      type="submit"
                      className="first_button duration-300 rounded-md py-[8px] px-[20px] font-medium mt-2"
                    >
                      Post Comment
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetails;

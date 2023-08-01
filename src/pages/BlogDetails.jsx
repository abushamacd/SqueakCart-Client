import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import {
  useDislikeBlogMutation,
  useGetBlogQuery,
  useLikeBlogMutation,
} from "../redux/features/blog/blogApi";
import Loading from "../components/Loading";
import { BiLike, BiDislike } from "react-icons/bi";
import { useSelector } from "react-redux";

const BlogDetails = () => {
  const params = useParams();

  const { user } = useSelector((state) => state.auth);

  const { data: blogData, isLoading: blogIsLoading } = useGetBlogQuery(
    params?.id
  );

  const blog = blogData?.data;

  const [
    likeBlog,
    {
      isSuccess: likeIsSuccess,
      data: likeData,
      isError: likeIsError,
      error: likeError,
      reset: likeReset,
    },
  ] = useLikeBlogMutation();

  const [
    dislikeBlog,
    {
      isSuccess: dislikeIsSuccess,
      data: dislikeData,
      isError: dislikeIsError,
      error: dislikeError,
      reset: dislikeReset,
    },
  ] = useDislikeBlogMutation();

  const isLike = blog?.likes?.filter(
    (likedUser) => likedUser?._id === user?._id
  );

  const isDislike = blog?.dislikes?.filter(
    (dislikedUser) => dislikedUser?._id === user?._id
  );

  if (blogIsLoading) {
    return <Loading />;
  }

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

  return (
    <>
      <Head title={`${blog?.title} ||`} />
      <div className="">
        <BreadCrumb title={blog?.title} />
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
                <h2 className="text-4xl font-bold">{blog?.title}</h2>
                <img
                  className="rounded-xl my-[15px] w-full md:h-[500px] border"
                  src={blog?.images[0]?.url}
                  alt="blog images"
                />
                <div
                  className="text-sm desc_show min-h-[80px]  border-b"
                  dangerouslySetInnerHTML={{
                    __html: blog?.description,
                  }}
                ></div>
                <div className="blog_about flex gap-[30px] my-[20px]">
                  <p className="date text-sm text-gray-500">
                    {new Date(blog?.date)?.getDate()},{" "}
                    {monthNames[new Date(blog?.date)?.getMonth()]}{" "}
                    {new Date(blog?.date)?.getFullYear()}{" "}
                  </p>
                  <p className="author text-sm text-gray-500">
                    Author: {blog?.author}{" "}
                  </p>
                </div>
                <div className="blog_footer flex justify-between border-y p-[15px] ">
                  <Link to="/blogs">
                    <p className="left_footer flex items-center gap-2 text-sm hover:underline">
                      <HiOutlineArrowNarrowLeft /> Back to blog
                    </p>
                  </Link>
                  <ul className="right_footer flex gap-3">
                    <li className="flex items-center">
                      <BiLike
                        className={isLike?.length > 0 && "text-[#131921]"}
                        onClick={() =>
                          likeBlog({ data: { blogId: blog?._id } })
                        }
                      />
                      ({blog?.likes?.length})
                    </li>
                    <li className="flex items-center">
                      <BiDislike
                        className={isDislike?.length > 0 && "text-[#131921]"}
                        onClick={() =>
                          dislikeBlog({ data: { blogId: blog?._id } })
                        }
                      />
                      ({blog?.dislikes?.length})
                    </li>
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

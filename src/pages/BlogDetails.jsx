import React from "react";
import BreadCrumb from "../components/BreadCrumb";
import Head from "../components/Head";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";
import { Link, useParams } from "react-router-dom";
import {
  useDislikeBlogMutation,
  useGetBlogQuery,
  useLikeBlogMutation,
  useUpdateBlogMutation,
} from "../redux/features/blog/blogApi";
import Loading from "../components/Loading";
import { BiLike, BiDislike } from "react-icons/bi";
import { useSelector } from "react-redux";
import * as Yup from "yup";
import { useFormik } from "formik";

const BlogDetails = () => {
  const params = useParams();
  const { user } = useSelector((state) => state.auth);
  const [likeBlog] = useLikeBlogMutation();
  const [dislikeBlog] = useDislikeBlogMutation();

  const { data: blogData, isLoading: blogIsLoading } = useGetBlogQuery(
    params?.id
  );
  const blog = blogData?.data;

  const [updateBlog] = useUpdateBlogMutation();

  const isLike = blog?.likes?.filter(
    (likedUser) => likedUser?._id === user?._id
  );

  const isDislike = blog?.dislikes?.filter(
    (dislikedUser) => dislikedUser?._id === user?._id
  );

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

  let formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().required("Email is required"),
    comment: Yup.string().required("Comment is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      comment: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      resetForm();
      updateBlog({
        id: blog._id,
        data: values,
      });
    },
  });

  const comments = blogData?.data?.comments;
  if (blogIsLoading || !Array.isArray(comments)) {
    return <Loading />;
  }

  const reversed = [...comments]?.reverse();

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
                  <ul className="right_footer flex gap-3 cursor-pointer">
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
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      className="md:w-[48%] w-full md:mr-[2%] p-2 mt-[20px] rounded-md"
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Name *"
                      required
                      onChange={formik.handleChange("name")}
                      value={formik.values.name}
                    />
                    <input
                      className="md:w-[48%] w-full md:ml-[2%] p-2 mt-[20px] rounded-md"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email *"
                      required
                      onChange={formik.handleChange("email")}
                      value={formik.values.email}
                    />
                    <textarea
                      className="w-full mt-[20px] p-2 rounded-md"
                      name="comment"
                      id="comment"
                      cols="30"
                      rows="4"
                      placeholder="Comment *"
                      onChange={formik.handleChange("comment")}
                      value={formik.values.comment}
                    ></textarea>
                    <button
                      type="submit"
                      className="first_button duration-300 rounded-md py-[8px] px-[20px] font-medium mt-2"
                    >
                      Post Comment
                    </button>
                  </form>
                  {reversed?.map((comment) => (
                    <div
                      key={comment?._id}
                      className="customer_review py-4 border-b"
                    >
                      <h3 className="review_title font-semibold">
                        {comment?.comment}
                      </h3>
                      <p className=" text-[14px] mt-1 ">
                        <span className="article">-- </span>
                        <span className="customer_name font-medium italic">
                          {comment?.name}
                        </span>
                      </p>
                    </div>
                  ))}
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

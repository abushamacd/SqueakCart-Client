import React, { useEffect } from "react";
import { Typography, Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
} from "../../redux/features/blog/blogApi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { setEdit, setView } from "../../redux/features/site/siteSlice";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import {
  setDeleteImages,
  setVisibility,
} from "../../redux/features/blog/blogSlice";

const BlogList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // hook
  const { data: blogData, isLoading: blogIsLoading } = useGetBlogsQuery();
  const blogs = blogData?.data?.data;

  const [
    deleteBlog,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteBlogMutation();
  const { view } = useSelector((state) => state.site);

  // handle

  const handleDelete = (blog) => {
    deleteBlog({ id: blog._id });
  };

  const openView = (blog) => {
    dispatch(setView({ data: blog, state: true }));
  };

  const openEdit = (blog) => {
    dispatch(setEdit({ data: blog, state: true }));
    dispatch(setVisibility(blog?.visibility));
    dispatch(setDeleteImages(blog?.images));
    navigate("/admin/blog-edit");
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  const { Title } = Typography;
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author",
    },
    {
      title: "Views",
      dataIndex: "views",
      key: "views",
    },
    {
      title: "Like",
      dataIndex: "like",
      key: "like",
    },
    {
      title: "Dislikes",
      dataIndex: "dislike",
      key: "dislike",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const tableData = [];
  for (let i = 0; i < blogs?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: blogs[i]?.title,
      author: blogs[i]?.author,
      views: blogs[i]?.views,
      like: blogs[i]?.likes.length,
      dislike: blogs[i]?.dislikes.length,
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(blogs[i])}
            size={22}
            className="text-green-700"
          />
          <FiEdit
            onClick={() => openEdit(blogs[i])}
            size={22}
            className="text-orange-400"
          />
          <MdDeleteForever
            onClick={() => handleDelete(blogs[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // notification
  useEffect(() => {
    if (deleteIsSuccess) {
      toast(deleteData?.message);
      deleteReset();
    } else if (deleteIsError) {
      toast.error(deleteError?.data?.message);
      deleteReset();
    }
  }, [deleteData, deleteError, deleteIsError, deleteIsSuccess, deleteReset]);

  if (blogIsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3}>Blog List</Title>
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <Title className="capitalize" level={5}>
          recent orders
        </Title>
        <Table columns={columns} dataSource={tableData} />
      </div>
      {/* View Modal */}
      <Modal
        className="large_modal"
        title={`Blog ID: ${view.data?._id}`}
        open={view.viewState}
        centered
        footer={null}
        onCancel={closeView}
      >
        <div className="blog_details">
          <h2 className="text-xl font-bold">{view.data?.title}</h2>
          <img
            className="rounded-xl my-[15px] w-full h-[300px] border"
            src={view.data?.images[0]?.url}
            alt="blog images"
          />
          <div
            className="text-sm desc_show"
            dangerouslySetInnerHTML={{ __html: view.data?.description }}
          ></div>
          <div className="blog_about flex gap-[30px] my-[20px] felx flex-wrap">
            <p className="date text-sm text-gray-500"> {view.data?.date}</p>
            <p className="author text-sm text-gray-500 capitalize">
              {view.data?.author}
            </p>
            <p className="author text-sm text-gray-500 capitalize">
              Visibility: {view.data?.visibility}
            </p>
            <p className="cat text-sm text-gray-500 capitalize">
              Categories:
              {view.data?.category.map((cat, i) => {
                return (
                  <span
                    key={i}
                    className="cat text-sm text-gray-500 ml-1 capitalize"
                  >
                    {cat?.title},
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BlogList;

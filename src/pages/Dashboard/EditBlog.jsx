import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { Typography, Radio, Space } from "antd";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/EditorToolbar";
import { AiOutlineDelete } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  setUploadImages,
  setVisibility,
  setDeleteImages,
  clearImage,
  setCategory,
  setDate,
} from "../../redux/features/blog/blogSlice";
import {
  useDeleteBlogImageMutation,
  useGetBlogCatsQuery,
  useUpdateBlogMutation,
  useUploadBlogImageMutation,
} from "../../redux/features/blog/blogApi";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { setEdit } from "../../redux/features/site/siteSlice";
import { useNavigate } from "react-router-dom";
import { Select } from "antd";
import { DatePicker } from "antd";
import dayjs from "dayjs";

const EditBlog = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dateFormat = "YYYY/MM/DD";

  // Redux Hooks
  const { edit } = useSelector((state) => state.site);
  const blog = edit?.data;
  console.log(blog);

  const { visibility, date, blogImages, category } = useSelector(
    (state) => state.blog
  );
  const { data: blogCatData, isLoading: blogCatIsLoading } =
    useGetBlogCatsQuery();
  const blogCats = blogCatData?.data?.data;

  const [
    uploadBlogImage,
    {
      isLoading: imageUploadIsLoading,
      data: imageUploadData,
      reset: imageUploadReset,
    },
  ] = useUploadBlogImageMutation();

  const [deleteBlogImage, { isLoading: imageDeleteIsLoading }] =
    useDeleteBlogImageMutation();

  const [
    updateBlog,
    {
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateBlogMutation();

  // Handle Action
  const handleImgUpload = (image) => {
    const formData = new FormData();
    image.forEach((image) => {
      formData.append("images", image);
    });
    uploadBlogImage(formData);
  };

  const handleImgDelete = (id) => {
    deleteBlogImage(id);
    const rest = blogImages.filter((img) => img.public_id !== id);
    dispatch(setDeleteImages(rest));
  };

  const handleDate = (date, dateString) => {
    dispatch(setDate(dateString));
  };

  // Data Processing
  const categoryOptions = [];
  blogCats?.forEach((cat) => {
    categoryOptions.push({
      value: cat._id,
      label: cat.title,
    });
  });

  const editCategory = [];
  blog?.category?.forEach((category) => {
    editCategory.push(category._id);
  });

  // Handle Form
  let blogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    visibility: Yup.string().required("visibility is required"),
    date: Yup.string().required("Please clear & re-select date"),
    category: Yup.array()
      .min(1, "Please clear & re-select minimum one category")
      .required("Please clear & re-select"),
  });

  const updateForm = useFormik({
    initialValues: {
      title: blog?.title,
      description: blog?.description,
      visibility: visibility,
      category: editCategory,
      date: date,
      images: "",
    },
    validationSchema: blogSchema,
    onSubmit: (values, { resetForm }) => {
      updateBlog({ id: blog?._id, data: values });
      dispatch(setEdit({ data: null, state: false }));
      dispatch(setVisibility("published"));
      dispatch(clearImage());
    },
  });

  // Notification
  useEffect(() => {
    updateForm.values.visibility = visibility;
    updateForm.values.images = blogImages;
    updateForm.values.category = category;
    updateForm.values.date = date;
    if (updateIsSuccess) {
      toast(updateData?.message);
      updateReset();
      navigate("/admin/blog-list");
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
      updateReset();
    }
  }, [
    visibility,
    blogImages,
    category,
    date,
    navigate,
    updateForm.values,
    updateIsSuccess,
    updateIsError,
    updateData,
    updateError,
    updateReset,
  ]);

  // Handle Image
  useEffect(() => {
    if (imageUploadData) {
      dispatch(setUploadImages(imageUploadData?.data[0]));
      imageUploadReset();
    }
  }, [dispatch, imageUploadData, imageUploadReset]);

  return (
    <div>
      <div className="flex justify-between">
        <Title level={3}>Edit Blog</Title>
        <button
          type="submit"
          onClick={updateForm.handleSubmit}
          className="first_button rounded-md px-5 py-2 text-sm text-white uppercase"
        >
          Save
        </button>
      </div>
      <div className="md:flex justify-between mt-[20px] blog">
        <div className="bg-white box_shadow p-[20px] rounded-lg  md:w-[70%] md:mb-0 mb-[20px] ">
          <Title level={4}>Blog Details</Title>
          <form className="mt-4" onSubmit={updateForm.handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label htmlFor="blogName" className=" font-bold text-sm">
                Blog Title
              </label>
              <input
                onChange={updateForm.handleChange("title")}
                value={updateForm.values.title}
                placeholder="Blog Title"
                type="text"
                id="blogName"
                name="blogName"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {updateForm.touched.title && updateForm.errors.title ? (
                <div className="formik_err text-sm text-red-600">
                  {updateForm.errors.title}
                </div>
              ) : null}
            </div>
            {/* desc */}
            <div className="mb-4 ">
              <label htmlFor="desc" className=" font-bold text-sm">
                Description
              </label>
              <div className="mt-2">
                <EditorToolbar toolbarId={"t1"} />
                <ReactQuill
                  theme="snow"
                  onChange={updateForm.handleChange("description")}
                  value={updateForm.values.description}
                  placeholder={"Write something..."}
                  modules={modules("t1")}
                  formats={formats}
                />
                {updateForm.touched.description &&
                updateForm.errors.description ? (
                  <div className="formik_err text-sm text-red-600">
                    {updateForm.errors.description}
                  </div>
                ) : null}
              </div>
            </div>
          </form>
        </div>
        <div className="md:w-[28%]">
          <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Visibility</Title>
            <Radio.Group
              className="my-4"
              onChange={(e) => dispatch(setVisibility(e.target.value))}
              defaultValue={blog?.visibility}
              value={visibility}
            >
              <Space direction="vertical">
                <Radio value="published">Published</Radio>
                <Radio value="scheduled">Scheduled</Radio>
                <Radio value="hidden">Hidden</Radio>
              </Space>
            </Radio.Group>
            {updateForm.touched.visibility && updateForm.errors.visibility ? (
              <div className="formik_err text-sm text-red-600">
                {updateForm.errors.visibility}
              </div>
            ) : null}
            <h5 className="mb-2 font-bold text-sm">Publish date</h5>
            <div>
              <DatePicker
                defaultValue={dayjs(blog?.date, dateFormat)}
                format={dateFormat}
                className="w-full h-[40px]"
                onChange={handleDate}
              />
              {updateForm.touched.date && updateForm.errors.date ? (
                <div className="formik_err text-sm text-red-600">
                  {updateForm.errors.date}
                </div>
              ) : null}
            </div>
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Blog Category</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="multiple"
              allowClear
              defaultValue={editCategory}
              placeholder="Please select"
              onChange={(e) => dispatch(setCategory(e))}
              options={categoryOptions}
            />
            {blogCatIsLoading && <Spin size="large" />}
            {updateForm.touched.category && updateForm.errors.category ? (
              <div className="addForm_err text-sm text-red-600">
                {updateForm.errors.category}
              </div>
            ) : null}
          </div>
          <div className="blog_picture mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <div className="flex justify-between items-center">
              <Title level={4}>Blog Picture</Title>
              <div onClick={() => dispatch(clearImage())}>
                <h6 className="text-red-600 cursor-pointer">Clear</h6>
              </div>
            </div>
            <div className="show_upload_images mt-4 flex flex-wrap">
              {blogImages?.map((image, i) => (
                <div key={i} className="relative w-[50%] p-1">
                  <button
                    onClick={() => handleImgDelete(image?.public_id)}
                    className="absolute right-1 top-1 duration-300 bg-white p-1 rounded-full"
                  >
                    <AiOutlineDelete color="red" />
                  </button>
                  <img
                    className=" rounded-md md:h-[120px] h-[110px] md:w-[120px] w-[110px]  object-cover"
                    alt="product img"
                    src={image?.url}
                  />
                </div>
              ))}
              {(imageUploadIsLoading || imageDeleteIsLoading) && (
                <Spin size="large" />
              )}
            </div>
            <div className="mt-4 border rounded-md text-center p-4">
              <Dropzone
                onDrop={(acceptedFiles) => handleImgUpload(acceptedFiles)}
              >
                {({ getRootProps, getInputProps }) => (
                  <section>
                    <div {...getRootProps()}>
                      <input {...getInputProps()} />
                      <p>Upload Image</p>
                    </div>
                  </section>
                )}
              </Dropzone>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;

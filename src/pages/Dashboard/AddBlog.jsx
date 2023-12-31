import React from "react";
import { Typography, DatePicker, Radio, Space, Select } from "antd";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/EditorToolbar";
import Dropzone from "react-dropzone";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import {
  useCreateBlogMutation,
  useDeleteBlogImageMutation,
  useGetBlogCatsQuery,
  useUploadBlogImageMutation,
} from "../../redux/features/blog/blogApi";
import {
  setCategory,
  setDate,
  setUploadImages,
  setVisibility,
  setDeleteImages,
  clearImage,
} from "../../redux/features/blog/blogSlice";
import { Spin } from "antd";

const AddBlog = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  // Redux Hooks
  const { data: getData, isLoading: getIsLoading } = useGetBlogCatsQuery();
  const blogCats = getData?.data?.data;

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

  const { category, date, visibility, blogImages } = useSelector(
    (state) => state.blog
  );

  const [
    createBlog,
    {
      isSuccess: createIsSuccess,
      data: createData,
      isError: createIsError,
      error: createError,
      reset: createReset,
    },
  ] = useCreateBlogMutation();

  // Handle Action
  const handleDate = (date, dateString) => {
    dispatch(setDate(dateString));
  };

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

  // Data Processing
  const categoryOptions = [];
  blogCats?.forEach((cat) => {
    categoryOptions.push({
      value: cat._id,
      label: cat.title,
    });
  });

  // Handle Form
  let blogSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    visibility: Yup.string().required("visibility is required"),
    date: Yup.string().required("date is required"),
    category: Yup.array()
      .min(1, "Pick at least one category")
      .required("category is Required"),
    images: Yup.array().required("Image is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
      description: "",
      visibility: visibility,
      date: date,
      category: category,
      images: "",
    },

    validationSchema: blogSchema,

    onSubmit: (values, { resetForm }) => {
      createBlog(values);
      resetForm();
    },
  });

  // Notification
  useEffect(() => {
    addForm.values.category = category;
    addForm.values.visibility = visibility;
    addForm.values.date = date;
    addForm.values.images = blogImages;
    if (createIsSuccess) {
      toast(createData?.message);
      createReset();
    } else if (createIsError) {
      toast.error(createError?.data?.message);
      createReset();
    }
  }, [
    category,
    visibility,
    blogImages,
    date,
    addForm.values,
    createIsSuccess,
    createIsError,
    createData,
    createError,
    createReset,
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
        <Title level={3}>Add Blog</Title>
        <button
          type="submit"
          onClick={addForm.handleSubmit}
          className="first_button rounded-md px-5 py-2 text-sm text-white uppercase"
        >
          Save
        </button>
      </div>
      <div className="md:flex justify-between mt-[20px] blog">
        <div className="bg-white box_shadow p-[20px] rounded-lg  md:w-[70%] md:mb-0 mb-[20px] ">
          <Title level={4}>Blog Details</Title>
          <form className="mt-4" onSubmit={addForm.handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label htmlFor="blogName" className=" font-bold text-sm">
                Blog Title
              </label>
              <input
                onChange={addForm.handleChange("title")}
                value={addForm.values.title}
                placeholder="Blog Title"
                type="text"
                id="blogName"
                name="blogName"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {addForm.touched.title && addForm.errors.title ? (
                <div className="formik_err text-sm text-red-600">
                  {addForm.errors.title}
                </div>
              ) : null}
            </div>
            {/* desc */}
            <div className="md:mb-0 mb-4 ">
              <label htmlFor="desc" className=" font-bold text-sm">
                Description
              </label>
              <div className="mt-2">
                <EditorToolbar toolbarId={"t1"} />
                <ReactQuill
                  className="h-[283px] "
                  theme="snow"
                  onChange={addForm.handleChange("description")}
                  value={addForm.values.description}
                  placeholder={"Write something..."}
                  modules={modules("t1")}
                  formats={formats}
                />
                {addForm.touched.description && addForm.errors.description ? (
                  <div className="formik_err text-sm text-red-600">
                    {addForm.errors.description}
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
              defaultValue="published"
              value={visibility}
            >
              <Space direction="vertical">
                <Radio value="published">Published</Radio>
                <Radio value="scheduled">Scheduled</Radio>
                <Radio value="hidden">Hidden</Radio>
              </Space>
            </Radio.Group>
            {addForm.touched.visibility && addForm.errors.visibility ? (
              <div className="formik_err text-sm text-red-600">
                {addForm.errors.visibility}
              </div>
            ) : null}
            <h5 className="mb-2 font-bold text-sm">Publish date</h5>
            <div>
              <DatePicker className="w-full h-[40px]" onChange={handleDate} />
              {addForm.touched.date && addForm.errors.date ? (
                <div className="formik_err text-sm text-red-600">
                  {addForm.errors.date}
                </div>
              ) : null}
            </div>
          </div>
          <div className="blog_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Blog Category</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="multiple"
              allowClear
              placeholder="Please select"
              onChange={(e) => dispatch(setCategory(e))}
              options={categoryOptions}
            />
            {getIsLoading && <Spin size="large" />}
            {addForm.touched.category && addForm.errors.category ? (
              <div className="formik_err text-sm text-red-600">
                {addForm.errors.category}
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
                    className=" rounded-md md:h-[120px] h-[110px] md:w-[120px] w-[110px] object-cover"
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

export default AddBlog;

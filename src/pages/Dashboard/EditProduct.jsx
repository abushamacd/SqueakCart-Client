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
  setDeleteImages,
  clearImage,
} from "../../redux/features/product/productSlice";
import {
  useDeleteProductImageMutation,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/features/product/productApi";
import { Spin } from "antd";
import { toast } from "react-toastify";
import { setEdit } from "../../redux/features/site/siteSlice";
import { useNavigate } from "react-router-dom";
import { useGetProCatsQuery } from "../../redux/features/proCat/proCatApi";

const EditProduct = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Hooks
  const { edit } = useSelector((state) => state.site);
  const product = edit?.data;

  const { visibility, productImages } = useSelector((state) => state.product);
  const { data: getData } = useGetProCatsQuery();

  const productCats = getData?.data?.data;

  const [
    uploadProductImage,
    {
      isLoading: imageUploadIsLoading,
      data: imageUploadData,
      reset: imageUploadReset,
    },
  ] = useUploadProductImageMutation();

  const [deleteProductImage, { isLoading: imageDeleteIsLoading }] =
    useDeleteProductImageMutation();

  const [
    updateProduct,
    {
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateProductMutation();

  // Handle Action
  const handleImgUpload = (image) => {
    const formData = new FormData();
    image.forEach((image) => {
      formData.append("images", image);
    });
    uploadProductImage(formData);
  };

  const handleImgDelete = (id) => {
    deleteProductImage(id);
    const rest = productImages.filter((img) => img.public_id !== id);
    dispatch(setDeleteImages(rest));
  };

  // Data Processing
  const categoryOptions = [];
  productCats?.forEach((cat) => {
    categoryOptions.push({
      value: cat._id,
      label: cat.title,
    });
  });

  // Handle Form
  let productSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    visibility: Yup.string().required("visibility is required"),
  });

  const updateForm = useFormik({
    initialValues: {
      title: product?.title,
      description: product?.description,
      visibility: visibility,
      images: "",
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      updateProduct({ id: product?._id, data: values });
      dispatch(setEdit({ data: null, state: false }));
      dispatch(setDeleteImages([]));
    },
  });

  // Notification
  useEffect(() => {
    updateForm.values.visibility = visibility;
    updateForm.values.images = productImages;
    if (updateIsSuccess) {
      toast(updateData?.message);
      updateReset();
      navigate("/admin/product-list");
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
      updateReset();
    }
  }, [
    visibility,
    productImages,
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
        <Title level={3}>Edit Product</Title>
        <button
          type="submit"
          onClick={updateForm.handleSubmit}
          className="first_button rounded-md px-5 py-2 text-sm text-white uppercase"
        >
          Save
        </button>
      </div>
      <div className="md:flex justify-between mt-[20px] product">
        <div className="bg-white box_shadow p-[20px] rounded-lg  md:w-[70%] md:mb-0 mb-[20px] ">
          <Title level={4}>Product Details</Title>
          <form className="mt-4" onSubmit={updateForm.handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label htmlFor="productName" className=" font-bold text-sm">
                Product Title
              </label>
              <input
                onChange={updateForm.handleChange("title")}
                value={updateForm.values.title}
                placeholder="Product Title"
                type="text"
                id="productName"
                name="productName"
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
                  className=""
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
              defaultValue={product?.visibility}
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
          </div>
          <div className="product_picture mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <div className="flex justify-between items-center">
              <Title level={4}>Product Picture</Title>
              <div onClick={() => dispatch(clearImage())}>
                <h6 className="text-red-600 cursor-pointer">Clear</h6>
              </div>
            </div>
            <div className="show_upload_images mt-4 flex flex-wrap">
              {productImages?.map((image, i) => (
                <div key={i} className="relative w-[50%] p-1">
                  <button
                    onClick={() => handleImgDelete(image?.public_id)}
                    className="absolute right-1 top-1 duration-300 bg-white p-1 rounded-full"
                  >
                    <AiOutlineDelete color="red" />
                  </button>
                  <img
                    className=" rounded-md"
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

export default EditProduct;

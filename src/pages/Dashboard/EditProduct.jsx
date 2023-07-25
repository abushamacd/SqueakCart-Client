import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Dropzone from "react-dropzone";
import { Typography, Select } from "antd";
import ReactQuill from "react-quill";
import EditorToolbar, {
  modules,
  formats,
} from "../../components/EditorToolbar";
import { AiOutlineDelete } from "react-icons/ai";
import { useFormik } from "formik";
import * as Yup from "yup";
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
import { useGetBrandsQuery } from "../../redux/features/brand/brandApi";
import { useGetColorsQuery } from "../../redux/features/color/colorApi";
import {
  setColor,
  setTag,
  setCategory,
  setUploadImages,
  setDeleteImages,
  clearImage,
} from "../../redux/features/product/productSlice";

const EditProduct = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Hooks
  const { edit } = useSelector((state) => state.site);
  const product = edit?.data;

  const { category, tag, color, productImages } = useSelector(
    (state) => state.product
  );
  const { data: proCatData, isLoading: proCatIsLoading } = useGetProCatsQuery();
  const proCats = proCatData?.data?.data;

  const { data: brandData, isLoading: brandIsLoading } = useGetBrandsQuery();
  const brands = brandData?.data?.data;

  const { data: colorData, isLoading: colorIsLoading } = useGetColorsQuery();
  const colors = colorData?.data?.data;

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
  proCats?.forEach((cat) => {
    categoryOptions.push({
      value: cat._id,
      label: cat.title,
    });
  });

  const tagOptions = [];
  tagOptions.push(
    {
      value: "featured",
      label: "Featured",
    },
    {
      value: "special",
      label: "Special",
    },
    {
      value: "new-arrivals",
      label: "New Arrivals",
    },
    {
      value: "best-selling",
      label: "Best Selling",
    }
  );

  const brandOptions = [];
  brands?.forEach((brand) => {
    brandOptions.push({
      value: brand._id,
      label: brand.title,
    });
  });

  const statusOptions = [];
  statusOptions.push(
    {
      value: "available",
      label: "Available",
    },
    {
      value: "unavailable",
      label: "Unavailable",
    }
  );

  const colorOptions = [];
  colors?.forEach((color) => {
    colorOptions.push({
      value: color._id,
      label: color.title,
    });
  });

  const editCategory = [];
  product?.category?.forEach((category) => {
    editCategory.push(category._id);
  });

  const editTag = [];
  product?.tag?.forEach((tag) => {
    editTag.push(tag);
  });

  const editColor = [];
  product?.color?.forEach((color) => {
    editColor.push(color._id);
  });

  // Handle Form
  let productSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("price is required"),
    quantity: Yup.number().required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.array()
      .min(1, "Please clear & re-select minimum one category")
      .required("Please clear & re-select"),
    tag: Yup.array()
      .min(1, "Please clear & re-select minimum one tag")
      .required("Please clear & re-select"),
    brand: Yup.string().required("brand is required"),
    status: Yup.string().required("Status is required"),
    color: Yup.array()
      .min(1, "Please clear & re-select minimum one color")
      .required("Please clear & re-select"),
    images: Yup.array().required("Image is required"),
  });

  const updateForm = useFormik({
    initialValues: {
      title: product?.title,
      description: product?.description,
      price: product?.price,
      quantity: product?.quantity,
      category: editCategory,
      tag: editTag,
      brand: product?.brand?._id,
      status: product?.status,
      color: editColor,
      images: "",
    },
    validationSchema: productSchema,
    onSubmit: (values, { resetForm }) => {
      updateProduct({ id: product?._id, data: values });
      dispatch(setEdit({ data: null, state: false }));
      dispatch(clearImage());
    },
  });

  // Notification

  useEffect(() => {
    updateForm.values.category = category;
    updateForm.values.tag = tag;
    updateForm.values.color = color;
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
    productImages,
    navigate,
    updateForm.values,
    updateIsSuccess,
    updateIsError,
    updateData,
    updateError,
    updateReset,
    category,
    tag,
    color,
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
            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="font-bold text-sm">
                Product Price
              </label>
              <input
                onChange={updateForm.handleChange("price")}
                value={updateForm.values.price}
                placeholder="Product Price"
                type="number"
                id="price"
                name="price"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {updateForm.touched.price && updateForm.errors.price ? (
                <div className="addForm_err text-sm text-red-600">
                  {updateForm.errors.price}
                </div>
              ) : null}
            </div>
            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className=" font-bold text-sm">
                Product Quantity
              </label>
              <input
                onChange={updateForm.handleChange("quantity")}
                value={updateForm.values.quantity}
                placeholder="Product Quantity"
                type="number"
                id="quantity"
                name="quantity"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {updateForm.touched.quantity && updateForm.errors.quantity ? (
                <div className="addForm_err text-sm text-red-600">
                  {updateForm.errors.quantity}
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
                  className="md:h-[826px] "
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
          <div className="product_cat bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Category</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="multiple"
              allowClear
              defaultValue={editCategory}
              placeholder="Please select"
              onChange={(e) => dispatch(setCategory(e))}
              options={categoryOptions}
            />
            {proCatIsLoading && <Spin size="large" />}
            {updateForm.touched.category && updateForm.errors.category ? (
              <div className="addForm_err text-sm text-red-600">
                {updateForm.errors.category}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Tags</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="tags"
              allowClear
              defaultValue={editTag}
              placeholder="Please select"
              onChange={(e) => dispatch(setTag(e))}
              options={tagOptions}
            />
            {updateForm.touched.tag && updateForm.errors.tag ? (
              <div className="addForm_err text-sm text-red-600">
                {updateForm.errors.tag}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Brand</Title>
            <Select
              placeholder="Please select"
              className="mt-4 h-[40px] w-full capitalize"
              onChange={updateForm.handleChange("brand")}
              value={updateForm.values.brand}
              options={brandOptions}
            />
            {brandIsLoading && <Spin size="large" />}
            {updateForm.touched.brand && updateForm.errors.brand ? (
              <div className="addForm_err text-sm text-red-600">
                {updateForm.errors.brand}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Status</Title>
            <Select
              placeholder="Please select"
              className="mt-4 h-[40px] w-full capitalize"
              onChange={updateForm.handleChange("status")}
              value={updateForm.values.status}
              options={statusOptions}
            />
            {updateForm.touched.status && updateForm.errors.status ? (
              <div className="addForm_err text-sm text-red-600">
                {updateForm.errors.status}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Color</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="multiple"
              allowClear
              defaultValue={editColor}
              placeholder="Please select"
              onChange={(e) => dispatch(setColor(e))}
              options={colorOptions}
            />
            {colorIsLoading && <Spin size="large" />}
            {updateForm.touched.color && updateForm.errors.color ? (
              <div className="addForm_err text-sm text-red-600">
                {updateForm.errors.color}
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

export default EditProduct;

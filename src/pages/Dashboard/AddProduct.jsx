import React from "react";
import { Typography, Select } from "antd";
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
  useCreateProductMutation,
  useDeleteProductImageMutation,
  useUploadProductImageMutation,
} from "../../redux/features/product/productApi";
import {
  setCategory,
  setUploadImages,
  setDeleteImages,
  clearImage,
} from "../../redux/features/product/productSlice";
import { Spin } from "antd";
import { setColor, setTag } from "../../redux/features/product/productSlice";
import { useGetBrandsQuery } from "../../redux/features/brand/brandApi";
import { useGetColorsQuery } from "../../redux/features/color/colorApi";
import { useGetProCatsQuery } from "../../redux/features/proCat/proCatApi";

const AddProduct = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();

  // Redux Hooks
  const { data: proCatData, isLoading: proCatIsLoading } = useGetProCatsQuery();
  const proCats = proCatData?.data?.data;

  const { data: brandData, isLoading: brandIsLoading } = useGetBrandsQuery();
  const brands = brandData?.data?.data;

  const { data: colorData, isLoading: colorIsLoading } = useGetColorsQuery();
  const colors = colorData?.data?.data;

  const { category, tag, color, productImages } = useSelector(
    (state) => state.product
  );

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
    createProduct,
    {
      isSuccess: createIsSuccess,
      data: createData,
      isError: createIsError,
      error: createError,
      reset: createReset,
    },
  ] = useCreateProductMutation();

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

  // Handle Form
  let productSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("price is required"),
    quantity: Yup.number().required("Quantity is required"),
    description: Yup.string().required("Description is required"),
    category: Yup.array()
      .min(1, "Pick at least one category")
      .required("category is Required"),
    tag: Yup.array()
      .min(1, "Pick at least one tag")
      .required("tag is Required"),
    brand: Yup.string().required("brand is required"),
    status: Yup.string().required("Status is required"),
    color: Yup.array()
      .min(1, "Pick at least one color")
      .required("Color is Required"),
    images: Yup.array().required("Image is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
      price: 0,
      quantity: 0,
      description: "",
      category: category,
      tag: tag,
      brand: "",
      status: "",
      color: color,
      images: "",
    },

    validationSchema: productSchema,

    onSubmit: (values) => {
      createProduct(values);
    },
  });

  // Notification
  useEffect(() => {
    addForm.values.category = category;
    addForm.values.tag = tag;
    addForm.values.color = color;
    addForm.values.images = productImages;
    if (createIsSuccess) {
      toast(createData?.message);
      createReset();
      addForm.resetForm();
    } else if (createIsError) {
      toast.error(createError?.data?.message);
      createReset();
    }
  }, [
    category,
    productImages,
    tag,
    color,
    addForm,
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
        <Title level={3}>Add Product</Title>
        <button
          type="submit"
          onClick={addForm.handleSubmit}
          className="first_button rounded-md px-5 py-2 text-sm text-white uppercase"
        >
          Save
        </button>
      </div>
      <div className="md:flex justify-between mt-[20px] product">
        <div className="bg-white box_shadow p-[20px] rounded-lg  md:w-[70%] md:mb-0 mb-[20px] ">
          <Title level={4}>Product Details</Title>
          <form className="mt-4" onSubmit={addForm.handleSubmit}>
            {/* name */}
            <div className="mb-4">
              <label htmlFor="productName" className=" font-bold text-sm">
                Product Title
              </label>
              <input
                onChange={addForm.handleChange("title")}
                value={addForm.values.title}
                placeholder="Product Title"
                type="text"
                id="productName"
                name="productName"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {addForm.touched.title && addForm.errors.title ? (
                <div className="addForm_err text-sm text-red-600">
                  {addForm.errors.title}
                </div>
              ) : null}
            </div>
            {/* Price */}
            <div className="mb-4">
              <label htmlFor="price" className="font-bold text-sm">
                Product Price
              </label>
              <input
                onChange={addForm.handleChange("price")}
                value={addForm.values.price}
                placeholder="Product Price"
                type="number"
                id="price"
                name="price"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {addForm.touched.price && addForm.errors.price ? (
                <div className="addForm_err text-sm text-red-600">
                  {addForm.errors.price}
                </div>
              ) : null}
            </div>
            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className=" font-bold text-sm">
                Product Quantity
              </label>
              <input
                onChange={addForm.handleChange("quantity")}
                value={addForm.values.quantity}
                placeholder="Product Quantity"
                type="number"
                id="quantity"
                name="quantity"
                className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
              />
              {addForm.touched.quantity && addForm.errors.quantity ? (
                <div className="addForm_err text-sm text-red-600">
                  {addForm.errors.quantity}
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
                  className="h-[403px]"
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
          <div className="product_cat bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Category</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="multiple"
              allowClear
              placeholder="Please select"
              onChange={(e) => dispatch(setCategory(e))}
              options={categoryOptions}
            />
            {proCatIsLoading && <Spin size="large" />}
            {addForm.touched.category && addForm.errors.category ? (
              <div className="addForm_err text-sm text-red-600">
                {addForm.errors.category}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Tags</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="tags"
              allowClear
              placeholder="Please select"
              onChange={(e) => dispatch(setTag(e))}
              options={tagOptions}
            />
            {addForm.touched.tag && addForm.errors.tag ? (
              <div className="addForm_err text-sm text-red-600">
                {addForm.errors.tag}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Brand</Title>
            <Select
              placeholder="Please select"
              className="mt-4 h-[40px] w-full capitalize"
              onChange={addForm.handleChange("brand")}
              value={addForm.values.brand}
              options={brandOptions}
            />
            {brandIsLoading && <Spin size="large" />}
            {addForm.touched.brand && addForm.errors.brand ? (
              <div className="addForm_err text-sm text-red-600">
                {addForm.errors.brand}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Status</Title>
            <Select
              placeholder="Please select"
              className="mt-4 h-[40px] w-full capitalize"
              onChange={addForm.handleChange("status")}
              value={addForm.values.status}
              options={statusOptions}
            />
            {addForm.touched.status && addForm.errors.status ? (
              <div className="addForm_err text-sm text-red-600">
                {addForm.errors.status}
              </div>
            ) : null}
          </div>
          <div className="product_cat mt-4 bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Product Color</Title>
            <Select
              className="mt-4 h-[40px] w-full capitalize"
              mode="multiple"
              allowClear
              placeholder="Please select"
              onChange={(e) => dispatch(setColor(e))}
              options={colorOptions}
            />
            {colorIsLoading && <Spin size="large" />}
            {addForm.touched.color && addForm.errors.color ? (
              <div className="addForm_err text-sm text-red-600">
                {addForm.errors.color}
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

export default AddProduct;

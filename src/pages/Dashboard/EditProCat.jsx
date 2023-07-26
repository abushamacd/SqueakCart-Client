import React, { useEffect } from "react";
import { Spin, Typography } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import {
  useDeleteProCatImageMutation,
  useUpdateProCatMutation,
  useUploadProCatImageMutation,
} from "../../redux/features/proCat/proCatApi";
import {
  clearImage,
  setDeleteImages,
  setUploadImages,
} from "../../redux/features/proCat/proCatSlice";
import { AiOutlineDelete } from "react-icons/ai";
import Dropzone from "react-dropzone";

const EditProCat = () => {
  const { Title } = Typography;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Redux Hooks
  const { edit } = useSelector((state) => state.site);
  const { proCatImages } = useSelector((state) => state.proCat);

  const [
    updateProCat,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateProCatMutation();

  const [
    uploadProCatImage,
    {
      isLoading: imageUploadIsLoading,
      data: imageUploadData,
      reset: imageUploadReset,
    },
  ] = useUploadProCatImageMutation();

  const [deleteProCatImage, { isLoading: imageDeleteIsLoading }] =
    useDeleteProCatImageMutation();

  // Handle Action
  const handleImgUpload = (image) => {
    const formData = new FormData();
    image.forEach((image) => {
      formData.append("images", image);
    });
    uploadProCatImage(formData);
  };

  const handleImgDelete = (id) => {
    deleteProCatImage(id);
    const rest = proCatImages.filter((img) => img.public_id !== id);
    dispatch(setDeleteImages(rest));
  };

  // Handle Form
  let couponSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    images: Yup.array().required("Image is required"),
  });

  const updateform = useFormik({
    initialValues: {
      title: edit?.data?.title,
      images: "",
    },
    validationSchema: couponSchema,

    onSubmit: (values) => {
      updateProCat({ id: edit?.data?._id, data: values });
    },
  });

  // Notification
  useEffect(() => {
    updateform.values.images = proCatImages;
    if (updateIsSuccess) {
      toast(updateData?.message);
      updateform.resetForm();
      updateReset();
      navigate("/admin/pro-cat");
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
      updateReset();
    }
  }, [
    updateform,
    proCatImages,
    navigate,
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

  if (updateIsLoading) {
    return <Loading />;
  }
  return (
    <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
      <Title level={4}>Edit Blog Category</Title>
      <form onSubmit={updateform.handleSubmit}>
        <div className="my-4">
          <label htmlFor="couponName" className=" font-bold text-sm">
            Category Name
          </label>
          <input
            onChange={updateform.handleChange("title")}
            value={updateform.values.title}
            placeholder="Coupon name"
            type="text"
            id="couponName"
            name="couponName"
            className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
          />
          {updateform.touched.title && updateform.errors.title ? (
            <div className="formik_err text-sm text-red-600">
              {updateform.errors.title}
            </div>
          ) : null}
        </div>
        <div className="product_picture my-4">
          <div className="flex justify-between items-center">
            <h1 className="font-bold text-sm">Product Category Picture</h1>
            <div onClick={() => dispatch(clearImage())}>
              <h6 className="text-red-600 cursor-pointer">Clear</h6>
            </div>
          </div>
          <div className="show_upload_images mt-4 flex flex-wrap">
            {proCatImages?.map((image, i) => (
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
        <button
          type="submit"
          className="first_button rounded-md px-5 py-1 text-sm text-white uppercase"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProCat;

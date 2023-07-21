import React, { useEffect } from "react";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useUpdateBrandMutation } from "../../redux/features/brand/brandApi";

const EditBrand = () => {
  const { Title } = Typography;
  const navigate = useNavigate();

  // Redux Hooks
  const { edit } = useSelector((state) => state.site);

  const [
    updateBrand,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateBrandMutation();

  // Handle Form
  let couponSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
  });

  const updateform = useFormik({
    initialValues: {
      title: edit?.data?.title,
    },
    validationSchema: couponSchema,

    onSubmit: (values) => {
      updateBrand({ id: edit?.data?._id, data: values });
    },
  });

  // Notification
  useEffect(() => {
    if (updateIsSuccess) {
      toast(updateData?.message);
      updateform.resetForm();
      updateReset();
      navigate("/admin/brand");
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
      updateReset();
    }
  }, [
    updateform,
    navigate,
    updateIsSuccess,
    updateIsError,
    updateData,
    updateError,
    updateReset,
  ]);

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

export default EditBrand;

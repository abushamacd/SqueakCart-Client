import React, { useEffect } from "react";
import { Typography } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "antd";
import { setDate } from "../../redux/features/coupon/couponSlice";
import { useUpdateCouponMutation } from "../../redux/features/coupon/couponApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

const EditCoupon = () => {
  const { Title } = Typography;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux Hooks
  const { date } = useSelector((state) => state.coupon);
  const { edit } = useSelector((state) => state.site);

  const [
    updateCoupon,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateCouponMutation();

  // Handle Action
  const handleDate = (date, dateString) => {
    dispatch(setDate(dateString));
  };

  // Handle Form
  let couponSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    discount: Yup.number().required("Discount is required"),
    date: Yup.string().required("Date is required"),
  });

  const updateform = useFormik({
    initialValues: {
      title: edit?.data?.title,
      discount: edit?.data?.discount,
      date: edit?.data?.date,
    },
    validationSchema: couponSchema,

    onSubmit: (values) => {
      updateCoupon({ id: edit?.data?._id, data: values });
      dispatch(setDate(""));
    },
  });

  // Notification
  useEffect(() => {
    updateform.values.date = date;
    if (updateIsSuccess) {
      toast(updateData?.message);
      updateform.resetForm();
      updateReset();
      navigate("/admin/coupon");
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
      updateReset();
    }
  }, [
    date,
    updateform,
    updateform.values,
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
      <Title level={4}>Add New Coupon</Title>
      <form onSubmit={updateform.handleSubmit}>
        <div className="my-4">
          <label htmlFor="couponName" className=" font-bold text-sm">
            Coupon Name
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
        <div className="my-4">
          <label htmlFor="couponDiscount" className=" font-bold text-sm">
            Coupon Discount (%)
          </label>
          <input
            onChange={updateform.handleChange("discount")}
            value={updateform.values.discount}
            placeholder="Coupon discount percent"
            type="number"
            id="couponDiscount"
            name="couponDiscount"
            className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
          />
          {updateform.touched.discount && updateform.errors.discount ? (
            <div className="formik_err text-sm text-red-600">
              {updateform.errors.discount}
            </div>
          ) : null}
        </div>
        <div className="my-4">
          <label htmlFor="couponDate" className=" font-bold text-sm">
            Coupon Expire Date
          </label>
          <div>
            <DatePicker
              id="couponDate"
              className="w-full h-[40px]"
              onChange={handleDate}
            />
            {updateform.touched.date && updateform.errors.date ? (
              <div className="formik_err text-sm text-red-600">
                {updateform.errors.date}
              </div>
            ) : null}
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

export default EditCoupon;

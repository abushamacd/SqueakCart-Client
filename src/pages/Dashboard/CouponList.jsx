import React, { useEffect } from "react";
import { Typography, Table, DatePicker } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FiEdit } from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { setDate } from "../../redux/features/coupon/couponSlice";
import {
  useCreateCouponMutation,
  useDeleteCouponMutation,
  useGetCouponsQuery,
} from "../../redux/features/coupon/couponApi";
import Loading from "../../components/Loading";
import { setEdit } from "../../redux/features/site/siteSlice";
import { useNavigate } from "react-router-dom";

const CouponList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      title: "Discount %",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "Expire On",
      dataIndex: "expiry",
      key: "expiry",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  // Redux Hooks
  const { date } = useSelector((state) => state.coupon);

  const [
    createCoupon,
    {
      isSuccess: createIsSuccess,
      data: createData,
      isError: createIsError,
      error: createError,
      reset: createReset,
    },
  ] = useCreateCouponMutation();

  const [
    deleteCoupon,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteCouponMutation();

  const { data: getData, isLoading: getIsLoading } = useGetCouponsQuery();
  const coupons = getData?.data?.data;

  // Handle Action
  const handleDate = (date, dateString) => {
    dispatch(setDate(dateString));
  };

  const handleDelete = (coupon) => {
    deleteCoupon(coupon._id);
  };

  const openEdit = (coupon) => {
    dispatch(setEdit({ data: coupon, state: true }));
    dispatch(setDate(coupon?.date));
    navigate("/admin/coupon-edit");
  };

  // Table Processing
  const tableData = [];
  for (let i = 0; i < coupons?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: coupons[i]?.title,
      discount: coupons[i]?.discount,
      expiry: coupons[i]?.date,
      action: (
        <div className="flex gap-2">
          <FiEdit
            size={22}
            onClick={() => openEdit(coupons[i])}
            className="text-orange-400"
          />
          <MdDeleteForever
            onClick={() => handleDelete(coupons[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // Handle Form
  let couponSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    discount: Yup.number().required("Discount is required"),
    date: Yup.string().required("Date is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
      discount: "",
      date: date,
    },
    validationSchema: couponSchema,

    onSubmit: (values) => {
      createCoupon(values);
    },
  });

  // Notifications
  useEffect(() => {
    addForm.values.date = date;
    if (createIsSuccess || deleteIsSuccess) {
      toast(createData?.message || deleteData?.message);
      createReset();
      deleteReset();
      addForm.resetForm();
    } else if (createIsError || deleteIsError) {
      toast.error(createError?.data?.message || deleteError?.data?.message);
      createReset();
      deleteReset();
    }
  }, [
    date,
    addForm,
    addForm.values,
    createData,
    createError,
    createIsError,
    createIsSuccess,
    createReset,
    deleteData,
    deleteError,
    deleteIsError,
    deleteIsSuccess,
    deleteReset,
  ]);

  if (getIsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3}>User Coupon</Title>
      <div className="blog md:flex justify-between mt-[20px]">
        <div className="md:w-[70%] recent_order overflow-auto  bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px]  ">
          <Title className="capitalize" level={4}>
            All Coupons
          </Title>
          <Table className="mt-4" columns={columns} dataSource={tableData} />
        </div>
        <div className="md:w-[28%]">
          <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Add New Coupon</Title>
            <form onSubmit={addForm.handleSubmit}>
              <div className="my-4">
                <label htmlFor="couponName" className=" font-bold text-sm">
                  Coupon Name
                </label>
                <input
                  onChange={addForm.handleChange("title")}
                  value={addForm.values.title}
                  placeholder="Coupon name"
                  type="text"
                  id="couponName"
                  name="couponName"
                  className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                />
                {addForm.touched.title && addForm.errors.title ? (
                  <div className="formik_err text-sm text-red-600">
                    {addForm.errors.title}
                  </div>
                ) : null}
              </div>
              <div className="my-4">
                <label htmlFor="couponDiscount" className=" font-bold text-sm">
                  Coupon Discount (%)
                </label>
                <input
                  onChange={addForm.handleChange("discount")}
                  value={addForm.values.discount}
                  placeholder="Coupon discount percent"
                  type="number"
                  id="couponDiscount"
                  name="couponDiscount"
                  className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                />
                {addForm.touched.discount && addForm.errors.discount ? (
                  <div className="formik_err text-sm text-red-600">
                    {addForm.errors.discount}
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
                  {addForm.touched.date && addForm.errors.date ? (
                    <div className="formik_err text-sm text-red-600">
                      {addForm.errors.date}
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
        </div>
      </div>
    </div>
  );
};

export default CouponList;

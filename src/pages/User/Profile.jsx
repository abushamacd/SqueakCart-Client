/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";
import {
  useGetUserAddressQuery,
  useGetUserProfileQuery,
  useUpdateUserProfileMutation,
} from "../../redux/features/user/userApi";
import Loading from "../../components/Loading";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Profile = () => {
  const { data, isLoading } = useGetUserProfileQuery();

  const { data: addresses, isLoading: addressLoading } =
    useGetUserAddressQuery();
  const [updateUserProfile, { error, isError, isSuccess, reset }] =
    useUpdateUserProfileMutation();

  // form handle
  let formSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    phone: Yup.string().required("Phone is required"),
    // address: Yup.string().required("address is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      address: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      updateUserProfile({
        id: data?.data._id,
        data: values,
      });
    },
  });

  useEffect(() => {
    if (data) {
      const { firstname, lastname, email, phone, address } = data?.data;
      formik.setValues({
        firstname,
        lastname,
        email,
        phone,
        address: address[0]?._id,
      });
    }
    if (isSuccess) {
      toast("Profile updated successfully");
      reset();
    } else if (isError) {
      toast.error(`Profile updated failed. ${error.data.message}`);
      reset();
    }
  }, [data, error, isError, isSuccess, reset]);

  if (isLoading || addressLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="My Profile ||" />
      <div className="overflow-auto bg-white box_shadow rounded-lg p-[20px] ">
        <div className="mb-3">
          <Title level={3}>Account Settings</Title>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* Name */}
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="firstname">First Name</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="firstname"
                name="firstname"
                id="firstname"
                onChange={formik.handleChange("firstname")}
                value={formik.values.firstname}
              />
              {formik.touched.firstname && formik.errors.firstname ? (
                <div className="formik_err text-sm text-red-600">
                  {formik.errors.firstname}
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label htmlFor="lastname">Last Name</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="lastname"
                name="lastname"
                id="lastname"
                onChange={formik.handleChange("lastname")}
                value={formik.values.lastname}
              />
              {formik.touched.lastname && formik.errors.lastname ? (
                <div className="formik_err text-sm text-red-600">
                  {formik.errors.lastname}
                </div>
              ) : null}
            </div>
          </div>
          {/* Email Phone */}
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="email"
                placeholder="email"
                name="email"
                id="email"
                onChange={formik.handleChange("email")}
                value={formik.values.email}
              />
              {formik.touched.email && formik.errors.email ? (
                <div className="formik_err text-sm text-red-600">
                  {formik.errors.email}
                </div>
              ) : null}
            </div>
            <div className="w-full mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="phone"
                name="phone"
                id="phone"
                onChange={formik.handleChange("phone")}
                value={formik.values.phone}
              />
              {formik.touched.phone && formik.errors.phone ? (
                <div className="formik_err text-sm text-red-600">
                  {formik.errors.phone}
                </div>
              ) : null}
            </div>
          </div>
          {/* Address */}
          <div className="w-full mb-3">
            <label htmlFor="address font-bold">Default Address</label>
            <div className=" mb-3">
              <ul className="pl-[20px] leading-5">
                <li className="">
                  Address Line 1:
                  <span className="font-bold ml-1">
                    {data?.data?.address[0]?.addressline1}
                  </span>
                </li>
                <li className="">
                  Address Line 2:
                  <span className="font-bold ml-1">
                    {data?.data?.address[0]?.addressline2}
                  </span>
                </li>
                <li className="">
                  Zip Code:{" "}
                  <span className="font-bold ml-1">
                    {data?.data?.address[0]?.zipCode}
                  </span>
                </li>
                <li className="">
                  City:{" "}
                  <span className="font-bold ml-1">
                    {data?.data?.address[0]?.city}
                  </span>
                </li>
                <li className="">
                  State:
                  <span className="font-bold ml-1">
                    {data?.data?.address[0]?.state}
                  </span>
                </li>
                <li className="">
                  Country:
                  <span className="font-bold ml-1">
                    {data?.data?.address[0]?.country}
                  </span>
                </li>
              </ul>
            </div>
            <select
              className="w-full p-2 mb-3 mt-1"
              id="address"
              name="address"
              onChange={formik.handleChange("address")}
              value={formik.values.address}
            >
              <option>Please select one to update address</option>
              {addresses?.data?.map((address, i) => (
                <option key={i} value={address?._id}>
                  {address?.addressline1}, {address?.addressline2},{" "}
                  {address?.zipCode}, {address?.city}, {address?.state},{" "}
                  {address?.country}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Profile;

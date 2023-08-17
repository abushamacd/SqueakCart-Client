import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  FaAngleDown,
  FaAngleUp,
  FaAngleLeft,
  FaShoppingCart,
} from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useGetUserAddressQuery,
  useGetUserProfileQuery,
} from "../redux/features/user/userApi";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";

const Checkout = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const navigate = useNavigate();
  const { data: addresses, isLoading: addressLoading } =
    useGetUserAddressQuery();

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
      console.log(values);
    },
  });

  useEffect(() => {
    if (data) {
      const { firstname, lastname, email, phone, address } = data?.data;
      if (!address[0]?._id) {
        toast("Set shippnig address first");
        navigate("/profile");
      } else {
        formik.setValues({
          firstname,
          lastname,
          email,
          phone,
          address: address[0]?._id,
        });
      }
    }
  }, [data]);

  if (isLoading || addressLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head title="Checkout ||" />
      <BreadCrumb title="Checkout" />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="information">
            <div className="flex md:flex-row flex-col justify-center">
              <div className="md:w-7/12 bg-[#fff] rounded-lg box_shadow md:px-[50px] md:py-[30px] px-[15px] py-[15px] ">
                <div className="text-sm breadcrumbs">
                  <ul>
                    <li>
                      <Link to="/products">Products</Link>
                    </li>
                    <li>....</li>
                    <li>
                      <Link to="/checkout">Place Order</Link>
                    </li>
                  </ul>
                </div>
                <h3 className=" font-bold text-lg">Delivery Information</h3>
                <h4 className="text-sm">
                  Delivery to:{" "}
                  <span className="font-bold">
                    {formik.values.firstname} {formik.values.lastname}
                  </span>
                </h4>
                <h4 className=" text-sm">
                  Email:{" "}
                  <span className="font-bold">{formik.values.email}</span>
                </h4>
                <h4 className=" text-sm">
                  Emargency Phone:{" "}
                  <span className="font-bold">{formik.values.phone}</span>
                </h4>

                <div className="w-full mb-3">
                  <h4 className=" text-sm">Shipping Address:</h4>
                  <div className="mb-3 text-sm">
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
                </div>

                {/* <form className="mt-4" onSubmit={formik.handleSubmit}>
                  <button
                    type="submit"
                    className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                  >
                    Change shipping address
                  </button>
                </form> */}
                <hr className="md:mt-[30px] mt-[20px]" />
                <Link to="/cart">
                  <p className="text-[14px] mt-4 flex items-center gap-1">
                    <FaAngleLeft />
                    Return to Cart
                  </p>
                </Link>
              </div>
              <div className="md:w-5/12 md:block md:pr-[100px] md:pl-[50px] md:py-[30px]">
                <div className="order_details ">
                  <div className="products max-h-[300px] overflow-auto">
                    <div className="product my-[12px] flex items-center md:gap-[15px]">
                      <div className="relative w-1/6 md:mr-0 mr-[10px]">
                        <img
                          src="./assets/images/banner/81234.jpg"
                          alt=""
                          className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                        />
                        <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                          1
                        </span>
                      </div>
                      <div className="product_info mr-[10px]  w-4/6">
                        <h2 className="product_name  font-bold text-[14px]">
                          Sportv Cable - 2.0m | USB C | Lightning
                        </h2>
                        <p className="variant  text-gray-500 text-[12px]">
                          2.0M / Lightning
                        </p>
                      </div>
                      <p className="price  font-bold text-[14px]  w-1/6">
                        $ <span className="amount">24.95</span>
                      </p>
                    </div>
                    <div className="product my-[12px] flex items-center md:gap-[15px]">
                      <div className="relative w-1/6 md:mr-0 mr-[10px]">
                        <img
                          src="./assets/images/banner/81234.jpg"
                          alt=""
                          className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                        />
                        <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                          1
                        </span>
                      </div>
                      <div className="product_info mr-[10px]  w-4/6">
                        <h2 className="product_name  font-bold text-[14px]">
                          Sportv Cable - 2.0m | USB C | Lightning
                        </h2>
                        <p className="variant  text-gray-500 text-[12px]">
                          2.0M / Lightning
                        </p>
                      </div>
                      <p className="price  font-bold text-[14px]  w-1/6">
                        $ <span className="amount">24.95</span>
                      </p>
                    </div>
                    <div className="product my-[12px] flex items-center md:gap-[15px]">
                      <div className="relative w-1/6 md:mr-0 mr-[10px]">
                        <img
                          src="./assets/images/banner/81234.jpg"
                          alt=""
                          className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                        />
                        <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                          1
                        </span>
                      </div>
                      <div className="product_info mr-[10px]  w-4/6">
                        <h2 className="product_name  font-bold text-[14px]">
                          Sportv Cable - 2.0m | USB C | Lightning
                        </h2>
                        <p className="variant  text-gray-500 text-[12px]">
                          2.0M / Lightning
                        </p>
                      </div>
                      <p className="price  font-bold text-[14px]  w-1/6">
                        $ <span className="amount">24.95</span>
                      </p>
                    </div>
                    <div className="product my-[12px] flex items-center md:gap-[15px]">
                      <div className="relative w-1/6 md:mr-0 mr-[10px]">
                        <img
                          src="./assets/images/banner/81234.jpg"
                          alt=""
                          className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                        />
                        <span className="absolute  top-[-10px] right-[-10px] h-5 w-5 text-[14px] rounded-full text-center text-[#fff] bg-[#6d6d6d]">
                          1
                        </span>
                      </div>
                      <div className="product_info mr-[10px]  w-4/6">
                        <h2 className="product_name  font-bold text-[14px]">
                          Sportv Cable - 2.0m | USB C | Lightning
                        </h2>
                        <p className="variant  text-gray-500 text-[12px]">
                          2.0M / Lightning
                        </p>
                      </div>
                      <p className="price  font-bold text-[14px]  w-1/6">
                        $ <span className="amount">24.95</span>
                      </p>
                    </div>
                  </div>
                  <div className="cupon border-t-[1px] border-b-[1px] border-[#C2C2C2] py-[20px]">
                    <form action="" className="newsletter flex gap-[10px]">
                      <input
                        placeholder="Gift card or discount code"
                        className="w-full input-sm py-[8px] px-2 text-[14px] rounded-[3px] border-2 border-gray-200 focus:outline-none focus:border-2 focus:border-black"
                        type="text"
                        name="company"
                        id="company"
                      />
                      <button
                        type="submit"
                        className="first_button rounded px-[20px] text-[12px] text-[#fff] bg-[#000]"
                      >
                        Apply
                      </button>
                    </form>
                  </div>
                  <div className="caculation border-b-[1px] border-[#C2C2C2] py-[20px]">
                    <div className="flex justify-between items-center mb-[5px]">
                      <h5 className=" text-[14px] text-[#6d6d6d]">Subtotal</h5>
                      <h5 className=" text-[14px] font-bold ">
                        $<span className="amount">345.23</span>
                      </h5>
                    </div>
                    <div className="flex justify-between items-center mb-[5px]">
                      <h5 className=" text-[14px] text-[#6d6d6d]">Shipping</h5>
                      <h5 className=" text-[12px] font-bold text-[#6d6d6d] ">
                        Calculated at next step
                      </h5>
                    </div>
                  </div>
                  <div className="flex justify-between items-center my-[20px]">
                    <h5 className=" text-[14px] ">Total</h5>
                    <h5 className=" text-[20px] font-bold ">
                      $<span className="amount">345.23</span>
                    </h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;

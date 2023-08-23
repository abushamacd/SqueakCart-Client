import React, { useState } from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetUserProfileQuery } from "../redux/features/user/userApi";
import { useEffect } from "react";
import Loading from "../components/Loading";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "antd";
import { setView } from "../redux/features/site/siteSlice";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";
import { useCreateOrderMutation } from "../redux/features/order/orderApi";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);

const Checkout = () => {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetUserProfileQuery();
  const { view } = useSelector((state) => state.site);
  const navigate = useNavigate();
  const openView = (blog) => {
    setPmState("stripe");
    dispatch(setView({ data: blog, state: true }));
  };
  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };
  const [pmState, setPmState] = useState("COD");
  const { products, totalCost } = useSelector((state) => state.order);
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
      } else if (totalCost < 1) {
        navigate(window.history.back());
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
  }, [data, totalCost]);

  const cartProducts = [];
  products?.forEach((product) => {
    cartProducts.push({
      product: product?.productId?._id,
      count: product?.count,
      color: product?.color?._id,
    });
  });

  const [
    createOrder,
    {
      isSuccess: orderIsSuccess,
      data: orderData,
      isError: orderIsError,
      error: orderError,
      reset: orderReset,
    },
  ] = useCreateOrderMutation();

  const placeOrder = () => {
    createOrder({
      data: {
        products: cartProducts,
        total: parseFloat(
          (parseFloat(totalCost) + (pmState === "stripe" ? 0 : 5)).toFixed(2)
        ),
      },
    });
  };

  if (orderIsSuccess) {
    toast(orderData?.message);
    navigate("/profile/myorders");
    orderReset();
  } else if (orderIsError) {
    toast.error(orderError?.data?.message);
  }

  if (isLoading) {
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
              <div className="md:w-6/12 bg-[#fff] rounded-lg box_shadow md:px-[50px] md:py-[30px] px-[15px] py-[15px] ">
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
                <hr className="md:mt-[30px] mt-[20px]" />
                <p
                  className="text-[14px] mt-4 flex items-center gap-1 cursor-pointer"
                  onClick={() => navigate(window.history.back())}
                >
                  <FaAngleLeft />
                  Return back
                </p>
              </div>
              <div className="md:w-6/12 md:block md:pr-[100px] md:pl-[50px] md:py-[30px]">
                <div className="order_details ">
                  <div className="products max-h-[300px] overflow-auto">
                    {products?.map((product) => (
                      <div
                        key={product?.productId?._id}
                        className="product my-[12px] flex items-center md:gap-[15px]"
                      >
                        <div className="relative w-1/6 md:mr-0 mr-[10px]">
                          <img
                            src={product?.productId?.images[0]?.url}
                            alt=""
                            className="w-[65px] h-[65px] object-cover rounded-[5px] border-[1px] border-[#C2C2C2]"
                          />
                        </div>
                        <div className="product_info mr-[10px]  w-4/6">
                          <h2 className="product_name  font-bold text-[14px]">
                            {product?.productId?.title}
                          </h2>
                          <p className="variant  text-gray-500 text-[12px]">
                            <button
                              style={{
                                backgroundColor: `${product?.color?.code}`,
                              }}
                              className={` ml-1 rounded-full w-4 h-4 focus:outline-none`}
                            ></button>
                          </p>
                        </div>
                        <p className="text-[14px]  w-1/6">
                          <span className="amount float-right">
                            {product?.count} pices
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="border-y my-4">
                    <div className="flex py-1 justify-between items-center my-[20px]">
                      <h5 className=" text-[17px] ">Delivery Method Fee</h5>
                      <h5 className=" text-[14px] font-bold ">
                        $
                        <span className="amount">
                          {pmState === "stripe" ? 0 : 5}
                        </span>
                      </h5>
                    </div>
                    <div className="flex py-1 justify-between items-center my-[20px]">
                      <h5 className=" text-[17px] ">Total</h5>
                      <h5 className=" text-[14px] font-bold ">
                        $
                        <span className="amount">
                          {(
                            parseFloat(totalCost) +
                            (pmState === "stripe" ? 0 : 5)
                          ).toFixed(2)}
                        </span>
                      </h5>
                    </div>
                  </div>
                  <div className="flex md:flex-row flex-col gap-4">
                    <h4>Payment Method: </h4>
                    <div className="flex gap-4">
                      <div
                        onClick={() => openView("sdsd")}
                        className={`w-40 flex flex-col items-center border-2 ${
                          pmState === "stripe" && `border-green-600`
                        } rounded-lg p-2 box_shadow relative`}
                      >
                        <p className="absolute right-[3%] top-0 font-bold">
                          $ 0{" "}
                        </p>
                        <img
                          className="w-10"
                          src="https://laz-img-cdn.alicdn.com/tfs/TB1qIthr67nBKNjSZLeXXbxCFXa-80-80.png"
                          alt=""
                        />
                        <h4 className="text-sm font-bold">Stripe</h4>
                      </div>
                      <div
                        onClick={() => setPmState("COD")}
                        className={`w-40 flex flex-col items-center border-2 ${
                          pmState === "COD" && `border-green-600`
                        } rounded-lg p-2 box_shadow relative`}
                      >
                        <p className="absolute right-[3%] top-0 font-bold">
                          $ 5{" "}
                        </p>
                        <img
                          className="w-10"
                          src="https://laz-img-cdn.alicdn.com/tfs/TB1utb_r8jTBKNjSZFwXXcG4XXa-80-80.png"
                          alt=""
                        />
                        <h4 className="text-sm font-bold">Cash on Delivary</h4>
                      </div>
                    </div>
                  </div>
                  {pmState === "COD" && (
                    <button
                      onClick={placeOrder}
                      className="first_button float-right mt-4 duration-300 rounded-full px-5 py-2 text-sm text-white"
                    >
                      Confirm Order
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Payment */}
      <Modal
        className=""
        title={`Thanks for choosing stripe payment`}
        open={view.viewState}
        centered
        footer={null}
        onCancel={closeView}
      >
        <Elements stripe={stripePromise}>
          <CheckoutForm
            products={cartProducts}
            total={parseFloat(
              (parseFloat(totalCost) + (pmState === "stripe" ? 0 : 5)).toFixed(
                2
              )
            )}
          />
        </Elements>
      </Modal>
    </>
  );
};

export default Checkout;

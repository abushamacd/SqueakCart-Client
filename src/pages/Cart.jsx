import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { BsArrowLeft } from "react-icons/bs";
import { Link } from "react-router-dom";
import { useGetUserProfileQuery } from "../redux/features/user/userApi";
import Loading from "../components/Loading";
import {
  useClearCartMutation,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "../redux/features/cart/cartApi";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Cart = () => {
  const { data, isLoading } = useGetUserProfileQuery();
  const cart = data?.data?.cart[0];
  const products = cart?.products;

  const dispatch = useDispatch();

  const [
    clearCart,
    {
      isSuccess: clearCartIsSuccess,
      data: clearCartData,
      isError: clearCartIsError,
      error: clearCartError,
      reset: clearCartReset,
    },
  ] = useClearCartMutation();

  const [
    removeFromCart,
    {
      isSuccess: removeIsSuccess,
      data: removeData,
      isError: removeIsError,
      error: removeError,
      reset: removeReset,
    },
  ] = useRemoveFromCartMutation();

  const [updateQuantity, { isLoading: updateIsLoading, reset: updateReset }] =
    useUpdateQuantityMutation();

  const handleQuantity = (pId, cId, value, quantity) => {
    if (value < parseInt(quantity)) {
      updateQuantity({
        id: pId,
        data: {
          color: cId,
          status: "increase",
        },
      });
    } else if (value > parseInt(quantity)) {
      updateQuantity({
        id: pId,
        data: {
          color: cId,
          status: "decrease",
        },
      });
    }
  };
  const handleRemove = (pId, cId) => {
    removeFromCart({
      id: pId,
      data: {
        color: cId,
      },
    });
  };

  if (clearCartIsSuccess) {
    toast("Cart clear");
  }

  if (updateIsLoading) {
    toast(`Quantity updating`, {
      autoClose: 1000,
    });
    updateReset();
  }

  if (removeIsSuccess || removeIsError) {
    // removeData, removeError
    removeIsSuccess &&
      toast(removeData?.message, {
        autoClose: 1000,
      });
    removeIsError &&
      toast.error(removeError?.data?.message, {
        autoClose: 1000,
      });
    removeReset();
  }

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="Cart ||" />
      <BreadCrumb title="Cart" />
      <div className="body_wrapper p-[20px]">
        <div className="layout">
          <div className="container mx-auto mt-10">
            <div className="flex md:flex-row flex-col my-10">
              <div className="md:w-3/4 bg-white md:p-10 p-2  rounded-lg box_shadow">
                <div className="flex justify-between border-b pb-8">
                  <h1 className="font-semibold text-2xl">Shopping Cart</h1>
                  <h2 className="font-semibold text-2xl">
                    {cart?.products?.length} Items
                  </h2>
                </div>
                <div className="flex mb-5 border-b py-4">
                  <h3 className="font-semibold text-gray-600 text-xs uppercase md:w-2/5">
                    Product Details
                  </h3>
                  <h3 className="hidden md:block font-semibold text-center text-gray-600 text-xs uppercase w-1/5">
                    Quantity
                  </h3>
                  <h3 className="hidden md:block font-semibold text-right text-gray-600 text-xs uppercase w-1/5">
                    Price
                  </h3>
                  <h3 className="hidden md:block font-semibold text-right text-gray-600 text-xs uppercase w-1/5 md:mr-8">
                    Total
                  </h3>
                </div>
                {/* Single product */}
                <div className="h-[60vh] overflow-x-hidden overflow-y-auto">
                  {products &&
                    [...products]
                      ?.sort((a, b) => a.cartPositon - b.cartPositon)
                      ?.map((item) => (
                        <div
                          key={item?._id}
                          className="flex md:flex-row flex-col gap-4 items-center rounded-lg hover:bg-gray-100 md:px-6 px-2 py-5 pb-4 border-b"
                        >
                          <div className="flex md:w-2/5">
                            <div className="w-[100px]">
                              <img
                                className="h-[100px] w-[100px]"
                                src={item?.productId?.images[0].url}
                                alt=""
                              />
                            </div>
                            <div className="flex flex-col justify-between ml-4 w-[200px]">
                              <span className="font-bold text-sm">
                                {item?.productId?.title}
                              </span>
                              <div className="flex items-center">
                                <span className="text-gray-500 text-md">
                                  Color:{" "}
                                </span>
                                <button
                                  style={{
                                    backgroundColor: `${item?.color.code}`,
                                  }}
                                  className={` ml-1 rounded-full w-4 h-4 focus:outline-none`}
                                ></button>
                              </div>
                              <p
                                onClick={() =>
                                  handleRemove(
                                    item?.productId?._id,
                                    item?.color._id
                                  )
                                }
                                className="font-semibold hover:text-red-500 text-gray-500 text-xs cursor-pointer"
                              >
                                Remove
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="number"
                              min="1"
                              value={item?.count}
                              onChange={(e) =>
                                handleQuantity(
                                  item?.productId?._id,
                                  item?.color._id,
                                  item?.count,
                                  e.target.value
                                )
                              }
                              max={item?.productId?.quantity}
                              className="text-center border w-20 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none rounded-md"
                              name=""
                            />
                          </div>
                          <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                            <p className="block md:hidden">Price :</p>
                            <p className="float-right">
                              $ {item?.productId?.price}
                            </p>
                          </div>
                          <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                            <p className="block md:hidden">Total :</p>
                            <p className="float-right">
                              $ {item?.productId?.price * item?.count}
                            </p>
                          </div>
                        </div>
                      ))}
                </div>

                <div className="flex justify-between">
                  <Link
                    to={`${window.location.origin}/products`}
                    className="flex items-center gap-2 font-semibold text-indigo-600 text-sm mt-10"
                  >
                    <BsArrowLeft />
                    Continue Shopping
                  </Link>
                  <button
                    // onClick={() => {
                    //   dispatch(clearCart())
                    // }}
                    className="flex items-center gap-2 font-semibold text-red-600 text-sm mt-10"
                  >
                    Clear Cart
                  </button>
                </div>
              </div>

              <div id="summary" className="md:w-1/4 px-8 py-10">
                <h1 className="font-semibold text-2xl border-b pb-8">
                  Order Summary
                </h1>
                <div className="flex justify-between mt-10 mb-5">
                  <span className="font-semibold text-sm capitalize">
                    Cart Total
                  </span>
                  <span className="font-semibold text-sm">
                    $ {cart?.cartTotal}
                  </span>
                </div>
                <div>
                  <label className="font-medium inline-block mb-3 text-sm uppercase">
                    Shipping
                  </label>
                  <select className="block p-2 text-gray-600 w-full text-sm rounded-md">
                    <option>Standard shipping - $10.00</option>
                  </select>
                </div>
                <div className="py-10">
                  <label
                    htmlFor="promo"
                    className="font-semibold inline-block mb-3 text-sm uppercase"
                  >
                    Promo Code
                  </label>
                  <input
                    type="text"
                    id="promo"
                    placeholder="Enter your code"
                    className="p-2 text-sm w-full input_bg_white rounded-md"
                  />
                </div>
                <button className="first_button rounded-full px-5 py-2 text-sm text-white uppercase">
                  Apply
                </button>
                <div className="border-t mt-8">
                  <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                    <span>Total cost</span>
                    <span>$600</span>
                  </div>
                  <Link to={`${window.location.origin}/checkout`}>
                    <button className="first_button rounded-full font-semibold py-3 text-sm text-white uppercase w-full">
                      Checkout
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;

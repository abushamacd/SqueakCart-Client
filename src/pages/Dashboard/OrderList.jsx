import React, { useEffect } from "react";
import { Typography, Table, Select, Modal } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import {
  useDeleteOrderMutation,
  useUpdateOrderMutation,
} from "../../redux/features/order/orderApi";
import Loading from "../../components/Loading";
import { setView } from "../../redux/features/site/siteSlice";
import { toast } from "react-toastify";
import { useGetOrdersQuery } from "../../redux/features/order/orderApi";
import { Link } from "react-router-dom";

const OrderList = () => {
  const { Title } = Typography;
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "User Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Payment Status",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
    },
    {
      title: "Payment Method",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
    },
    {
      title: "Order Status",
      dataIndex: "orderStatus",
      key: "orderStatus",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const dispatch = useDispatch();

  // Redux Hooks
  const { data: orderData, isLoading } = useGetOrdersQuery();
  const orders = orderData?.data;
  console.log(orders);
  const { view } = useSelector((state) => state.site);
  const [
    updateOrder,
    {
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateOrderMutation();

  const [
    deleteOrder,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteOrderMutation();

  // Handle Action
  const handleUpdate = (value, options) => {
    console.log(options.value);
    // updateOrder({ id: options.id, data: { status: options.value } });
  };

  const openView = (order) => {
    dispatch(setView({ data: order, state: true }));
  };

  const handleDelete = (order) => {
    deleteOrder({ id: order._id });
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  // Data Processing
  const tableData = [];
  for (let i = 0; i < orders?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: orders[i]?.orderBy?.firstname + " " + orders[i]?.orderBy?.lastname,
      paymentStatus: (
        <p
          className={`
            ${
              orderData?.data[i]?.paymentStatus === "Due" &&
              `text-red-500 font-bold`
            }
            ${
              orderData?.data[i]?.paymentStatus === "Paid" &&
              `text-green-500 font-bold`
            } `}
        >
          {orderData?.data[i]?.paymentStatus}
        </p>
      ),
      paymentMethod: orderData?.data[i]?.paymentMethod,
      orderStatus: (
        <Select
          defaultValue={orders[i]?.orderStatus}
          style={{ width: 120 }}
          onChange={handleUpdate}
          options={[
            {
              id: `Not Processed`,
              value: `Not Processed`,
              label: "Not Processed",
            },
            { id: `Processing`, value: "Processing", label: "Processing" },
            {
              id: `On Currier`,
              value: "On Currier",
              label: "On Currier",
            },
            { id: `Delivered`, value: "Delivered", label: "Delivered" },
            { id: `Cancelled`, value: "Cancelled", label: "Cancelled" },
          ]}
        />
      ),
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(orders[i])}
            size={22}
            className="text-green-700"
          />
          <MdDeleteForever
            onClick={() => handleDelete(orders[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // Notification
  useEffect(() => {
    if (updateIsSuccess || deleteIsSuccess) {
      toast(updateData?.message || deleteData?.message);
      updateReset();
      deleteReset();
    } else if (updateIsError || deleteIsError) {
      toast.error(updateError.data?.message || deleteError.data?.message);
      updateReset();
      deleteReset();
    }
  }, [
    updateIsSuccess,
    updateData,
    updateIsError,
    updateError,
    updateReset,
    deleteIsSuccess,
    deleteIsError,
    deleteData,
    deleteError,
    deleteReset,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3}>All Orders</Title>
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <Title className="capitalize" level={5}>
          recent orders
        </Title>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <Modal
        className="large_modal"
        title={`Order ID: ${view.data?._id}`}
        open={view.viewState}
        centered
        footer={null}
        onCancel={closeView}
      >
        <div className="">
          <div className="bg-white md:p-10 p-2  rounded-lg box_shadow">
            <h1 className="font-semibold text-2xl">Shipping Details</h1>
            <div className="ship_details mt-2 ml-2">
              <p className="">
                Deliver to:
                <span className="font-bold">{` ${view.data?.orderBy?.firstname} ${view.data?.orderBy?.lastname}`}</span>
              </p>
              <p className="">
                Email :
                <span className="font-bold">{` ${view.data?.orderBy?.email}`}</span>
              </p>
              <p className="">
                Contact No. :
                <span className="font-bold">{` ${view.data?.orderBy?.phone}`}</span>
              </p>
              <div className="w-full mb-3">
                <h4 className=" text-sm">Shipping Address:</h4>
                <div className="mb-3 text-sm">
                  <ul className="pl-[20px] leading-5">
                    <li className="">
                      Address Line 1:
                      <span className="font-bold ml-1">
                        {view.data?.orderBy?.address[0]?.addressline1}
                      </span>
                    </li>
                    <li className="">
                      Address Line 2:
                      <span className="font-bold ml-1">
                        {view.data?.orderBy?.address[0]?.addressline2}
                      </span>
                    </li>
                    <li className="">
                      Zip Code:{" "}
                      <span className="font-bold ml-1">
                        {view.data?.orderBy?.address[0]?.zipCode}
                      </span>
                    </li>
                    <li className="">
                      City:{" "}
                      <span className="font-bold ml-1">
                        {view.data?.orderBy?.address[0]?.city}
                      </span>
                    </li>
                    <li className="">
                      State:
                      <span className="font-bold ml-1">
                        {view.data?.orderBy?.address[0]?.state}
                      </span>
                    </li>
                    <li className="">
                      Country:
                      <span className="font-bold ml-1">
                        {view.data?.orderBy?.address[0]?.country}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
              <hr className="md:mt-[30px] mt-[20px]" />
            </div>
            <div className="flex justify-between border-b pb-8 mt-4">
              <h1 className="font-semibold text-2xl">Order Details</h1>
              <h2 className="font-semibold text-2xl">
                {view?.data?.products?.length} Items
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
              <h3 className="hidden md:block font-semibold text-right text-gray-600 text-xs uppercase w-1/5 md:mr-16">
                Total
              </h3>
            </div>
            {/* Single product */}
            <div className="h-[60vh] overflow-x-hidden overflow-y-auto">
              {view?.data?.products?.map((item) => (
                <div
                  key={item?._id}
                  className="flex md:flex-row flex-col gap-4 items-center rounded-lg hover:bg-gray-100 md:px-6 px-2 py-5 pb-4 border-b"
                >
                  <div className="flex md:w-2/5">
                    <div className="w-[100px]">
                      <Link to={`/products/${item?.product?._id}`}>
                        <img
                          className="h-[100px] w-[100px]"
                          src={item?.product?.images[0]?.url}
                          alt=""
                        />
                      </Link>
                    </div>
                    <div className="flex flex-col justify-between ml-4 w-[200px]">
                      <Link to={`/products/${item?.product?._id}`}>
                        <span className="font-bold text-sm">
                          {item?.product?.title}
                        </span>
                      </Link>
                      <div className="flex items-center">
                        <span className="text-gray-500 text-md">Color: </span>
                        <button
                          style={{
                            backgroundColor: `${item?.color.code}`,
                          }}
                          className={` ml-1 rounded-full w-4 h-4 focus:outline-none`}
                        ></button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <input
                      type="number"
                      min="1"
                      value={item?.count}
                      disabled
                      max={item?.product?.quantity}
                      className="text-center border w-20 bg-gray-300 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 outline-none rounded-md"
                      name=""
                    />
                  </div>
                  <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                    <p className="block md:hidden">Price :</p>
                    <p className="float-right">
                      $ {item?.product?.price?.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-center md:block flex gap-4 md:w-1/5 font-semibold text-sm">
                    <p className="block md:hidden">Total :</p>
                    <p className="float-right">
                      $ {(item?.product?.price * item?.count)?.toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default OrderList;

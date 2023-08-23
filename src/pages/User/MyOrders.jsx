import React from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";
import { Modal, Table } from "antd";
import { useGetUserOrdersQuery } from "../../redux/features/order/orderApi";
import { FaRegEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { setView } from "../../redux/features/site/siteSlice";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";

const MyOrders = () => {
  const dispatch = useDispatch();
  const { data: orderData, isLoading: orderIsLoading } =
    useGetUserOrdersQuery();
  const { view } = useSelector((state) => state.site);

  const openView = (blog) => {
    dispatch(setView({ data: blog, state: true }));
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
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
      title: "Cost",
      dataIndex: "total",
      key: "total",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  const tableData = [];
  for (let i = 0; i < orderData?.data?.length; i++) {
    tableData.push({
      key: i + 1,
      no: `SC_${tableData.length + 1}`,
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
      orderStatus: orderData?.data[i]?.orderStatus,
      total: orderData?.data[i]?.total,
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(orderData?.data[i])}
            size={22}
            className="text-green-700"
          />
        </div>
      ),
    });
  }

  if (orderIsLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="My Orders ||" />
      <div className="overflow-auto bg-white box_shadow rounded-lg p-[20px]">
        <div className="mb-3 md:flex justify-between">
          <Title level={3}>My Orders</Title>
        </div>
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
            <div className="flex justify-between border-b pb-8">
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
    </>
  );
};

export default MyOrders;

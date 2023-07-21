import React, { useEffect } from "react";
import { Typography, Table, Select, Modal } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import Loading from "../../components/Loading";
import { setView } from "../../redux/features/site/siteSlice";
import { toast } from "react-toastify";
import {
  useGetUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
  useDeleteUserMutation,
} from "../../redux/features/user/userApi";

const User = () => {
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
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const dispatch = useDispatch();

  // Redux Hooks
  const { isLoading, data } = useGetUsersQuery();
  const users = data?.data?.data;
  const { view } = useSelector((state) => state.site);
  const [
    blockUser,
    {
      isSuccess: blockIsSuccess,
      data: blockData,
      isError: blockIsError,
      error: blockError,
      reset: blockReset,
    },
  ] = useBlockUserMutation();

  const [
    unblockUser,
    {
      isSuccess: unblockIsSuccess,
      data: unblockData,
      isError: unblockIsError,
      error: unblockError,
      reset: unblockReset,
    },
  ] = useUnblockUserMutation();

  const [
    deleteUser,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteUserMutation();

  // Handle Action
  const handleUpdate = (value, options) => {
    if (options.label === "Unblock") {
      unblockUser(options.id);
    } else {
      blockUser(options.id);
    }
  };

  const openView = (user) => {
    dispatch(setView({ data: user, state: true }));
  };

  const handleDelete = (user) => {
    deleteUser(user._id);
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  // Table Processing
  const tableData = [];
  for (let i = 0; i < users?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: `${users[i]?.firstname} ${users[i]?.lastname}`,
      email: users[i]?.email,
      status: (
        <Select
          defaultValue={users[i]?.isBlocked}
          style={{ width: 120 }}
          onChange={handleUpdate}
          options={[
            { id: users[i]?._id, value: false, label: "Unblock" },
            { id: users[i]?._id, value: true, label: "Block" },
          ]}
        />
      ),
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(users[i])}
            size={22}
            className="text-green-700"
          />
          <MdDeleteForever
            onClick={() => handleDelete(users[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // Notification
  useEffect(() => {
    if (blockIsSuccess || unblockIsSuccess || deleteIsSuccess) {
      toast(blockData?.message || unblockData?.message || deleteData?.message);
      blockReset();
      unblockReset();
      deleteReset();
    } else if (blockIsError || unblockIsError || deleteIsError) {
      toast.error(
        blockError.data?.message ||
          unblockError.data?.message ||
          deleteError.data?.message
      );
      blockReset();
      unblockReset();
      deleteReset();
    }
  }, [
    blockIsSuccess,
    blockData,
    blockIsError,
    blockError,
    blockReset,
    deleteIsSuccess,
    deleteIsError,
    deleteData,
    deleteError,
    deleteReset,
    unblockIsSuccess,
    unblockData,
    unblockIsError,
    unblockError,
    unblockReset,
  ]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3}>Users</Title>
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <Title className="capitalize" level={5}>
          All Users
        </Title>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <Modal
        title={`User ID: ${view.data?._id}`}
        open={view.viewState}
        centered
        footer={null}
        onCancel={closeView}
      >
        <form>
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
                disabled
                value={view?.data?.firstname}
              />
            </div>
            <div className="w-full mb-3">
              <label htmlFor="lastname">Last Name</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="lastname"
                name="lastname"
                id="lastname"
                disabled
                value={view?.data?.lastname}
              />
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
                disabled
                value={view?.data?.email}
              />
            </div>
            <div className="w-full mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="phone"
                name="phone"
                id="phone"
                disabled
                value={view?.data?.phone}
              />
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
                    {view?.data?.address[0]?.addressline1}
                  </span>
                </li>
                <li className="">
                  Address Line 2:
                  <span className="font-bold ml-1">
                    {view?.data?.address[0]?.addressline2}
                  </span>
                </li>
                <li className="">
                  Zip Code:{" "}
                  <span className="font-bold ml-1">
                    {view?.data?.address[0]?.zipCode}
                  </span>
                </li>
                <li className="">
                  City:{" "}
                  <span className="font-bold ml-1">
                    {view?.data?.address[0]?.city}
                  </span>
                </li>
                <li className="">
                  State:
                  <span className="font-bold ml-1">
                    {view?.data?.address[0]?.state}
                  </span>
                </li>
                <li className="">
                  Country:
                  <span className="font-bold ml-1">
                    {view?.data?.address[0]?.country}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default User;

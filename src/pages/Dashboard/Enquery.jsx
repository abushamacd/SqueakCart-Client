import React, { useEffect } from "react";
import { Typography, Table, Select, Modal } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import {
  useDeleteContactMutation,
  useGetContactsQuery,
  useUpdateContactMutation,
} from "../../redux/features/contact/contactApi";
import Loading from "../../components/Loading";
import { setView } from "../../redux/features/site/siteSlice";
import { toast } from "react-toastify";

const Enquery = () => {
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
  const { isLoading, data } = useGetContactsQuery();
  const contacts = data?.data?.data;
  const { view } = useSelector((state) => state.site);
  const [
    updateContact,
    {
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateContactMutation();

  const [
    deleteContact,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteContactMutation();

  // Handle Action
  const handleUpdate = (value, options) => {
    updateContact({ id: options.id, data: { status: options.value } });
  };

  const openView = (contact) => {
    dispatch(setView({ data: contact, state: true }));
  };

  const handleDelete = (contact) => {
    deleteContact({ id: contact._id });
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  // Table Processing
  const tableData = [];
  for (let i = 0; i < contacts?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: contacts[i]?.name,
      email: contacts[i]?.email,
      status: (
        <Select
          defaultValue={contacts[i]?.status}
          style={{ width: 120 }}
          onChange={handleUpdate}
          options={[
            { id: contacts[i]?._id, value: `Submitted`, label: "Submitted" },
            { id: contacts[i]?._id, value: "Contacted", label: "Contacted" },
            {
              id: contacts[i]?._id,
              value: "In Progress",
              label: "In Progress",
            },
            { id: contacts[i]?._id, value: "Resolved", label: "Resolved" },
          ]}
        />
      ),
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(contacts[i])}
            size={22}
            className="text-green-700"
          />
          <MdDeleteForever
            onClick={() => handleDelete(contacts[i])}
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
      <Title level={3}>Enqueries</Title>
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <Title className="capitalize" level={5}>
          recent orders
        </Title>
        <Table columns={columns} dataSource={tableData} />
      </div>
      <Modal
        title={`Contact ID: ${view.data?._id}`}
        open={view.viewState}
        centered
        footer={null}
        onCancel={closeView}
      >
        <form>
          <div className="relative mb-4">
            <label htmlFor="name" className="leading-7 text-sm text-gray-600">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              value={view?.data?.name}
              disabled
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full bg-white rounded border border-gray-300  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
              disabled
              value={view.data?.email}
            />
          </div>
          <div className="relative mb-4">
            <label
              htmlFor="message"
              className="leading-7 text-sm text-gray-600"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="w-full bg-white rounded border border-gray-300 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
              value={view.data?.message}
              disabled
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Enquery;

import React from "react";
import { Typography, Table, Select, Modal } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useGetContactsQuery } from "../../redux/features/contact/contactApi";
import Loading from "../../components/Loading";
import { setContact } from "../../redux/features/site/siteSlice";

const Enquery = () => {
  const { isLoading, data } = useGetContactsQuery();
  const contacts = data?.data?.data;
  const { contact } = useSelector((state) => state.site);
  const dispatch = useDispatch();

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

  const handleChange = (value, options) => {
    console.log(options);
  };

  const openContact = (contact) => {
    dispatch(setContact({ data: contact, state: true }));
  };

  const handleCancel = () => {
    dispatch(setContact({ data: null, state: false }));
  };

  const tableData = [];
  for (let i = 0; i < contacts?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: contacts[i]?.name,
      email: contacts[i]?.email,
      status: (
        <Select
          defaultValue="Submitted"
          style={{ width: 120 }}
          onChange={handleChange}
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
            onClick={() => openContact(contacts[i])}
            size={22}
            className="text-green-700"
          />
          <FiEdit size={22} className="text-orange-400" />
          <MdDeleteForever size={22} className="text-red-500 " />
        </div>
      ),
    });
  }

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
        title={`Contact ID: ${contact.data?._id}`}
        open={contact.state}
        footer={null}
        onCancel={handleCancel}
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
              value={contact?.data?.name}
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
              value={contact.data?.email}
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
              value={contact.data?.message}
              disabled
            ></textarea>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Enquery;

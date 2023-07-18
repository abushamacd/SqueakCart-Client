import React, { useEffect } from "react";
import { Typography, Table, Select } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { useGetContactsQuery } from "../../redux/features/contact/contactApi";
import Loading from "../../components/Loading";

const Enquery = () => {
  const { isLoading, isSuccess, data, isError, error, reset } =
    useGetContactsQuery();
  const contacts = data?.data?.data;

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
          <FaRegEye size={22} className="text-green-700" />
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
    </div>
  );
};

export default Enquery;

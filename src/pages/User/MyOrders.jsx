import React from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";
import { Table } from "antd";

const MyOrders = () => {
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

  const tableData = [];
  // for (let i = 0; i < contacts?.data?.length; i++) {
  //   tableData.push({
  //     key: i + 1,
  //     no: tableData.length + 1,
  //     name: contacts?.data[i]?.name,
  //     email: contacts?.data[i]?.email,
  //     status: (
  //       <>
  //         <Select
  //           defaultValue="lucy"
  //           style={{ width: 120 }}
  //           onChange={handleChange}
  //           options={[
  //             { value: "jack", label: "Jack" },
  //             { value: "lucy", label: "Lucy" },
  //             { value: "Yiminghe", label: "yiminghe" },
  //           ]}
  //         />
  //       </>
  //     ),
  //     action: (
  //       <div className="flex gap-2">
  //         <FaRegEye size={22} className="text-green-700" />
  //         <FiEdit size={22} className="text-orange-400" />
  //         <MdDeleteForever size={22} className="text-red-500 " />
  //       </div>
  //     ),
  //   });
  // }
  return (
    <>
      <Head title="My Orders ||" />
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <div className="mb-3 md:flex justify-between">
          <Title level={3}>All Orders</Title>
        </div>
        <Table columns={columns} dataSource={tableData} />
      </div>
    </>
  );
};

export default MyOrders;

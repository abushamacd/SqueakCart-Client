import React from "react";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { BsArrowUpRight, BsArrowDownRight } from "react-icons/bs";
import { Typography, Table, Timeline } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import { Column } from "@ant-design/plots";
import { Link } from "react-router-dom";
import Traffic from "../../components/Dashboard/Traffic";
import Reviews from "../../components/Dashboard/Reviews";

const Dashboard = () => {
  const { Title, Text } = Typography;
  const data = [
    {
      type: "Jan",
      sales: 38,
    },
    {
      type: "Feb",
      sales: 52,
    },
    {
      type: "Mar",
      sales: 61,
    },
    {
      type: "Apr",
      sales: 145,
    },
    {
      type: "May",
      sales: 48,
    },
    {
      type: "Jun",
      sales: 38,
    },
    {
      type: "July",
      sales: 38,
    },
    {
      type: "Aug",
      sales: 38,
    },
  ];
  const config = {
    data,
    xField: "type",
    yField: "sales",
    color: ({ type }) => {
      return "#ffd333";
    },
    label: {
      position: "middle",
      style: {
        fill: "#000",
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "Month",
      },
      sales: {
        alias: "sales",
      },
    },
  };

  const orders = [1, 2, 3, 4];
  const columns = [
    {
      title: "SKU",
      dataIndex: "no",
      key: "no",
      render: (text) => <Link to="">{text}</Link>,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      sorter: (a, b) => a.title.length - b.title.length,
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  // Data Processing
  const tableData = [];
  for (let i = 0; i < orders?.data?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      title: orders?.data[i]?.orderStatus,
      action: (
        <div className="flex gap-2">
          <FaRegEye size={22} className="text-green-700" />
          <FiEdit size={22} className="text-orange-400" />
          <MdDeleteForever size={22} className="text-red-500 " />
        </div>
      ),
    });
  }

  return (
    <div>
      <Title level={3}>Dashboard</Title>
      <div className="flex md:flex-row gap-[20px] flex-col justify-between mt-[20px]">
        <div className="box_shadow md:w-[32.33%] bg-white rounded-lg p-[15px]">
          <div className="">
            <Text type="secondary" className="capitalize">
              Total sells
            </Text>
          </div>
          <div className="flex md:flex-row flex-col justify-between md:items-end mt-2">
            <Title level={2}>$ 1000</Title>
            <div className="flex flex-col md:items-end">
              <Text className="flex gap-1 items-center" type="success">
                <BsArrowUpRight /> 34.7%
              </Text>
              <Text type="secondary">Compare to april 2023</Text>
            </div>
          </div>
        </div>
        <div className="box_shadow md:w-[32.33%] bg-white rounded-lg p-[15px]">
          <div className="">
            <Text type="secondary" className="capitalize">
              average order value
            </Text>
          </div>
          <div className="flex md:flex-row flex-col justify-between md:items-end mt-2">
            <Title level={2}>$ 1000</Title>
            <div className="flex flex-col md:items-end">
              <Text className="flex gap-1 items-center" type="danger">
                <BsArrowDownRight /> 34.7%
              </Text>
              <Text type="secondary">Compare to april 2023</Text>
            </div>
          </div>
        </div>
        <div className="box_shadow md:w-[32.33%] bg-white rounded-lg p-[15px]">
          <div className="">
            <Text type="secondary" className="capitalize">
              Total orders
            </Text>
          </div>
          <div className="flex md:flex-row flex-col justify-between md:items-end mt-2">
            <Title level={2}>$ 1000</Title>
            <div className="flex flex-col md:items-end">
              <Text className="flex gap-1 items-center" type="success">
                <BsArrowUpRight /> 34.7%
              </Text>
              <Text type="secondary">Compare to april 2023</Text>
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex gap-[2%] mt-[20px]">
        <div className="active_user md:w-[28%] bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
          <div className="mb-2">
            <Title className="capitalize" level={5}>
              Active User
            </Title>
            <div className="mt-2 rounded bg-[#d9ecff] py-4 ">
              <Title className="text-[#004b9a] text-center ">148</Title>
            </div>
          </div>
          <div className="mb-2">
            <Title className="capitalize" level={5}>
              Pending Orders
            </Title>
            <div className="mt-2 rounded bg-[#d9ecff] py-4 ">
              <Title className="text-[#004b9a] text-center">35</Title>
            </div>
          </div>
        </div>
        <div className="income_statistic md:w-[70%] bg-white box_shadow rounded-lg p-[20px] ">
          <Title className="capitalize" level={5}>
            Income statistics
          </Title>
          <div className="mt-2">
            <Column {...config} />
          </div>
        </div>
      </div>
      <div className="md:flex gap-[2%] mt-[20px]">
        <div className="recent_order overflow-auto md:w-[70%] bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
          <Title className="capitalize" level={5}>
            recent orders
          </Title>
          <Table className="mt-2" columns={columns} dataSource={tableData} />
        </div>
        <div className="traffic md:w-[28%] bg-white box_shadow rounded-lg p-[20px] ">
          <div className="mb-2">
            <Title className="capitalize" level={5}>
              Sales by traffic source
            </Title>
            <div className="mt-2 rounded py-4 ">
              <Traffic />
            </div>
          </div>
        </div>
      </div>
      <div className="md:flex gap-[2%] mt-[20px]">
        <div className="recent_order md:w-[49%] bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
          <Title className="capitalize" level={5}>
            Recent activity
          </Title>
          <div className="mt-2">
            <Timeline
              items={[
                {
                  color: "green",
                  children: "Create a services site 2015-09-01",
                },
                {
                  color: "green",
                  children: "Create a services site 2015-09-01",
                },
                {
                  color: "red",
                  children: (
                    <>
                      <p>Solve initial network problems 1</p>
                      <p>Solve initial network problems 2</p>
                      <p>Solve initial network problems 3 2015-09-01</p>
                    </>
                  ),
                },
                {
                  children: (
                    <>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </>
                  ),
                },
                {
                  color: "gray",
                  children: (
                    <>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </>
                  ),
                },
                {
                  color: "gray",
                  children: (
                    <>
                      <p>Technical testing 1</p>
                      <p>Technical testing 2</p>
                      <p>Technical testing 3 2015-09-01</p>
                    </>
                  ),
                },
                {
                  color: "#00CCFF",
                  dot: <SmileOutlined />,
                  children: <p>Custom color testing</p>,
                },
              ]}
            />
          </div>
        </div>
        <div className="recent_reviews overflow-auto md:w-[49%] bg-white box_shadow rounded-lg p-[20px] ">
          <Title className="capitalize" level={5}>
            Recent reviews
          </Title>
          <div className="mt-2 recent_reviews_star">
            <Reviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

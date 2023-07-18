import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { Breadcrumb, Layout, theme } from "antd";
import DBHeader from "../components/DBHeader";
import { HomeOutlined } from "@ant-design/icons";

const AdminLayout = () => {
  const { Content } = Layout;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const pathname = window.location.pathname.split("/");
  return (
    <>
      <Layout className="h-screen ">
        <Sidebar />
        <Layout>
          <DBHeader />
          <Content
            className="rounded-lg overflow-auto"
            style={{
              margin: "0px 16px",
              padding: 20,
              minHeight: 280,
              background: colorBgContainer,
            }}
          >
            <Breadcrumb
              className="mb-[20px]"
              items={[
                {
                  href: "/admin",
                  title: <HomeOutlined />,
                },
                {
                  href: `${window.location.pathname}`,
                  title: (
                    <>
                      <span className="capitalize">
                        {pathname[2]
                          ? pathname[2].replace("-", " ")
                          : pathname[1]}
                      </span>
                    </>
                  ),
                },
              ]}
            />
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminLayout;

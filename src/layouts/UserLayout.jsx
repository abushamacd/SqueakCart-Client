import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme, Breadcrumb } from "antd";
import { useState } from "react";

import { BsCartCheck, BsShieldLock } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { FaRegAddressCard } from "react-icons/fa";

const UserLayout = () => {
  const { Header, Sider, Content } = Layout;
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const pathname = window.location.pathname.split("/");

  return (
    <Layout className="h-screen md:p-[50px] p-[30px]">
      <Sider
        className="h-[85vh] overflow-hidden hover:overflow-auto"
        trigger={null}
        collapsible
        collapsed={collapsed}
      >
        <div className="logo">
          <Link to="/">
            {collapsed ? (
              <img
                className="p-2 w-[200px] mx-auto"
                src="https://i.ibb.co/MgsTCcv/avater.jpg"
                alt="logo"
              />
            ) : (
              <img
                className="p-4 w-[200px] mx-auto"
                src="https://i.ibb.co/MgsTCcv/avater.jpg"
                alt="logo"
              />
            )}
          </Link>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              navigate(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <CgProfile size={18} />,
              label: "Profile",
            },
            {
              key: "password",
              icon: <BsShieldLock size={18} />,
              label: "Password",
            },
            {
              key: "address",
              icon: <FaRegAddressCard size={18} />,
              label: "Address",
            },
            {
              key: "myorders",
              icon: <BsCartCheck size={18} />,
              label: "My Orders",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          className="flex items-center"
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
          <Breadcrumb
            className=""
            items={[
              {
                href: "/",
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
        </Header>
        <Content
          className="rounded-lg overflow-auto"
          style={{
            margin: "0px 16px",
            padding: 20,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default UserLayout;

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MdDashboard } from "react-icons/md";
import { TbBrandGoogleBigQuery } from "react-icons/tb";
import { useSelector } from "react-redux";
import { FaUserCircle } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();
  const { collapsed } = useSelector((state) => state.site);
  const { Sider } = Layout;

  return (
    <Sider
      className="h-screen overflow-hidden hover:overflow-auto"
      trigger={null}
      collapsible
      collapsed={collapsed}
    >
      <div className="logo">
        <Link to="/">
          {collapsed ? (
            <img
              className="p-2 w-[200px] mx-auto"
              src="images/mobile_logo.png"
              alt="logo"
            />
          ) : (
            <img
              className="p-4 w-[200px] mx-auto"
              src="images/main_logo.png"
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
            icon: <MdDashboard size={18} />,
            label: "Dashboard",
          },
          {
            key: "user-list",
            icon: <FaUserCircle size={18} />,
            label: "Users",
          },
          {
            key: "enquery",
            icon: <TbBrandGoogleBigQuery size={18} />,
            label: "Enquires",
          },
        ]}
      />
    </Sider>
  );
};

export default Sidebar;

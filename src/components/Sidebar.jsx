import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MdDashboard, MdOutlineList } from "react-icons/md";
import { TbBrandGoogleBigQuery, TbCategory } from "react-icons/tb";
import { useSelector } from "react-redux";
import { FaUserCircle, FaBlog } from "react-icons/fa";
import { ImBlog } from "react-icons/im";

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
            key: "blog",
            icon: <FaBlog size={18} />,
            label: "Blogs",
            children: [
              {
                key: "blog-list",
                icon: <MdOutlineList size={18} />,
                label: "Blog List",
              },
              {
                key: "add-blog",
                icon: <ImBlog size={18} />,
                label: "Add Blog",
              },
              {
                key: "blog-cat",
                icon: <TbCategory size={18} />,
                label: "Blog Category",
              },
            ],
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

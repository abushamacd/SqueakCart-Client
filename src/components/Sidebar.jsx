import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Layout, Menu } from "antd";
import { MdDashboard, MdOutlineList, MdColorLens } from "react-icons/md";
import { TbBrandGoogleBigQuery, TbCategory } from "react-icons/tb";
import { useSelector } from "react-redux";
import {
  FaShoppingCart,
  FaUserCircle,
  FaCartPlus,
  FaBlog,
  FaRegNewspaper,
} from "react-icons/fa";
import { ImBlog } from "react-icons/im";
import { RiCouponFill } from "react-icons/ri";
import { SiBrandfolder } from "react-icons/si";
import main_logo from "../assets/main_logo.png";
import mobile_logo from "../assets/mobile_logo.png";

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
              src={mobile_logo}
              alt="logo"
            />
          ) : (
            <img className="p-4 w-[200px] mx-auto" src={main_logo} alt="logo" />
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
            key: "product",
            icon: <FaShoppingCart size={18} />,
            label: "Products",
            children: [
              {
                key: "product-list",
                icon: <MdOutlineList size={18} />,
                label: "Product List",
              },
              {
                key: "add-product",
                icon: <FaCartPlus size={18} />,
                label: "Add Product",
              },
              {
                key: "color",
                icon: <MdColorLens size={18} />,
                label: "Color",
              },
              {
                key: "pro-cat",
                icon: <TbCategory size={18} />,
                label: "Catagories",
              },
              {
                key: "brand",
                icon: <SiBrandfolder size={18} />,
                label: "Brands",
              },
            ],
          },
          {
            key: "coupon",
            icon: <RiCouponFill size={18} />,
            label: "Coupons",
          },
          {
            key: "order",
            icon: <FaRegNewspaper size={18} />,
            label: "Order",
            children: [
              {
                key: "all-order",
                icon: <MdOutlineList size={18} />,
                label: "Order List",
              },
            ],
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

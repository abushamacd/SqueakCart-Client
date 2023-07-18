import { Badge, Button, Dropdown, Layout, Typography, theme } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdNotificationsActive } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../redux/features/site/siteSlice";
import { logout } from "../redux/features/auth/authSlice";
import { Link } from "react-router-dom";

const DBHeader = () => {
  const { Header } = Layout;
  const { Title, Text } = Typography;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { collapsed } = useSelector((state) => state.site);
  const dispatch = useDispatch();

  //   signout
  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  // dropdown
  const items = [
    {
      key: "1",
      label: <Link to="/profile">My Profile</Link>,
    },
    {
      key: "2",
      label: <div onClick={handleSignout}>Sign Out</div>,
    },
  ];

  return (
    <Header
      className="db_header flex justify-between"
      style={{
        padding: 0,
        background: colorBgContainer,
      }}
    >
      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => dispatch(setCollapsed(!collapsed))}
        style={{
          fontSize: "16px",
          width: 64,
          height: 64,
        }}
      />
      <div className="flex justify-center items-center gap-[20px]">
        <Badge count={99}>
          <MdNotificationsActive size={24} />
        </Badge>

        <Dropdown
          menu={{
            items,
          }}
        >
          <div className="flex justify-center items-center gap-1">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img alt="user" src="https://i.ibb.co/MgsTCcv/avater.jpg" />
              </div>
            </div>
            <div className="admin">
              <Title level={5} className="capitalize">
                Admin Name
              </Title>
              <Text> email </Text>
            </div>
          </div>
        </Dropdown>
      </div>
    </Header>
  );
};

export default DBHeader;

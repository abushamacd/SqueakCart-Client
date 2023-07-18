import { Badge, Button, Dropdown, Layout, Typography, theme } from "antd";
import React from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { MdNotificationsActive } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setCollapsed } from "../redux/features/site/siteSlice";

const DBHeader = () => {
  const { Header } = Layout;
  const { Title, Text } = Typography;
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const { collapsed } = useSelector((state) => state.site);
  const dispatch = useDispatch();

  // dropdown
  const items = [
    {
      key: "1",
      label: (
        <a rel="noopener noreferrer" href="https://www.antgroup.com">
          Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a rel="noopener noreferrer" href="https://www.antgroup.com">
          Sign Out
        </a>
      ),
    },
  ];

  //
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
              <div className="w-10 rounded-md">
                <img
                  alt="user"
                  src="https://imglarger.com/Images/before-after/ai-image-enlarger-1-before-2.jpg"
                />
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

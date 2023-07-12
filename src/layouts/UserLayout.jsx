import React from "react";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <>
      <div>Sidebar</div>
      <Outlet />
    </>
  );
};

export default UserLayout;

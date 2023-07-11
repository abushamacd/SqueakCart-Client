import React from "react";
import { Link } from "react-router-dom";

const BreadCrumb = ({ title }) => {
  return (
    <div className="text-sm breadcrumbs py-[20px] ">
      <ul className="justify-center">
        <li className="capitalize text-[#131921]">
          <Link to={"/"}>Home</Link>
        </li>
        <li className="capitalize text-xl font-bold  text-[#131921]">
          <Link to={window.location.pathname}>{title}</Link>
        </li>
      </ul>
    </div>
  );
};

export default BreadCrumb;

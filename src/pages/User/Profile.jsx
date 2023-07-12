import React from "react";
import Head from "../../components/Head";
import BreadCrumb from "../../components/BreadCrumb";

const Profile = () => {
  return (
    <>
      <Head title="My Profile ||" />
      <BreadCrumb title="My Profile" />
      <div className="body_wrapper p-[20px]"></div>
    </>
  );
};

export default Profile;

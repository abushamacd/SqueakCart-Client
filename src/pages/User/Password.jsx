import React from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";

const Password = () => {
  return (
    <>
      <Head title="Change Password ||" />
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <div className="mb-3">
          <Title level={3}>Change Password</Title>
        </div>
        <form action="">
          {/* New Pasword */}
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="oldPassword">Old Password</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="Type old password"
                name="oldPassword"
                id="oldPassword"
              />
            </div>
            <div className="w-full mb-3">
              <label htmlFor="newPassword">New Password</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="Type new password"
                name="newPassword"
                id="newPassword"
              />
            </div>
          </div>
          <button
            type="submit"
            className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
          >
            Update
          </button>
        </form>
      </div>
    </>
  );
};

export default Password;

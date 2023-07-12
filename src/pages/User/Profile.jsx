import React from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";

const Profile = () => {
  return (
    <>
      <Head title="My Profile ||" />
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <div className="mb-3">
          <Title level={3}>Account Settings</Title>
        </div>
        <form action="">
          {/* Name */}
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="firstname">First Name</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="firstname"
                name="firstname"
                id="firstname"
              />
            </div>
            <div className="w-full mb-3">
              <label htmlFor="lastname">Last Name</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="lastname"
                name="lastname"
                id="lastname"
              />
            </div>
          </div>
          {/* Email Password */}
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="email"
                placeholder="email"
                name="email"
                id="email"
              />
            </div>
            <div className="w-full mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="text"
                placeholder="phone"
                name="phone"
                id="phone"
              />
            </div>
          </div>
          {/* Address */}
          <div className="w-full mb-3">
            <label htmlFor="address">Default Address</label>
            <div className="border-1 mb-3">
              <h2>address</h2>
            </div>
            <select
              className="w-full p-2 mb-3 mt-1"
              id="address"
              name="address"
            >
              <option>Please select an one to update address</option>
              <option value="volvo">Volvo</option>
              <option value="saab">Saab</option>
              <option value="fiat">Fiat</option>
              <option value="audi">Audi</option>
            </select>
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

export default Profile;

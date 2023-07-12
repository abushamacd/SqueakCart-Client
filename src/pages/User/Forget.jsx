import React from "react";
import Head from "../../components/Head";
import BreadCrumb from "../../components/BreadCrumb";

const Forget = () => {
  return (
    <>
      <Head title="Forget Password ||" />
      <BreadCrumb title="Forget Password" />
      <div className="body_wrapper p-[20px]">
        <div className="user_form rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[15px] text-xl font-bold">
            Reset Your Password
          </h3>
          <p className="text-sm text-center mb-[20px] text-gray-500">
            We will send you an email to reset your password
          </p>
          <form action="">
            <input
              className="w-full p-2 mb-3"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
            />
            <div className="flex flex-col justify-center items-center gap-[10px] mt-[10px]">
              <button
                type="submit"
                className="first_button w-24 duration-300 rounded-full py-[8px] px-[20px] font-medium "
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Forget;

import React, { useEffect } from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useSignInMutation } from "../redux/features/auth/authApi";

const SignIn = () => {
  const navigate = useNavigate();
  const [signIn, { error, isError, isSuccess, reset }] = useSignInMutation();

  useEffect(() => {
    if (isSuccess) {
      toast("Login successful");
      reset();
      navigate("/");
    } else if (isError) {
      toast.error(`Login failed. ${error.data.message}`);
      reset();
    }
  }, [isSuccess, isError, error, reset, navigate]);

  let formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      signIn(values);
      // resetForm();
    },
  });

  //   useEffect(() => {
  //     if (!user == null || isSuccess) {
  //       navigate("/");
  //       toast("Login Successful");
  //     } else if (isError) {
  //       toast.error("Login Failed");
  //     }
  //   }, [user, isSuccess, navigate, isError]);

  return (
    <>
      <Head title="Sign In ||" />
      <BreadCrumb title="Sign In" />
      <div className="body_wrapper p-[20px]">
        <div className="user_form rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[20px] text-xl font-bold">
            Login
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <input
              className="w-full p-2 mb-3"
              type="email"
              placeholder="Email"
              name="email"
              id="email"
              onChange={formik.handleChange("email")}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.email}
              </div>
            ) : null}

            <input
              className="w-full p-2 mb-3"
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              onChange={formik.handleChange("password")}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.password}
              </div>
            ) : null}

            <Link to="/forget">
              <p className="text-sm font-bold">Forget Password ?</p>
            </Link>
            <div className="flex justify-center gap-[30px] mt-[20px]">
              <Link to="/register">
                <p className="first_button  cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium ">
                  Sign Up
                </p>
              </Link>
              <button
                type="submit"
                className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignIn;

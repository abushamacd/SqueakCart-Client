import React, { useEffect } from "react";
import Head from "../../components/Head";
import BreadCrumb from "../../components/BreadCrumb";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSignUpMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [signUp, { error, isError, isSuccess, reset }] = useSignUpMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast("Sign up successful");
      reset();
      navigate("/login");
    } else if (isError) {
      toast.error(`Sign up failed. ${error.data.message}`);
      reset();
    }
  }, [isSuccess, isError, error, reset, navigate]);

  // form handle
  let formSchema = Yup.object().shape({
    firstname: Yup.string().required("First name is required"),
    lastname: Yup.string().required("Last name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      password: "",
    },

    validationSchema: formSchema,
    onSubmit: (values, { resetForm }) => {
      signUp(values);
      // resetForm();
    },
  });
  return (
    <>
      <Head title="Sign Up ||" />
      <BreadCrumb title="Sign Up" />
      <div className="body_wrapper p-[20px]">
        <div className="user_form rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[20px] text-xl font-bold">
            create new account
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <input
              className="w-full p-2 mb-3"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First Name"
              onChange={formik.handleChange("firstname")}
              value={formik.values.firstname}
            />
            {formik.touched.firstname && formik.errors.firstname ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.firstname}
              </div>
            ) : null}
            <input
              className="w-full p-2 mb-3"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last Name"
              onChange={formik.handleChange("lastname")}
              value={formik.values.lastname}
            />
            {formik.touched.lastname && formik.errors.lastname ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.lastname}
              </div>
            ) : null}
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
              type="phone"
              placeholder="Phone number"
              name="phone"
              id="phone"
              onChange={formik.handleChange("phone")}
              value={formik.values.phone}
            />
            {formik.touched.phone && formik.errors.phone ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.phone}
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
            <Link to="/login">
              <p className="text-sm font-bold">Already have an account?</p>
            </Link>
            <div className="flex justify-center gap-[30px] mt-[20px]">
              <button
                type="submit"
                className="first_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;

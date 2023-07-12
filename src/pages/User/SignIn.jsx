import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import Head from "../../components/Head";
import BreadCrumb from "../../components/BreadCrumb";
import { useSignInMutation } from "../../redux/features/auth/authApi";
import { login } from "../../redux/features/auth/authSlice";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let { state } = useLocation();
  let path = state?.path || "/";
  const [signIn, { data, error, isError, isSuccess, reset }] =
    useSignInMutation();
  const accessToken = data?.data?.accessToken;
  if (accessToken) {
    localStorage.setItem("token", JSON.stringify(accessToken));
  }

  useEffect(() => {
    if (isSuccess) {
      toast("Login successful");
      if (accessToken) {
        const decoded = jwtDecode(accessToken);
        dispatch(login({ decoded, accessToken }));
      }
      reset();
      navigate(path, { replace: true });
    } else if (isError) {
      toast.error(`Login failed. ${error.data.message}`);
      reset();
    }
  }, [isSuccess, isError, error, reset, navigate, accessToken, dispatch, path]);

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
      resetForm();
    },
  });

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

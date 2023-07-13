import React, { useEffect } from "react";
import Head from "../../components/Head";
import BreadCrumb from "../../components/BreadCrumb";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useResetPasswordMutation } from "../../redux/features/auth/authApi";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Reset = () => {
  const { pathname } = useLocation();
  const token = pathname.split("/")[2];
  const [resetPassword, { error, isError, isSuccess, reset }] =
    useResetPasswordMutation();
  let formSchema = Yup.object().shape({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      const { password } = values;
      const data = { password };
      resetPassword({ token, data });
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast("Password reset successfully");
      reset();
    } else if (isError) {
      toast.error(`${error.data.message}`);
      reset();
    }
  }, [isSuccess, isError, error, reset]);
  return (
    <>
      <Head title="Reset Password ||" />
      <BreadCrumb title="Reset Password" />
      <div className="body_wrapper p-[20px]">
        <div className="user_form rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[15px] text-xl font-bold">
            Reset Your Password
          </h3>
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full mb-3">
              <label htmlFor="password">New Password</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="password"
                placeholder="Type new password"
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
            </div>
            <div className="w-full mb-3">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="password"
                placeholder="Type new password again"
                name="confirmPassword"
                id="confirmPassword"
                onChange={formik.handleChange("confirmPassword")}
                value={formik.values.confirmPassword}
              />
              {formik.touched.confirmPassword &&
              formik.errors.confirmPassword ? (
                <div className="formik_err text-sm text-red-600">
                  {formik.errors.confirmPassword}
                </div>
              ) : null}
            </div>
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

export default Reset;

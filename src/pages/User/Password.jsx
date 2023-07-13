import React, { useEffect } from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useChangePasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const Password = () => {
  const [changePassword, { error, isError, isSuccess, reset }] =
    useChangePasswordMutation();

  let formSchema = Yup.object().shape({
    oldPassword: Yup.string().required("Old password is required"),
    newPassword: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      const { oldPassword, newPassword } = values;
      const data = { oldPassword, newPassword };
      changePassword(data);
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast("Password change successfully");
      reset();
    } else if (isError) {
      toast.error(`Password change failed. ${error.data.message}`);
      reset();
    }
  }, [isSuccess, isError, error, reset]);

  return (
    <>
      <Head title="Change Password ||" />
      <div className="overflow-auto bg-white box_shadow rounded-lg p-[20px]">
        <div className="mb-3">
          <Title level={3}>Change Password</Title>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {/* New Pasword */}
          <div className="w-full mb-3">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              className="w-full p-2 mb-3 mt-1"
              type="password"
              placeholder="Type old password"
              name="oldPassword"
              id="oldPassword"
              onChange={formik.handleChange("oldPassword")}
              value={formik.values.oldPassword}
            />
            {formik.touched.oldPassword && formik.errors.oldPassword ? (
              <div className="formik_err text-sm text-red-600">
                {formik.errors.oldPassword}
              </div>
            ) : null}
          </div>
          <div className="md:flex gap-5">
            <div className="w-full mb-3">
              <label htmlFor="newPassword">New Password</label>
              <input
                className="w-full p-2 mb-3 mt-1"
                type="password"
                placeholder="Type new password"
                name="newPassword"
                id="newPassword"
                onChange={formik.handleChange("newPassword")}
                value={formik.values.newPassword}
              />
              {formik.touched.newPassword && formik.errors.newPassword ? (
                <div className="formik_err text-sm text-red-600">
                  {formik.errors.newPassword}
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

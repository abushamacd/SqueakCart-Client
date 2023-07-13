import React, { useEffect } from "react";
import Head from "../../components/Head";
import BreadCrumb from "../../components/BreadCrumb";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useForgetPasswordMutation } from "../../redux/features/auth/authApi";
import { toast } from "react-toastify";

const Forget = () => {
  const [forgetPassword, { error, isError, isSuccess, reset }] =
    useForgetPasswordMutation();
  let formSchema = Yup.object().shape({
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      forgetPassword(values);
      resetForm();
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast("Send email successfully");
      reset();
    } else if (isError) {
      toast.error(`${error.data.message}`);
      reset();
    }
  }, [isSuccess, isError, error, reset]);
  return (
    <>
      <Head title="Forget Password ||" />
      <BreadCrumb title="Forget Password" />
      <div className="body_wrapper p-[20px]">
        <div className="user_form rounded-lg bg-white md:w-[400px] md:my-[50px] p-[20px] mx-auto layout">
          <h3 className="login text-center capitalize mb-[15px] text-xl font-bold">
            Forget Your Password
          </h3>
          <p className="text-sm text-center mb-[20px] text-gray-500">
            We will send you an email to reset your password
          </p>
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

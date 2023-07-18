import React, { useEffect } from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useCreateContactMutation } from "../redux/features/contact/contactApi";
import Loading from "../components/Loading";

const Contact = () => {
  const [createContact, { isLoading, isSuccess, data, isError, error, reset }] =
    useCreateContactMutation();

  // form handle
  let formSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    message: Yup.string().required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      createContact(values);
      resetForm();
    },
  });

  // notification
  useEffect(() => {
    if (isSuccess) {
      toast(data?.message);
      reset();
    } else if (isError) {
      toast.error(error?.data?.message);
      reset();
    }
  }, [isSuccess, data, isError, error, reset]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <Head title="Contact Us ||" />
      <div className="">
        <BreadCrumb title="Contact Us" />
        <div className="body_wrapper md:p-[30px] p-[20px] ">
          <div className="bg-white p-[20px] rounded-lg policy layout">
            <section className="text-gray-600 body-font relative">
              <div className="container  mx-auto flex sm:flex-nowrap flex-wrap">
                <div className="lg:w-2/3 md:w-1/2 bg-gray-300 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
                  <iframe
                    width="100%"
                    height="100%"
                    className="absolute inset-0"
                    frameBorder="0"
                    title="map"
                    marginHeight="0"
                    marginWidth="0"
                    scrolling="no"
                    src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
                    style={{
                      filter: "grayscale(1) contrast(1.2) opacity(0.4)",
                    }}
                  ></iframe>
                  <div className="bg-white relative flex flex-wrap py-6 rounded shadow-md">
                    <div className="lg:w-1/2 px-6">
                      <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                        ADDRESS
                      </h2>
                      <p className="mt-1">
                        Photo booth tattooed prism, portland taiyaki hoodie
                        neutra typewriter
                      </p>
                    </div>
                    <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                      <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs">
                        EMAIL
                      </h2>
                      <Link
                        to="mailto:example@email.com"
                        className="text-indigo-500 leading-relaxed"
                      >
                        example@email.com
                      </Link>
                      <h2 className="title-font font-semibold text-gray-900 tracking-widest text-xs mt-4">
                        PHONE
                      </h2>
                      <p className="leading-relaxed">123-456-7890</p>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/3 md:w-1/2 bg-white flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
                  <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                    Feedback
                  </h2>
                  <p className="leading-relaxed mb-5 text-gray-600">
                    Post-ironic portland shabby chic echo park, banjo fashion
                    axe
                  </p>

                  <form onSubmit={formik.handleSubmit}>
                    <div className="relative mb-4">
                      <label
                        htmlFor="name"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={formik.handleChange("name")}
                        value={formik.values.name}
                      />
                      {formik.touched.name && formik.errors.name ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.name}
                        </div>
                      ) : null}
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-white rounded border border-gray-300  outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        onChange={formik.handleChange("email")}
                        value={formik.values.email}
                      />
                      {formik.touched.email && formik.errors.email ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.email}
                        </div>
                      ) : null}
                    </div>
                    <div className="relative mb-4">
                      <label
                        htmlFor="message"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        className="w-full bg-white rounded border border-gray-300 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        onChange={formik.handleChange("message")}
                        value={formik.values.message}
                      ></textarea>
                      {formik.touched.message && formik.errors.message ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.message}
                        </div>
                      ) : null}
                    </div>
                    <button
                      type="submit"
                      className="first_button py-2 px-6 rounded text-lg"
                    >
                      Send
                    </button>
                  </form>
                  <p className="text-xs text-gray-500 mt-3">
                    Chicharrones blog helvetica normcore iceland tousled brook
                    viral artisan.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import {
  useAddUserAddressMutation,
  useUpdateUserAddressMutation,
} from "../redux/features/user/userApi";
import { toast } from "react-toastify";

const AddressModal = ({ addresModal, setAddressModal }) => {
  const [addUserAddress, { error, isError, isSuccess, reset }] =
    useAddUserAddressMutation();

  const [
    updateUserAddress,
    {
      error: updateError,
      isError: updateIsError,
      isSuccess: updateIsSuccess,
      reset: updateReset,
    },
  ] = useUpdateUserAddressMutation();

  let formSchema = Yup.object().shape({
    addressline1: Yup.string().required("addressline1 is required"),
    zipCode: Yup.string().required("zipCode is required"),
    city: Yup.string().required("city is required"),
    country: Yup.string().required("country is required"),
  });

  const formik = useFormik({
    initialValues: {
      addressline1: "",
      addressline2: "",
      city: "",
      zipCode: "",
      state: "",
      country: "",
    },

    validationSchema: formSchema,

    onSubmit: (values, { resetForm }) => {
      resetForm();
      if (addresModal._id) {
        updateUserAddress({
          id: addresModal._id,
          data: values,
        });
      } else {
        addUserAddress(values);
      }
    },
  });

  useEffect(() => {
    if (addresModal._id) {
      const { addressline1, addressline2, city, zipCode, state, country } =
        addresModal;
      formik.setValues({
        addressline1,
        addressline2,
        city,
        zipCode,
        state,
        country,
      });
    }
    if (isSuccess) {
      toast("Address added successfully");
      reset();
    } else if (isError) {
      toast.error(`Address added failed. ${error.data.message}`);
      reset();
    }
    if (updateIsSuccess) {
      toast("Address updated successfully");
      updateReset();
    } else if (updateIsError) {
      toast.error(`Address updated failed. ${updateError.data.message}`);
      updateReset();
    }
  }, [
    addresModal,
    error,
    isError,
    isSuccess,
    reset,
    updateError,
    updateIsError,
    updateIsSuccess,
    updateReset,
  ]);
  return (
    <div>
      <input type="checkbox" id="addressModal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-5xl">
          <label
            onClick={() => setAddressModal(null)}
            htmlFor="addressModal"
            className="btn btn-sm btn-circle first_button duration-300  absolute right-2 top-2"
          >
            ✕
          </label>
          <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 mx-auto">
              <div className="lg:w-full mx-auto">
                {/* form */}
                <form onSubmit={formik.handleSubmit}>
                  {/* Name */}
                  <div className="md:flex gap-5">
                    <div className="w-full mb-3">
                      <label htmlFor="addressline1">Address Line 1</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="addressline1"
                        name="addressline1"
                        id="addressline1"
                        onChange={formik.handleChange("addressline1")}
                        value={formik.values.addressline1}
                      />
                      {formik.touched.addressline1 &&
                      formik.errors.addressline1 ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.addressline1}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-full mb-3">
                      <label htmlFor="addressline2">Address Line 2</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="addressline2"
                        name="addressline2"
                        id="addressline2"
                        onChange={formik.handleChange("addressline2")}
                        value={formik.values.addressline2}
                      />
                    </div>
                  </div>
                  {/* Name */}
                  <div className="md:flex gap-5">
                    <div className="w-full mb-3">
                      <label htmlFor="zipCode">Zip Code</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="zipCode"
                        name="zipCode"
                        id="zipCode"
                        onChange={formik.handleChange("zipCode")}
                        value={formik.values.zipCode}
                      />
                      {formik.touched.zipCode && formik.errors.zipCode ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.zipCode}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-full mb-3">
                      <label htmlFor="city">City</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="city"
                        name="city"
                        id="city"
                        onChange={formik.handleChange("city")}
                        value={formik.values.city}
                      />
                      {formik.touched.city && formik.errors.city ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.city}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/* Name */}
                  <div className="md:flex gap-5">
                    <div className="w-full mb-3">
                      <label htmlFor="state">State</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="state"
                        name="state"
                        id="state"
                        onChange={formik.handleChange("state")}
                        value={formik.values.state}
                      />
                    </div>
                    <div className="w-full mb-3">
                      <label htmlFor="country">Country</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="country"
                        name="country"
                        id="country"
                        onChange={formik.handleChange("country")}
                        value={formik.values.country}
                      />
                      {formik.touched.country && formik.errors.country ? (
                        <div className="formik_err text-sm text-red-600">
                          {formik.errors.country}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  {/*  */}
                  <button
                    type="submit"
                    className="second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
                  >
                    Add
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;

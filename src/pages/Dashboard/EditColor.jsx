import React, { useEffect } from "react";
import { Button, Typography } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import { useUpdateColorMutation } from "../../redux/features/color/colorApi";
import { Input } from "antd";
import { Dropdown } from "antd";
import { Panel } from "rc-color-picker";
import { setInternalColor } from "../../redux/features/color/colorSlice";

const EditColor = () => {
  const dispatch = useDispatch();
  const { Title } = Typography;
  const navigate = useNavigate();

  // Redux Hooks
  const { edit } = useSelector((state) => state.site);
  const { internalColor } = useSelector((state) => state.color);

  const [
    updateColor,
    {
      isLoading: updateIsLoading,
      isSuccess: updateIsSuccess,
      data: updateData,
      isError: updateIsError,
      error: updateError,
      reset: updateReset,
    },
  ] = useUpdateColorMutation();

  // Handle Form
  let couponSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
  });

  const updateform = useFormik({
    initialValues: {
      title: edit?.data?.title,
      code: "",
    },
    validationSchema: couponSchema,

    onSubmit: (values) => {
      updateColor({ id: edit?.data?._id, data: values });
    },
  });

  // Notification
  useEffect(() => {
    updateform.values.code = internalColor;
    if (updateIsSuccess) {
      toast(updateData?.message);
      updateform.resetForm();
      updateReset();
      navigate("/admin/color");
    } else if (updateIsError) {
      toast.error(updateError?.data?.message);
      updateReset();
    }
  }, [
    updateform,
    internalColor,
    navigate,
    updateIsSuccess,
    updateIsError,
    updateData,
    updateError,
    updateReset,
  ]);

  if (updateIsLoading) {
    return <Loading />;
  }
  return (
    <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
      <Title level={4}>Edit Color</Title>
      <form onSubmit={updateform.handleSubmit}>
        <div className="my-4">
          <label htmlFor="colorName" className=" font-bold text-sm">
            Color Name
          </label>
          <input
            onChange={updateform.handleChange("title")}
            value={updateform.values.title}
            placeholder="Color name"
            type="text"
            id="colorName"
            name="colorName"
            className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
          />
          {updateform.touched.title && updateform.errors.title ? (
            <div className="formik_err text-sm text-red-600">
              {updateform.errors.title}
            </div>
          ) : null}
        </div>
        <div className="my-4">
          <label htmlFor="colorCode" className=" font-bold text-sm">
            Color Code
          </label>

          <div className="flex justify-between items-center">
            <Input
              disabled
              value={internalColor || ""}
              suffix={
                <Dropdown
                  trigger={["click"]}
                  overlay={
                    <Panel
                      color={internalColor}
                      enableAlpha={false}
                      onChange={(color) => {
                        dispatch(setInternalColor(color.color));
                      }}
                    />
                  }
                >
                  <Button style={{ background: internalColor }}> </Button>
                </Dropdown>
              }
            />
          </div>
          {updateform.touched.code && updateform.errors.code ? (
            <div className="formik_err text-sm text-red-600">
              {updateform.errors.code}
            </div>
          ) : null}
        </div>
        <button
          type="submit"
          className="first_button rounded-md px-5 py-1 text-sm text-white uppercase"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditColor;

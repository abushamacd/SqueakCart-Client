import React, { useEffect } from "react";
import { Typography, Table, Button } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateColorMutation,
  useDeleteColorMutation,
  useGetColorsQuery,
} from "../../redux/features/color/colorApi";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEdit } from "../../redux/features/site/siteSlice";
import { FiEdit } from "react-icons/fi";
import { Input } from "antd";
import { Dropdown } from "antd";
import Panel from "rc-color-picker/lib/Panel";
import { setInternalColor } from "../../redux/features/color/colorSlice";

const Color = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title } = Typography;
  const columns = [
    {
      title: "No.",
      dataIndex: "no",
      key: "no",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  // Redux Hooks
  const { internalColor } = useSelector((state) => state.color);
  const [
    createColor,
    {
      isSuccess: createIsSuccess,
      data: createData,
      isError: createIsError,
      error: createError,
      reset: createReset,
    },
  ] = useCreateColorMutation();

  const { data: getData, isLoading: getIsLoading } = useGetColorsQuery();
  const colors = getData?.data?.data;

  const [
    deleteColor,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteColorMutation();

  // Handle Action
  const handleDelete = (contact) => {
    deleteColor(contact._id);
  };

  const openEdit = (color) => {
    dispatch(setEdit({ data: color, state: true }));
    dispatch(setInternalColor(color.code));
    navigate("/admin/color-edit");
  };

  // Data Processing
  const tableData = [];
  for (let i = 0; i < colors?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: <div className="capitalize">{colors[i]?.title}</div>,
      code: <div className={`bg-[${colors[i]?.code}]`}>{colors[i]?.code}</div>,
      action: (
        <div className="flex gap-2">
          <FiEdit
            size={22}
            onClick={() => openEdit(colors[i])}
            className="text-orange-400"
          />
          <MdDeleteForever
            onClick={() => handleDelete(colors[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // Handle Form
  let formSchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
    code: Yup.string().required("Code is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
      code: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      createColor(values);
    },
  });

  // Notification
  useEffect(() => {
    addForm.values.code = internalColor;
    if (createIsSuccess || deleteIsSuccess) {
      toast(createData?.message || deleteData?.message);
      createReset();
      deleteReset();
      addForm.resetForm();
    } else if (createIsError || deleteIsError) {
      toast.error(createError?.data?.message || deleteError?.data?.message);
      createReset();
      deleteReset();
    }
  }, [
    addForm,
    internalColor,
    createData,
    createError,
    createIsError,
    createIsSuccess,
    createReset,
    deleteData,
    deleteError,
    deleteIsError,
    deleteIsSuccess,
    deleteReset,
  ]);

  if (getIsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3}>Product Colors</Title>
      <div className="blog md:flex justify-between mt-[20px]">
        <div className="md:w-[70%] recent_order overflow-auto  bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px]  ">
          <Title className="capitalize" level={4}>
            Color List
          </Title>
          <Table className="mt-4" columns={columns} dataSource={tableData} />
        </div>
        <div className="md:w-[28%]">
          <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Add New Color</Title>
            <form onSubmit={addForm.handleSubmit}>
              <div className="my-4">
                <label htmlFor="blogName" className=" font-bold text-sm">
                  Color Name
                </label>
                <input
                  onChange={addForm.handleChange("title")}
                  value={addForm.values.title}
                  placeholder="Type color name"
                  type="text"
                  id="blogName"
                  name="blogName"
                  className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                />
                {addForm.touched.title && addForm.errors.title ? (
                  <div className="formik_err text-sm text-red-600">
                    {addForm.errors.title}
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
                {addForm.touched.code && addForm.errors.code ? (
                  <div className="formik_err text-sm text-red-600">
                    {addForm.errors.code}
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
        </div>
      </div>
    </div>
  );
};

export default Color;

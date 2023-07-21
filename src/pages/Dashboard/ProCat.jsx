import React, { useEffect } from "react";
import { Typography, Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateProCatMutation,
  useDeleteProCatMutation,
  useGetProCatsQuery,
} from "../../redux/features/proCat/proCatApi";
import Loading from "../../components/Loading";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEdit } from "../../redux/features/site/siteSlice";
import { FiEdit } from "react-icons/fi";

const ProCat = () => {
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
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];

  // Redux Hooks
  const [
    createProCat,
    {
      isSuccess: createIsSuccess,
      data: createData,
      isError: createIsError,
      error: createError,
      reset: createReset,
    },
  ] = useCreateProCatMutation();

  const { data: getData, isLoading: getIsLoading } = useGetProCatsQuery();
  const proCats = getData?.data?.data;

  const [
    deleteProCat,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteProCatMutation();

  // Handle Action
  const handleDelete = (contact) => {
    deleteProCat(contact._id);
  };

  const openEdit = (proCat) => {
    dispatch(setEdit({ data: proCat, state: true }));
    navigate("/admin/procat-edit");
  };

  // Data Processing
  const tableData = [];
  for (let i = 0; i < proCats?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: <div className="capitalize">{proCats[i]?.title}</div>,
      action: (
        <div className="flex gap-2">
          <FiEdit
            size={22}
            onClick={() => openEdit(proCats[i])}
            className="text-orange-400"
          />
          <MdDeleteForever
            onClick={() => handleDelete(proCats[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // Handle Form
  let proCategorySchema = Yup.object().shape({
    title: Yup.string().required("Name is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
    },
    validationSchema: proCategorySchema,
    onSubmit: (values, { resetForm }) => {
      createProCat(values);
      resetForm();
    },
  });

  // Notification
  useEffect(() => {
    if (createIsSuccess || deleteIsSuccess) {
      toast(createData?.message || deleteData?.message);
      createReset();
      deleteReset();
    } else if (createIsError || deleteIsError) {
      toast.error(createError?.data?.message || deleteError?.data?.message);
      createReset();
      deleteReset();
    }
  }, [
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
      <Title level={3}>Product Category</Title>
      <div className="proCat md:flex justify-between mt-[20px]">
        <div className="md:w-[70%] recent_order overflow-auto  bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px]  ">
          <Title className="capitalize" level={4}>
            Category List
          </Title>
          <Table className="mt-4" columns={columns} dataSource={tableData} />
        </div>
        <div className="md:w-[28%]">
          <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Add New Category</Title>
            <form onSubmit={addForm.handleSubmit}>
              <div className="my-4">
                <label htmlFor="proCatName" className=" font-bold text-sm">
                  Category Name
                </label>
                <input
                  onChange={addForm.handleChange("title")}
                  value={addForm.values.title}
                  placeholder="Product Category"
                  type="text"
                  id="proCatName"
                  name="proCatName"
                  className="w-full bg-white rounded border border-gray-300 outline-none text-gray-700 py-1 px-3 mt-2 leading-8 transition-colors duration-200 ease-in-out"
                />
                {addForm.touched.title && addForm.errors.title ? (
                  <div className="formik_err text-sm text-red-600">
                    {addForm.errors.title}
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

export default ProCat;

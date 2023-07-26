import React, { useEffect } from "react";
import { Typography, Table, Spin, Modal } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateProCatMutation,
  useDeleteProCatMutation,
  useGetProCatsQuery,
  useUploadProCatImageMutation,
  useDeleteProCatImageMutation,
} from "../../redux/features/proCat/proCatApi";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEdit, setView } from "../../redux/features/site/siteSlice";
import { FiEdit } from "react-icons/fi";
import {
  clearImage,
  setDeleteImages,
  setUploadImages,
} from "../../redux/features/proCat/proCatSlice";
import Dropzone from "react-dropzone";
import { AiOutlineDelete } from "react-icons/ai";
import { FaRegEye } from "react-icons/fa";

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
  const { view } = useSelector((state) => state.site);
  const { proCatImages } = useSelector((state) => state.proCat);

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

  const [
    uploadProCatImage,
    {
      isLoading: imageUploadIsLoading,
      data: imageUploadData,
      reset: imageUploadReset,
    },
  ] = useUploadProCatImageMutation();

  const [deleteProCatImage, { isLoading: imageDeleteIsLoading }] =
    useDeleteProCatImageMutation();

  // Handle Action
  const handleDelete = (contact) => {
    deleteProCat(contact._id);
  };

  const openView = (product) => {
    dispatch(setView({ data: product, state: true }));
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  const openEdit = (proCat) => {
    dispatch(setEdit({ data: proCat, state: true }));
    dispatch(setDeleteImages(proCat?.images));
    navigate("/admin/procat-edit");
  };

  const handleImgUpload = (image) => {
    const formData = new FormData();
    image.forEach((image) => {
      formData.append("images", image);
    });
    uploadProCatImage(formData);
  };

  const handleImgDelete = (id) => {
    deleteProCatImage(id);
    const rest = proCatImages.filter((img) => img.public_id !== id);
    dispatch(setDeleteImages(rest));
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
          <FaRegEye
            onClick={() => openView(proCats[i])}
            size={22}
            className="text-green-700"
          />
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
    images: Yup.array().required("Image is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
      images: "",
    },
    validationSchema: proCategorySchema,
    onSubmit: (values) => {
      createProCat(values);
    },
  });

  // Notification
  useEffect(() => {
    addForm.values.images = proCatImages;
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
    addForm.values,
    proCatImages,
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

  // Handle Image
  useEffect(() => {
    if (imageUploadData) {
      dispatch(setUploadImages(imageUploadData?.data[0]));
      imageUploadReset();
    }
  }, [dispatch, imageUploadData, imageUploadReset]);

  if (getIsLoading) {
    return <Loading />;
  }
  console.log(view.data);
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
        <Modal
          title={`Category ID: ${view.data?._id}`}
          open={view.viewState}
          centered
          footer={null}
          onCancel={closeView}
        >
          <div className="">
            <h2 className="capitalize text-lg">
              Category: {view?.data?.title}
            </h2>
            <img
              className="h-[150px] w-[150px] mt-4 rounded-lg"
              src={view?.data?.images[0].url}
              alt=""
            />
          </div>
        </Modal>
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
              <div className="product_picture my-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-sm">
                    Product Category Picture
                  </h1>
                  <div onClick={() => dispatch(clearImage())}>
                    <h6 className="text-red-600 cursor-pointer">Clear</h6>
                  </div>
                </div>
                <div className="show_upload_images mt-4 flex flex-wrap">
                  {proCatImages?.map((image, i) => (
                    <div key={i} className="relative w-[50%] p-1">
                      <button
                        onClick={() => handleImgDelete(image?.public_id)}
                        className="absolute right-1 top-1 duration-300 bg-white p-1 rounded-full"
                      >
                        <AiOutlineDelete color="red" />
                      </button>
                      <img
                        className=" rounded-md md:h-[120px] h-[110px] md:w-[120px] w-[110px]  object-cover"
                        alt="product img"
                        src={image?.url}
                      />
                    </div>
                  ))}
                  {(imageUploadIsLoading || imageDeleteIsLoading) && (
                    <Spin size="large" />
                  )}
                </div>
                <div className="mt-4 border rounded-md text-center p-4">
                  <Dropzone
                    onDrop={(acceptedFiles) => handleImgUpload(acceptedFiles)}
                  >
                    {({ getRootProps, getInputProps }) => (
                      <section>
                        <div {...getRootProps()}>
                          <input {...getInputProps()} />
                          <p>Upload Image</p>
                        </div>
                      </section>
                    )}
                  </Dropzone>
                </div>
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

import React, { useEffect } from "react";
import { Typography, Table, Spin, Modal } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import {
  useCreateBrandMutation,
  useDeleteBrandImageMutation,
  useDeleteBrandMutation,
  useGetBrandsQuery,
  useUploadBrandImageMutation,
} from "../../redux/features/brand/brandApi";
import Loading from "../../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setEdit, setView } from "../../redux/features/site/siteSlice";
import { FiEdit } from "react-icons/fi";
import {
  clearImage,
  setDeleteImages,
  setUploadImages,
} from "../../redux/features/brand/brandSlice";
import { AiOutlineDelete } from "react-icons/ai";
import Dropzone from "react-dropzone";
import { FaRegEye } from "react-icons/fa";

const Brand = () => {
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
    createBrand,
    {
      isSuccess: createIsSuccess,
      data: createData,
      isError: createIsError,
      error: createError,
      reset: createReset,
    },
  ] = useCreateBrandMutation();

  const { data: getData, isLoading: getIsLoading } = useGetBrandsQuery();
  const brands = getData?.data?.data;

  const { view } = useSelector((state) => state.site);

  const [
    deleteBrand,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteBrandMutation();

  const [
    uploadBrandImage,
    {
      isLoading: imageUploadIsLoading,
      data: imageUploadData,
      reset: imageUploadReset,
    },
  ] = useUploadBrandImageMutation();

  const [deleteBrandImage, { isLoading: imageDeleteIsLoading }] =
    useDeleteBrandImageMutation();

  const { brandImages } = useSelector((state) => state.brand);

  // Handle Action
  const handleDelete = (contact) => {
    deleteBrand(contact._id);
  };

  const openView = (brand) => {
    dispatch(setView({ data: brand, state: true }));
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  const openEdit = (brand) => {
    dispatch(setEdit({ data: brand, state: true }));
    dispatch(setDeleteImages(brand?.images));
    navigate("/admin/brand-edit");
  };

  const handleImgUpload = (image) => {
    const formData = new FormData();
    image.forEach((image) => {
      formData.append("images", image);
    });
    uploadBrandImage(formData);
  };

  const handleImgDelete = (id) => {
    deleteBrandImage(id);
    const rest = brandImages.filter((img) => img.public_id !== id);
    dispatch(setDeleteImages(rest));
  };

  // Data Processing
  const tableData = [];
  for (let i = 0; i < brands?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData.length + 1,
      name: <div className="capitalize">{brands[i]?.title}</div>,
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(brands[i])}
            size={22}
            className="text-green-700"
          />
          <FiEdit
            size={22}
            onClick={() => openEdit(brands[i])}
            className="text-orange-400"
          />
          <MdDeleteForever
            onClick={() => handleDelete(brands[i])}
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
    images: Yup.array().required("Image is required"),
  });

  const addForm = useFormik({
    initialValues: {
      title: "",
      images: "",
    },
    validationSchema: formSchema,
    onSubmit: (values) => {
      createBrand(values);
    },
  });

  // Notification
  useEffect(() => {
    addForm.values.images = brandImages;
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
    brandImages,
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

  return (
    <div>
      <Title level={3}>Brands</Title>
      <div className="blog md:flex justify-between mt-[20px]">
        <div className="md:w-[70%] recent_order overflow-auto  bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px]  ">
          <Title className="capitalize" level={4}>
            Brand List
          </Title>
          <Table className="mt-4" columns={columns} dataSource={tableData} />
        </div>
        <Modal
          title={`Brand ID: ${view.data?._id}`}
          open={view.viewState}
          centered
          footer={null}
          onCancel={closeView}
        >
          <div className="">
            <h2 className="capitalize text-lg">Brand: {view?.data?.title}</h2>
            <img
              className="h-[150px] w-[150px] mt-4 rounded-lg"
              src={view?.data?.images[0]?.url}
              alt=""
            />
          </div>
        </Modal>
        <div className="md:w-[28%]">
          <div className="visibility bg-white box_shadow p-[20px] rounded-lg">
            <Title level={4}>Add New Brand</Title>
            <form onSubmit={addForm.handleSubmit}>
              <div className="my-4">
                <label htmlFor="blogName" className=" font-bold text-sm">
                  Brand Name
                </label>
                <input
                  onChange={addForm.handleChange("title")}
                  value={addForm.values.title}
                  placeholder="Type brand name"
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
              <div className="product_picture my-4">
                <div className="flex justify-between items-center">
                  <h1 className="font-bold text-sm">Brand Picture</h1>
                  <div onClick={() => dispatch(clearImage())}>
                    <h6 className="text-red-600 cursor-pointer">Clear</h6>
                  </div>
                </div>
                <div className="show_upload_images mt-4 flex flex-wrap">
                  {brandImages?.map((image, i) => (
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

export default Brand;

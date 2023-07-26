import React, { useEffect, useState } from "react";
import { Typography, Table } from "antd";
import { MdDeleteForever } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { FaRegEye } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import {
  useDeleteProductMutation,
  useGetProductsQuery,
} from "../../redux/features/product/productApi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";
import { setEdit, setView } from "../../redux/features/site/siteSlice";
import { Modal } from "antd";
import { useNavigate } from "react-router-dom";
import { setDeleteImages } from "../../redux/features/product/productSlice";
import Slider from "react-slick";
import ReactStars from "react-rating-stars-component";

const ProductList = () => {
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
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Brand",
      dataIndex: "brand",
      key: "brand",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  var image_settings = {
    arrows: false,
  };
  const [nav1, setNav1] = useState();
  const [nav2, setNav2] = useState();

  // Redux Hooks
  const { data: productData, isLoading: productIsLoading } =
    useGetProductsQuery();
  const products = productData?.data?.data;

  const [
    deleteProduct,
    {
      isSuccess: deleteIsSuccess,
      data: deleteData,
      isError: deleteIsError,
      error: deleteError,
      reset: deleteReset,
    },
  ] = useDeleteProductMutation();
  const { view } = useSelector((state) => state.site);
  const product = view?.data;

  // Handle Action
  const handleDelete = (product) => {
    deleteProduct({ id: product._id });
  };

  const openView = (product) => {
    dispatch(setView({ data: product, state: true }));
  };

  const openEdit = (product) => {
    dispatch(setEdit({ data: product, state: true }));
    dispatch(setDeleteImages(product?.images));
    navigate("/admin/product-edit");
  };

  const closeView = () => {
    dispatch(setView({ data: null, state: false }));
  };

  // Data Processing
  const tableData = [];
  for (let i = 0; i < products?.length; i++) {
    tableData.push({
      key: i + 1,
      no: tableData?.length + 1,
      name: products[i]?.title,
      price: products[i]?.price,
      quantity: products[i]?.quantity,
      brand: <div className="capitalize">{products[i]?.brand?.title}</div>,
      status: <div className="capitalize">{products[i]?.status}</div>,
      action: (
        <div className="flex gap-2">
          <FaRegEye
            onClick={() => openView(products[i])}
            size={22}
            className="text-green-700"
          />
          <FiEdit
            onClick={() => openEdit(products[i])}
            size={22}
            className="text-orange-400"
          />
          <MdDeleteForever
            onClick={() => handleDelete(products[i])}
            size={22}
            className="text-red-500 "
          />
        </div>
      ),
    });
  }

  // Notification
  useEffect(() => {
    if (deleteIsSuccess) {
      toast(deleteData?.message);
      deleteReset();
    } else if (deleteIsError) {
      toast.error(deleteError?.data?.message);
      deleteReset();
    }
  }, [deleteData, deleteError, deleteIsError, deleteIsSuccess, deleteReset]);

  if (productIsLoading) {
    return <Loading />;
  }

  return (
    <div>
      <Title level={3}>Product List</Title>
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <Title className="capitalize" level={5}>
          All Products
        </Title>
        <Table columns={columns} dataSource={tableData} />
      </div>
      {/* View Modal */}
      <Modal
        className="extra_large_modal"
        title={`Product ID: ${product?._id}`}
        open={view.viewState}
        centered
        footer={null}
        onCancel={closeView}
      >
        <div className="product_details">
          <section className="overflow-hidden bg-white p-[20px] rounded-lg box_shadow ">
            <div className="mx-auto">
              <div className="lg:w-full mx-auto flex flex-wrap">
                <div className="lg:w-1/2 w-full lg:h-auto md:h-64">
                  <Slider
                    {...image_settings}
                    asNavFor={nav2}
                    ref={(slider1) => setNav1(slider1)}
                  >
                    {product?.images?.map((image, index) => (
                      <div key={index} className="">
                        <div className="product_image  flex justify-center items-center overflow-hidden">
                          <img
                            className="rounded-lg bg-center md:w-[400px] w-full md:h-[400px] h-[300px] object-cover "
                            src={image.url}
                            alt="product"
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <Slider
                    className="mt-[20px]"
                    asNavFor={nav1}
                    ref={(slider2) => setNav2(slider2)}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    {product?.images?.map((image, index) => (
                      <div key={index} className="p-[10px]">
                        <img
                          className="rounded-xl md:w-[100px] w-[60px] md:h-[100px] h-[60px] object-cover"
                          src={image.url}
                          alt=""
                        />
                      </div>
                    ))}
                  </Slider>
                </div>
                <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                  <p className="text-sm text-gray-500 uppercase">
                    {product?.brand?.title}
                  </p>
                  <h2 className="text-gray-900 text-3xl  font-medium mb-1 capitalize">
                    {product?.title}
                  </h2>
                  <h1 className=" font-medium text-xl text-gray-900">
                    Price: $ {product?.price}
                  </h1>
                  <div className="flex items-center ">
                    <ReactStars
                      count={5}
                      className="my-[10px]"
                      size={20}
                      value={3}
                      edit={false}
                      activeColor="#ffd700"
                    />
                    <span className="text-gray-600 ml-3 text-sm">
                      (4 Reviews)
                    </span>
                  </div>
                  <div className="info border-y py-4">
                    <div className="flex md:flex-row flex-col flex-wrap gap-6 md:items-center md:justify-between">
                      <div className="flex">
                        <span className="mr-3">Color</span>
                        {product?.color?.map((color, i) => (
                          <button
                            style={{ backgroundColor: `${color.code}` }}
                            key={i}
                            className={`ml-1 rounded-full w-6 h-6 focus:outline-none`}
                          ></button>
                        ))}
                      </div>
                      <div className="">
                        <h1 className=" font-medium text-md text-gray-900">
                          Quantity: {product?.quantity}
                        </h1>
                      </div>
                    </div>
                    <div className="flex md:flex-row flex-col flex-wrap gap-6 md:items-center md:justify-between mt-5">
                      <div className="capitalize font-medium text-md text-gray-900">
                        Category:
                        <ul className="ml-2">
                          {product?.category?.map((cat, i) => (
                            <li key={i}>{cat?.title}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="capitalize font-medium text-md text-gray-900">
                        Tag:
                        <ul className="ml-2">
                          {product?.tag?.map((tag, i) => (
                            <li key={i}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="product_desc my-4">
          <h4 className="text-[26px] mb-2 font-bold ">Description</h4>
          <div
            dangerouslySetInnerHTML={{ __html: product?.description }}
            className="desc_box capitalize bg-white p-[20px] text-justify rounded-lg box_shadow "
          ></div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductList;

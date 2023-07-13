import React, { useEffect, useState } from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";
import AddressModal from "../../components/AddressModal";
import {
  useDeleteUserAddressMutation,
  useGetUserAddressQuery,
} from "../../redux/features/user/userApi";
import Loading from "../../components/Loading";
import { toast } from "react-toastify";

const Address = () => {
  const [addresModal, setAddressModal] = useState(false);
  const { data, isLoading } = useGetUserAddressQuery();
  const [deleteUserAddress, { isError, error, isSuccess, reset }] =
    useDeleteUserAddressMutation();
  useEffect(() => {
    if (isSuccess) {
      toast("Address delete successfully");
      reset();
    } else if (isError) {
      toast.error(`Address delete failed. ${error.data.message}`);
      reset();
    }
  }, [error, isError, isSuccess, reset]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <>
      <Head title="My Address ||" />
      <div className="overflow-auto bg-white box_shadow rounded-lg p-[20px]">
        <div className="mb-3 md:flex justify-between">
          <Title level={3}>Address Book</Title>
          <label
            onClick={() => setAddressModal(true)}
            htmlFor="addressModal"
            className="modal-button second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
          >
            Add New
          </label>
        </div>
        <div className="md:flex gap-5 flex-wrap">
          {data?.data.map((address, i) => (
            <div key={i} className="md:w-[48%] mb-3">
              <div className="border rounded p-[8px]">
                <ul className="pl-[20px] leading-5">
                  <li className="">
                    Address Line 1:
                    <span className="font-bold ml-1">
                      {address.addressline1}
                    </span>
                  </li>
                  <li className="">
                    Address Line 2:
                    <span className="font-bold ml-1">
                      {address.addressline2}
                    </span>
                  </li>
                  <li className="">
                    Zip Code:{" "}
                    <span className="font-bold ml-1">{address.zipCode}</span>
                  </li>
                  <li className="">
                    City: <span className="font-bold ml-1">{address.city}</span>
                  </li>
                  <li className="">
                    State:
                    <span className="font-bold ml-1">{address.state}</span>
                  </li>
                  <li className="">
                    Country:
                    <span className="font-bold ml-1">{address.country}</span>
                  </li>
                </ul>
                <div className="md:flex gap-[15px] mt-[10px] ml-[10px]">
                  <button
                    onClick={() => deleteUserAddress(address._id)}
                    className="first_button duration-300 md:mb-0 mb-[10px] rounded-full py-[4px] px-[10px] font-small "
                  >
                    Delete
                  </button>
                  <label
                    onClick={() => setAddressModal(address)}
                    htmlFor="addressModal"
                    className="second_button duration-300 md:mb-0 mb-[10px] rounded-full py-[4px] px-[10px] font-small "
                  >
                    + Edit
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Load Modal */}
      {addresModal && (
        <AddressModal
          addresModal={addresModal}
          setAddressModal={setAddressModal}
        ></AddressModal>
      )}
    </>
  );
};

export default Address;

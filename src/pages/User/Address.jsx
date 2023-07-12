import React, { useState } from "react";
import Head from "../../components/Head";
import Title from "antd/es/typography/Title";
import AddressModal from "../../components/AddressModal";

const Address = () => {
  const [addresModal, setAddressModal] = useState(false);
  return (
    <>
      <Head title="My Address ||" />
      <div className="recent_order mt-[20px] overflow-auto bg-white box_shadow rounded-lg p-[20px] mb-[20px] md:mb-[0px] ">
        <div className="mb-3 md:flex justify-between">
          <Title level={3}>Address Book</Title>
          <label
            onClick={() => setAddressModal(true)}
            htmlFor="addressModal"
            className="modal-button second_button duration-300 rounded-full py-[8px] px-[20px] font-medium "
          >
            Add New Address
          </label>
        </div>
        <div className="md:flex gap-4 flex-wrap">
          <div className="md:w-[49%]">
            <div className="border rounded p-[8px]">
              <h2>test</h2>
            </div>
          </div>
        </div>
      </div>
      {/* Load Modal */}
      {addresModal && (
        <AddressModal setAddressModal={setAddressModal}></AddressModal>
      )}
    </>
  );
};

export default Address;

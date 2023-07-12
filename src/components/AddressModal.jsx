import React from "react";

const AddressModal = ({ setAddressModal }) => {
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
                <form action="">
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
                      />
                    </div>
                    <div className="w-full mb-3">
                      <label htmlFor="addressline2">Address Line 2</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="addressline2"
                        name="addressline2"
                        id="addressline2"
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
                      />
                    </div>
                    <div className="w-full mb-3">
                      <label htmlFor="city">City</label>
                      <input
                        className="w-full p-2 mb-3 mt-1"
                        type="text"
                        placeholder="city"
                        name="city"
                        id="city"
                      />
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
                      />
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

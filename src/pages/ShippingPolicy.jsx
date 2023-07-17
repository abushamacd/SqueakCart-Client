import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";

const ShippingPolicy = () => {
  return (
    <>
      <Head title="Shipping Policy ||" />
      <div className="">
        <BreadCrumb title="Shipping Policy" />
        <div className="body_wrapper md:p-[30px] p-[20px] ">
          <div className="bg-white p-[20px] rounded-lg policy layout">
            <p>
              Due to the unique products we offer and our continuously low
              prices, all our items come directly from the manufacturer. All
              orders are shipped within 48 hours of you placing the order.
            </p>
            <p>
              <strong>
                The typical delivery timeframe is between 3-5 working days
              </strong>
              when ordering the most popular products. However please do allow
              7-20 working days for delivery on all of our products, however,
              these may arrive sooner.
            </p>
            <p>
              All orders are shipped with a tracking number so that you can
              track your product every step of the way. Some packages may be
              faced with delays beyond our control such as customs or postal
              delays.
            </p>
            <p>
              Our goal is to offer you the best shipping options, no matter
              where you live. Every day, we deliver to hundreds of customers
              across the world, ensuring that we provide the very highest levels
              of responsiveness to you at all times. If you haven't received a
              shipping confirmation email with your tracking info within 3 days
              then feel free to get in touch.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingPolicy;

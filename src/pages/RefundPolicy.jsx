import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";

const RefundPolicy = () => {
  return (
    <>
      <Head title="Refund Policy ||" />
      <div className="">
        <BreadCrumb title="Refund Policy" />
        <div className="body_wrapper md:p-[30px] p-[20px] ">
          <div className="bg-white p-[20px] rounded-lg policy layout">
            <p>
              <span className="underline">
                <strong>Order Cancel</strong>
              </span>
            </p>
            <p>
              <span>
                Your order can be cancelled or amended within the first 48 hours
                of purchase. Orders cannot be cancelled or changed if they have
                already been shipped and so in this case please follow the
                returns policy below. Refunds will not ordinarily be issued for
                non-delivery for items showing as delivered to the address
                provided.
              </span>
            </p>
            <p>
              <strong>
                <u>Returns</u>
              </strong>
            </p>
            <p>
              <span>
                We are able to offer a full refund on any faulty products
                returned to us within 30 days of purchase. The cost of returning
                your item to our address is at your own expense. If you wish to
                return an item for other reasons the return must be returned
                within 14 days of delivery. All returns must be requested
                through email. Please contact us on live chat or contact us
                page.
              </span>
            </p>
            <p>
              <strong>To be eligible for a return your item must be:</strong>
              <span></span>
            </p>
            <ul>
              <li>
                Unused and in the same condition that you received it. It must
                also be in the original packaging.
              </li>
              <li>
                Received by us within 14 days of item delivery. If the items are
                not received within 14 days unfortunately we cannot offer a
                refund.
              </li>
            </ul>
            <p>
              <span className="underline">
                <strong>Refunds</strong>
              </span>
            </p>
            <p>
              Once your return is received and inspected, we will send you an
              email to notify you that we have received your returned item. We
              will also notify you of the approval of your refund. Then your
              refund will be processed, and a credit will automatically be
              applied to your credit card or original method of payment, within
              a certain amount of days.
            </p>
            <p>
              <span className="underline">
                <strong>Late or missing refunds</strong>
              </span>
            </p>
            <p>
              If you haven’t received a refund yet, first check your bank
              account again. Then contact your credit card company, it may take
              some time before your refund is officially posted. Next, contact
              your bank. There is often some processing time before a refund is
              posted. You will be responsible for paying for your own shipping
              costs for returning your item. Shipping costs are non-refundable.
              If you receive a refund, the cost of return shipping will be
              deducted from your refund. Depending on where you live, the time
              it may take for your exchanged product to reach you may vary.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default RefundPolicy;

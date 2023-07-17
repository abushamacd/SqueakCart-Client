import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";

const Faqs = () => {
  return (
    <>
      <Head title="FAQs ||" />
      <div className="">
        <BreadCrumb title="Frequently Asked Quetstion" />
        <div className="body_wrapper md:p-[30px] p-[20px] ">
          <div className="bg-white p-[20px] rounded-lg policy layout">
            <p>
              <strong>How long does it take for an order to arrive?</strong>
            </p>
            <p>
              This depends on the product ordered.  Most of our items are
              shipped directly from our local suppliers and around the world to
              offer you the best quality and optimum price. Many items will
              arrive within 3-5 working days, however please allow 7-20 working
              days for delivery. Please do not panic if it does not show up
              immediately, it’s on its way 🙂
            </p>
            <p>
              <strong>I just placed an order, when will it ship?</strong>
            </p>
            <p>
              Please allow 24-48 hours production time for your order to ship
              out. Tracking numbers will be updated 1-3 business days after your
              order has been SHIPPED.
            </p>
            <p>
              <strong>How do I track my order?</strong>
            </p>
            <p>
              If we include tracking information with your order, you can view
              it from the shipping confirmation email that we sent you. By
              entering your tracking number, you will see an estimated delivery
              date under the order details.
            </p>
            <p>
              <strong>
                I ordered 2 or more items, but only received one… where’s my
                order?
              </strong>
            </p>
            <p>
              We have a large assortment of products not stocked in house, when
              you order multiple items at a time, they may be shipped separately
              so they get to you faster. You may receive one item before the
              other. So, don’t panic if you don’t receive all of your items at
              once…they are on their way to you. 🙂
            </p>
            <p>
              <strong>
                I am not in love with my order, can it be returned? What if
                there is an issue?
              </strong>
            </p>
            <p>
              We offer a 100 % money-back guarantee if the product is defective
              or damaged. We give you 30 days to send it back to us for a full
              refund. You must ship it back at your own expense, once we have
              received the product we will refund the full amount of your
              original purchase. Please Include all a name and order number on
              the returned parcels. Please note: If your package is on the way,
              you must wait for it to arrive and return it before receiving a
              refund.
            </p>
            <p>
              <strong>Can I cancel my order?</strong>
            </p>
            <p>
              You are able to cancel your order with no penalty! You must cancel
              your order before it ships. If the item is already sent please use
              our easy return system to get a full refund.
            </p>
            <p>
              <strong>I </strong>
              <strong>
                have entered an incorrect address what do I do now?
              </strong>
            </p>
            <p>
              If you have miss-spelled or auto-filled in an incorrect address,
              simply reply to your order confirmation email and confirm. Once
              you double-check if the address given is wrong kindly notify us.
              If the given address is wrong we can change the address to the
              correct one within 24 hours. No refund will be given after the 24
              hours of incorrect submission. 
            </p>
            <p>
              <strong>
                I have a question that wasn't answered, can you please help?
              </strong>
            </p>
            <p>
              Absolutely! we will be happy to assist you in any way we can. We
              do receive a large number of emails, If you wish to get a prompt
              response please attach your order number and address the problem
              clearly, thanks
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Faqs;

import React from "react";
import Head from "../components/Head";
import BreadCrumb from "../components/BreadCrumb";

const About = () => {
  return (
    <>
      <Head title="About Us ||" />
      <div className="">
        <BreadCrumb title="About Us" />
        <div className="body_wrapper md:p-[30px] p-[20px] ">
          <div className="bg-white p-[20px] rounded-lg policy layout">
            <p>
              Founded in 2023 with the goal of bringing unique, quality and
              exciting products to our customers.
            </p>
            <p>We pride ourselves on providing;</p>
            <ol>
              <li>Excellent Products</li>
              <li>Excellent Prices</li>
              <li>Excellent customer service</li>
            </ol>
            <p>
              We believe passionately in being a brand that shares the values of
              love, equality, good vibes and to provide great products with
              excellent service, which is why we commit ourselves to give you
              the best of both.
              <br />
              <br />
              If you’re looking for something new, you’re in the right place. We
              strive to be industrious and innovative, offering our customers
              something they want, putting their desires at the top of our
              priority list.
            </p>
            <p>
              We work directly with our private manufacturers here and overseas
              to ensure we deliver the highest quality products. We are
              constantly innovating and researching new products.
            </p>
            <p>
              <strong>Questions?</strong>
            </p>
            <p>
              Questions on our products or can’t find what you are looking for?
              Contact us from<span> our contact us page</span>
              <span> </span>and our friendly team will be happy to help!
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;

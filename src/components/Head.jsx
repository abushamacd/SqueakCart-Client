import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

const Head = ({ title }) => {
  return (
    <HelmetProvider>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} Squeak Cart</title>
      </Helmet>
    </HelmetProvider>
  );
};

export default Head;

import React from "react";
import Marquee from "react-fast-marquee";

const Brands = () => {
  return (
    <div className="box_shadow p-[15px] bg-white rounded-xl section_gap">
      <Marquee className="flex items-center">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((brand) => (
          <div key={brand} className="brans mx-[15px]">
            <img src="/images/brand-02.png" alt="brand" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brands;

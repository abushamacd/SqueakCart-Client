import React from "react";
import Marquee from "react-fast-marquee";
import { useGetBrandsQuery } from "../redux/features/brand/brandApi";
import Loading from "../components/Loading";

const Brands = () => {
  const { data: getData, isLoading: getIsLoading } = useGetBrandsQuery();
  const brands = getData?.data?.data;
  console.log(brands);
  if (getIsLoading) {
    return <Loading />;
  }
  return (
    <div className="box_shadow p-[15px] bg-white rounded-xl section_gap">
      <Marquee className="flex items-center">
        {brands.map((brand) => (
          <div key={brand._id} className="brands mx-[15px]">
            <img className="h-[120px]" src={brand?.images[0].url} alt="brand" />
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brands;

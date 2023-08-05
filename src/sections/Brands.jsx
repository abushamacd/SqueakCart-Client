import React from "react";
import Marquee from "react-fast-marquee";
import { useGetBrandsQuery } from "../redux/features/brand/brandApi";
import Loading from "../components/Loading";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setQueryBrand } from "../redux/features/product/productSlice";

const Brands = () => {
  const dispatch = useDispatch();
  const { data: getData, isLoading: getIsLoading } = useGetBrandsQuery();
  const brands = getData?.data?.data;

  if (getIsLoading) {
    return <Loading />;
  }

  return (
    <div className="box_shadow p-[15px] bg-white rounded-xl section_gap">
      <Marquee className="flex items-center">
        {brands?.map((brand) => (
          <div
            onClick={() => dispatch(setQueryBrand(brand?._id))}
            key={brand?._id}
            className="brands mx-[15px]"
          >
            <Link to={`/products`}>
              <img
                className="h-[100px]"
                src={brand?.images[0].url}
                alt="brand"
              />
            </Link>
          </div>
        ))}
      </Marquee>
    </div>
  );
};

export default Brands;

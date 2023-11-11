import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { useGetProCatsQuery } from "../redux/features/proCat/proCatApi";

const SiteLayout = () => {
  const { isLoading } = useGetProCatsQuery();
  if (isLoading) {
    return (
      <div className="flex flex-col gap-3 items-center justify-center h-screen">
        <div className="w-20 h-20 border-t-4 border-b-4 border-green-900 rounded-full animate-spin"></div>
        Note: Site is hosted in free hosting. So it's maybe slow
      </div>
    );
  }
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default SiteLayout;

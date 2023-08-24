import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { RxCross1 } from "react-icons/rx";
import Annuncement from "./Annuncement";
import {
  FiHeart,
  FiPhoneCall,
  FiSearch,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/features/auth/authSlice";
import { useGetProCatsQuery } from "../redux/features/proCat/proCatApi";
import {
  setQueryCat,
  setSearchTerm,
} from "../redux/features/product/productSlice";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useGetUserProfileQuery } from "../redux/features/user/userApi";
import main_logo from "../assets/main_logo.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { data: getData } = useGetProCatsQuery();
  const proCats = getData?.data?.data;

  const { data: userData } = useGetUserProfileQuery();

  const handleSignout = () => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  let formSchema = Yup.object().shape({
    searchTerm: Yup.string().required("Write something"),
  });
  const formik = useFormik({
    initialValues: {
      searchTerm: "",
    },

    validationSchema: formSchema,

    onSubmit: (values) => {
      dispatch(setSearchTerm(values.searchTerm));
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const closeSearch = () => {
    setOpenSearch(!openSearch);
    dispatch(setSearchTerm(""));
  };

  return (
    <header className={``}>
      {/* Search bar */}
      <div
        id="serach_bar"
        className={`serach_bar ${
          openSearch && "active"
        } md:px-[70px] px-[20px] h-[105px] flex justify-between items-center absolute bg-[#131921] z-[999] left-0 top-0 w-full`}
      >
        <form
          className="flex flex-row-reverse justify-between gap-5  md:w-[950px] w-[250px]"
          onSubmit={(e) => handleSubmit(e)}
          onChange={formik.handleSubmit}
        >
          <input
            type="text"
            className="text-[25px] border-0 rounded-md p-1 focus:outline-none text-gray-500 md:w-[1060px] w-[260px]"
            name="searchTerm"
            id="searchTerm"
            onChange={formik.handleChange("searchTerm")}
            value={formik.values.searchTerm}
            placeholder="Search our store"
          />
          <button type="submit" className="md:mr-[50px] mr-[30px]">
            <Link to={`/products`}>
              <FiSearch size="20" color="#fff" />
            </Link>
          </button>
        </form>
        <RxCross1 size="20" onClick={closeSearch} color="#fff" />
        {formik.touched.searchTerm && formik.errors.searchTerm ? (
          <div className="formik_err absolute bottom-0 mb-[-25px] text-sm text-white">
            {formik.errors.searchTerm}
          </div>
        ) : null}
      </div>

      <div className="header_top py-1 ">
        <div className={`layout text-center px-[20px] py-[5px]`}>
          <div className="announcement font-bold text-sm">
            <Annuncement />
          </div>
        </div>
      </div>
      <div>
        <div className="header_middle py-2">
          <div className="layout px-[20px]">
            <div className="flex items-center justify-between gap-[20px]">
              <div className="help_Admin md:w-[20%] hidden md:block">
                {user?.role === "admin" ? (
                  <div className="">
                    <Link to="/admin">
                      <button className="bg-[#38b5fe] cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium text-black hover:bg-[#febd69]">
                        Dashboard
                      </button>
                    </Link>
                  </div>
                ) : (
                  <div className="flex items-center gap-[10px] text-white duration-300 hover:text-[#38b5fe]">
                    <FiPhoneCall size="20" />
                    <div className="text-[13px] ">
                      <p className="text-white duration-300 hover:text-[#38b5fe]">
                        +880 19 8726 8375
                      </p>
                      <p className="text-white duration-300 hover:text-[#38b5fe]">
                        assiddik001@gmail.com
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {user?.role !== "admin" && (
                <div className="catagories block md:hidden">
                  <div className="catagory_menu">
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="btn btn-link text-white no-underline px-0 hover:no-underline "
                      >
                        <p className="block md:hidden">
                          <HiMenuAlt1
                            className="text-white duration-300 hover:text-[#38b5fe]"
                            size="20"
                          />
                        </p>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-compact top-[65px] rounded-lg dropdown-content p-2 shadow bg-base-100 w-52 z-[9999]"
                      >
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li onClick={() => setIsOpen(!isOpen)} className="">
                          <div className="flex justify-between">
                            <Link to="/products">Store</Link>
                            {isOpen ? (
                              <FaAngleUp color="#fff" />
                            ) : (
                              <FaAngleDown color="#fff" />
                            )}
                          </div>
                        </li>
                        {isOpen && (
                          <ul className="mobile_dropdown ml-[25px] h-96 overflow-auto">
                            {proCats?.map((cat) => (
                              <Link key={cat?._id} to={`/products`}>
                                <li
                                  onClick={() =>
                                    dispatch(setQueryCat(cat?._id))
                                  }
                                  className="capitalize"
                                >
                                  {cat?.title}
                                </li>
                              </Link>
                            ))}
                          </ul>
                        )}
                        <li className="block md:hidden">
                          <Link to="/blogs">Blogs</Link>
                        </li>
                        <li className="block md:hidden">
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className="block md:hidden">
                          <Link to="/about">About Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              <div className="logo flex justify-center">
                <Link to="/" className="text-white text-2xl">
                  <img
                    className="md:w-[180px] w-[150px]"
                    src={main_logo}
                    alt=""
                  />
                </Link>
              </div>
              <div className="action_area md:w-[20%] flex justify-between md:gap-[20px] gap-[5px]">
                <div className="myaccount relative flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe]">
                  <FiUser size="20" />
                  <p className="text-[13px] hidden md:block">My Account</p>
                  <div className="user_button absolute  z-50 top-[56px] w-[120px] py-[5px] px-[10px] rounded-md ">
                    <ul className="text-center">
                      {user === null ? (
                        <>
                          <Link to="login">
                            <li className="hover:border-b py-2">Sign In</li>
                          </Link>
                          <Link to="register">
                            <li className="hover:border-b py-2">Sign Up</li>
                          </Link>
                        </>
                      ) : (
                        <>
                          <Link to="profile">
                            <li className="hover:border-b py-2">My Profile</li>
                          </Link>
                          <Link onClick={handleSignout}>
                            <li className="hover:border-b py-2">Sign Out</li>
                          </Link>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
                <div
                  onClick={() => setOpenSearch(!openSearch)}
                  className="serach flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe]"
                >
                  <FiSearch size="20" />
                  <p className="text-[13px] hidden md:block">Search</p>
                </div>
                <div className="flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe] relative">
                  <Link to={"/wishlist"}>
                    <FiHeart className="mx-auto" size="20" />
                    <p className="text-[13px] hidden md:block">Wishlist</p>
                    <div className="bg-[#38b5fe] badge badge-sm absolute text-[12px] top-[-10px] right-[-10px] md:right-0 text-white">
                      {userData?.data?.wishlist?.length || 0}
                      {/* const wishlist = data?.data?.wishlist; */}
                    </div>
                  </Link>
                </div>
                <div className="cart flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe] relative">
                  <Link to={"/cart"}>
                    <FiShoppingCart className="mx-auto" size="20" />
                    <p className="text-[13px] hidden md:block">My Cart</p>
                    <div className="bg-[#38b5fe] badge badge-sm absolute text-[12px] top-[-10px] right-[-10px] md:right-0 text-white">
                      {userData?.data?.cart[0]?.products?.length || 0}
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        {user?.role === "admin" && (
          <div className="header_bottom  block md:hidden py-1 px-[20px]">
            <div className="layout">
              <div className="menu_area my-1 flex justify-between md:justify-center items-center ">
                <div className="catagories block md:hidden">
                  <div className="catagory_menu">
                    <div className="dropdown">
                      <label
                        tabIndex={0}
                        className="btn btn-link text-white no-underline px-0 hover:no-underline "
                      >
                        <p className="block md:hidden">
                          <HiMenuAlt1
                            className="text-white duration-300 hover:text-[#38b5fe]"
                            size="20"
                          />
                        </p>
                      </label>
                      <ul
                        tabIndex={0}
                        className="menu menu-compact top-[65px] rounded-lg dropdown-content p-2 shadow bg-base-100 w-52 z-[9999]"
                      >
                        <li>
                          <Link to="/">Home</Link>
                        </li>
                        <li onClick={() => setIsOpen(!isOpen)} className="">
                          <div className="flex justify-between">
                            <Link to="/products">Store</Link>
                            {isOpen ? (
                              <FaAngleUp color="#fff" />
                            ) : (
                              <FaAngleDown color="#fff" />
                            )}
                          </div>
                        </li>
                        {isOpen && (
                          <ul className="mobile_dropdown ml-[25px] h-96 overflow-auto">
                            {proCats?.map((cat) => (
                              <li key={cat?._id} className="capitalize">
                                {cat?.title}
                              </li>
                            ))}
                          </ul>
                        )}
                        <li className="block md:hidden">
                          <Link to="/blogs">Blogs</Link>
                        </li>
                        <li className="block md:hidden">
                          <Link to="/contact">Contact Us</Link>
                        </li>
                        <li className="block md:hidden">
                          <Link to="/about">About Us</Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="md:hidden block">
                  <div className="">
                    <Link to="/admin">
                      <button className="bg-[#38b5fe] cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium text-black hover:bg-[#febd69]">
                        Dashboard
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="header_bottom md:block hidden py-2 px-[20px]">
          <div className="layout">
            <div className="menu_area my-1 flex justify-between md:justify-center items-center ">
              <div className="mainmenu md:flex items-center gap-[10px]">
                <div className="flex flex-wrap md:justify-start justify-center items-center gap-[15px]">
                  <NavLink to="/">Home</NavLink>
                  <ul>
                    <li className="mega-menu relative flex gap-1 text-[#000]">
                      <NavLink className="" to="/products">
                        Store
                      </NavLink>
                      <FaAngleDown color="#fff" />
                      <div className="mega-menu-wrapper box_shadow rounded-[5px]">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[40px] py-[50px] px-[90px] max-h-[400px] overflow-auto">
                          {proCats?.map((cat) => (
                            <Link key={cat?._id} to={`/products`}>
                              <div
                                onClick={() => dispatch(setQueryCat(cat?._id))}
                                className="single_menu"
                              >
                                <img
                                  className="w-full h-[200px] rounded-[3px] object-fill"
                                  src={cat?.images[0]?.url}
                                  alt=""
                                />
                                <h4 className="mt-[10px] text-white hover:text-[#38b5fe] duration-300 px-[10px] leading-[29px] mb-[12px] capitalize">
                                  {cat?.title}
                                </h4>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </li>
                  </ul>
                  <NavLink to="/blogs">Blogs</NavLink>
                  <NavLink to="/contact">Contact Us</NavLink>
                  <NavLink to="/about">About Us</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

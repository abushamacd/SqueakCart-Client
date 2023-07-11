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
// import { useSelector } from "react-redux";

const Header = () => {
  // const { user } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);

  return (
    <header className={``}>
      {/* Search bar */}
      <div
        id="serach_bar"
        className={`serach_bar ${
          openSearch && "active"
        } md:px-[70px] px-[20px] h-[105px] flex justify-between items-center absolute bg-[#131921] z-[999] left-0 top-0 w-full`}
      >
        <form className="flex flex-row-reverse" action="">
          <input
            type="text"
            className="text-[25px] border-0 rounded-md p-1 focus:outline-none text-gray-500 md:w-[1060px] w-[260px]"
            name="search"
            id="serach"
            placeholder="Search our store"
          />
          <button type="submit" className="md:mr-[50px] mr-[30px]">
            <FiSearch size="20" color="#fff" />
          </button>
        </form>
        <RxCross1
          size="20"
          onClick={() => setOpenSearch(!openSearch)}
          color="#fff"
        />
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
                {/* {user?.data?.role === "admin" ? (
                  <div className="">
                    <Link to="/admin">
                      <button className="bg-[#38b5fe] cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium text-black hover:bg-[#febd69]">
                        Dashboard
                      </button>
                    </Link>
                  </div>
                ) : ( */}
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
                {/* )} */}
              </div>
              {/* {!user?.data?.role === "admin" && ( */}
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
                      className="menu menu-compact top-[65px] rounded-lg dropdown-content p-2 shadow bg-base-100 w-52"
                    >
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li onClick={() => setIsOpen(!isOpen)} className="">
                        <div className="flex justify-between">
                          <Link to="/product">Store</Link>
                          {isOpen ? (
                            <FaAngleUp color="#fff" />
                          ) : (
                            <FaAngleDown color="#fff" />
                          )}
                        </div>
                      </li>
                      {isOpen && (
                        <ul className="mobile_dropdown ml-[25px]">
                          <li className="">item 1</li>
                          <li className="">item 1</li>
                          <li className="">item 1</li>
                          <li className="">item 1</li>
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
              {/* )} */}
              <div className="logo flex justify-center">
                <Link to="/" className="text-white text-2xl">
                  <img
                    className="md:w-[180px] w-[150px]"
                    src="images/main_logo.png"
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
                      <Link to="login">
                        <li className="hover:border-b py-2">Sign In</li>
                      </Link>
                      <Link to="register">
                        <li className="hover:border-b py-2">Sign Up</li>
                      </Link>
                      {/* <Link>
                        <li className="a">Sign Out</li>
                      </Link> */}
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
                <div className="wishlist flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe] relative">
                  <FiHeart size="20" />
                  <p className="text-[13px] hidden md:block">Wishlist</p>
                  <div className="bg-[#38b5fe] badge badge-sm absolute text-[12px] top-[-10px] right-[-10px] md:right-0">
                    1
                  </div>
                </div>
                <div className="cart flex flex-col items-center justify-center text-white duration-300 hover:text-[#38b5fe] relative">
                  <FiShoppingCart size="20" />
                  <p className="text-[13px] hidden md:block">My Cart</p>
                  <div className="bg-[#38b5fe] badge badge-sm absolute text-[12px] top-[-10px] right-[-10px] md:right-0">
                    1
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* {user?.data?.role === "admin" && ( */}
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
                      className="menu menu-compact top-[65px] rounded-lg dropdown-content p-2 shadow bg-base-100 w-52"
                    >
                      <li>
                        <Link to="/">Home</Link>
                      </li>
                      <li onClick={() => setIsOpen(!isOpen)} className="">
                        <div className="flex justify-between">
                          <Link to="/product">Store</Link>
                          {isOpen ? (
                            <FaAngleUp color="#fff" />
                          ) : (
                            <FaAngleDown color="#fff" />
                          )}
                        </div>
                      </li>
                      {isOpen && (
                        <ul className="mobile_dropdown ml-[25px]">
                          <li className="">item 1</li>
                          <li className="">item 1</li>
                          <li className="">item 1</li>
                          <li className="">item 1</li>
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
                {/* {user?.data?.role === "admin" && ( */}
                <div className="">
                  <Link to="/admin">
                    <button className="bg-[#38b5fe] cursor-pointer duration-300 rounded-full py-[8px] px-[20px] font-medium text-black hover:bg-[#febd69]">
                      Dashboard
                    </button>
                  </Link>
                </div>
                {/* )} */}
              </div>
            </div>
          </div>
        </div>
        {/* )} */}
        <div className="header_bottom md:block hidden py-2 px-[20px]">
          <div className="layout">
            <div className="menu_area my-1 flex justify-between md:justify-center items-center ">
              <div className="mainmenu md:flex items-center gap-[10px]">
                <div className="flex flex-wrap md:justify-start justify-center items-center gap-[15px]">
                  <NavLink to="/">Home</NavLink>
                  <ul>
                    <li className="mega-menu relative flex gap-1 text-[#000]">
                      <NavLink className="" to="">
                        Store
                      </NavLink>
                      <FaAngleDown color="#fff" />
                      <div className="mega-menu-wrapper box_shadow rounded-[5px]">
                        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-[40px] py-[50px] px-[90px] max-h-[400px] overflow-auto">
                          <div className="single_menu">
                            <img
                              className="w-full h-[130px] rounded-[3px] object-cover"
                              src="./assets/images/banner/215112.jpg"
                              alt=""
                            />
                            <div className="single_menu mt-[28px] px-[15px]">
                              <h4 className="logo_color leading-[29px] mb-[12px]">
                                Collection Name
                              </h4>
                              <ul className="font_g_book text-[16px]">
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="single_menu">
                            <img
                              className="w-full h-[130px] rounded-[3px] object-cover"
                              src="./assets/images/banner/215112.jpg"
                              alt=""
                            />
                            <div className="single_menu mt-[28px] px-[15px]">
                              <h4 className="logo_color leading-[29px] mb-[12px]">
                                Collection Name
                              </h4>
                              <ul className="font_g_book text-[16px]">
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="single_menu">
                            <img
                              className="w-full h-[130px] rounded-[3px] object-cover"
                              src="./assets/images/banner/215112.jpg"
                              alt=""
                            />
                            <div className="single_menu mt-[28px] px-[15px]">
                              <h4 className="logo_color leading-[29px] mb-[12px]">
                                Collection Name
                              </h4>
                              <ul className="font_g_book text-[16px]">
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div className="single_menu">
                            <img
                              className="w-full h-[130px] rounded-[3px] object-cover"
                              src="./assets/images/banner/215112.jpg"
                              alt=""
                            />
                            <div className="single_menu mt-[28px] px-[15px]">
                              <h4 className="logo_color leading-[29px] mb-[12px]">
                                Collection Name
                              </h4>
                              <ul className="font_g_book text-[16px]">
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                                <li className="mb-[5px]">
                                  {" "}
                                  <NavLink to="">Items 1</NavLink>{" "}
                                </li>
                              </ul>
                            </div>
                          </div>
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

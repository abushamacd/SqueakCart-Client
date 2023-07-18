import { createBrowserRouter } from "react-router-dom";
import NotFound from "../pages/NotFound";
import Home from "../pages/Home";
import SiteLayout from "../layouts/SiteLayout";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import SignUp from "../pages/User/SignUp";
import SignIn from "../pages/User/SignIn";
import Profile from "../pages/User/Profile";
import UserLayout from "../layouts/UserLayout";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import Password from "../pages/User/Password";
import Address from "../pages/User/Address";
import MyOrders from "../pages/User/MyOrders";
import Forget from "../pages/User/Forget";
import Reset from "../pages/User/Reset";
import Store from "../pages/Store";
import ProductDetails from "../pages/ProductDetails";
import Blogs from "../sections/Blogs";
import BlogDetails from "../pages/BlogDetails";
import CompareProducts from "../pages/CompareProducts";
import Wishlist from "../pages/Wishlist";
import Cart from "../pages/Cart";
import Checkout from "../pages/Checkout";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Faqs from "../pages/Faqs";
import PrivacyPolicy from "../pages/PrivecyPolicy";
import RefundPolicy from "../pages/RefundPolicy";
import ShippingPolicy from "../pages/ShippingPolicy";
import TermAndCondition from "../pages/TermAndCondition";
import Enquery from "../pages/Dashboard/Enquery";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <SiteLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/register",
        element: <SignUp />,
      },
      {
        path: "/login",
        element: <SignIn />,
      },
      {
        path: "/forget",
        element: <Forget />,
      },
      {
        path: "/reset/:token",
        element: <Reset />,
      },
      {
        path: "/products",
        element: <Store />,
      },
      {
        path: "/products/:id",
        element: <ProductDetails />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
      {
        path: "/blogs/:id",
        element: <BlogDetails />,
      },
      {
        path: "compare",
        element: <CompareProducts />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "contact",
        element: <Contact />,
      },
      {
        path: "faq",
        element: <Faqs />,
      },
      {
        path: "privacy-policy",
        element: <PrivacyPolicy />,
      },
      {
        path: "refund-policy",
        element: <RefundPolicy />,
      },
      {
        path: "shipping-policy",
        element: <ShippingPolicy />,
      },
      {
        path: "term-condition",
        element: <TermAndCondition />,
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <UserLayout />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "/profile/password",
            element: <Password />,
          },
          {
            path: "/profile/address",
            element: <Address />,
          },
          {
            path: "/profile/myorders",
            element: <MyOrders />,
          },
        ],
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/admin/enquery",
        element: <Enquery />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

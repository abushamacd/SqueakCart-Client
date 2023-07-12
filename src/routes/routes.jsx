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
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;

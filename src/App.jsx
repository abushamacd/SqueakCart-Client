import { RouterProvider } from "react-router-dom";
import routes from "./routes/routes";
import jwtDecode from "jwt-decode";
import { useDispatch } from "react-redux";
import { setUser } from "./redux/features/auth/authSlice";

function App() {
  const dispatch = useDispatch();
  // remove expire token from local storage
  const token = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  if (token) {
    const decoded = jwtDecode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem("token");
    }
  }
  // set user in state
  if (token) {
    const decoded = jwtDecode(token);
    dispatch(setUser(decoded));
  }

  return <RouterProvider router={routes} />;
}

export default App;

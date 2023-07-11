import React from "react";
import "./index.css";
import App from "./App";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const layout = document.getElementById("root");
const root = createRoot(layout);

root.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>
);

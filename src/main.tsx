import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@routes/index";
import axios from "axios";
import { CineContextProvider } from "@context/context";

// setup axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CineContextProvider>
      <RouterProvider router={router} />
    </CineContextProvider>
  </React.StrictMode>,
);

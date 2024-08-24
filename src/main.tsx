import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "@routes/index";
import axios from "axios";
import { CineContextProvider } from "@context/context";
import ErrorBoundary from "@components/ErrorBoundary/ErrorBoundary";
import { BiLoaderCircle } from "react-icons/bi";

// setup axios
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] =
  `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`;

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center bg-neutral-900">
          <BiLoaderCircle className="size-10 animate-spin text-orange-600 duration-75 ease-in md:size-20" />
        </div>
      }
    >
      <ErrorBoundary>
        <CineContextProvider>
          <RouterProvider router={router} />
        </CineContextProvider>
      </ErrorBoundary>
    </Suspense>
  </React.StrictMode>,
);

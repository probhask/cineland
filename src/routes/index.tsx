import { createBrowserRouter } from "react-router-dom";
import { exploreLoader } from "@pages/ExplorePage";

import WhishList from "@pages/WhishList";
import { lazy, Suspense } from "react";
const App = lazy(() => import("../App"));
const Home = lazy(() => import("@pages/Home"));
const ExplorePage = lazy(() => import("@pages/ExplorePage"));
const DeatailsPage = lazy(() => import("@pages/DeatailsPage"));
const SearchPage = lazy(() => import("@pages/SearchPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense>
        <App />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense>
            <Home />
          </Suspense>
        ),
      },
      {
        path: ":explore",
        element: (
          <Suspense>
            <ExplorePage />
          </Suspense>
        ),
        loader: exploreLoader,
      },
      {
        path: ":explore/:id",
        element: (
          <Suspense>
            <DeatailsPage />
          </Suspense>
        ),
      },
      {
        path: "search",
        element: (
          <Suspense>
            <SearchPage />
          </Suspense>
        ),
      },
      {
        path: "whishlist",
        element: (
          <Suspense>
            <WhishList />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;

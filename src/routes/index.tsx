import { createBrowserRouter } from "react-router-dom";
import Home from "@pages/Home";
import ExplorePage, { exploreLoader } from "@pages/ExplorePage";
import DeatailsPage from "@pages/DeatailsPage";
import SearchPage from "@pages/SearchPage";
import App from "../App";
import WhishList from "@pages/WhishList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: ":explore",
        element: <ExplorePage />,
        loader: exploreLoader,
      },
      {
        path: ":explore/:id",
        element: <DeatailsPage />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "whishlist",
        element: <WhishList />,
      },
    ],
  },
]);

export default router;

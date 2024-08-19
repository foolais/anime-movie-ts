import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomePage } from "./pages";
import { AnimeListWrapper } from "./layouts";

const router = createBrowserRouter([
  { path: "/", element: <HomePage /> },
  {
    path: "/anime/:listAnime",
    element: <AnimeListWrapper />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

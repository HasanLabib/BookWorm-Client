import { createBrowserRouter } from "react-router";
import App from "../App";
import Register from "../Page/Register/Register";

export const route = () =>
  createBrowserRouter([
    {
      path: "/",
      Component: App,
      children: [
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);

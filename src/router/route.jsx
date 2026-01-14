import { createBrowserRouter } from "react-router";
import App from "../App";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";

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
        {
          path: "/login",
          element: <Login />,
        },
      ],
    },
  ]);

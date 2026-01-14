import { createBrowserRouter } from "react-router";
import App from "../App";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import AdminDashBoard from "../Page/DashBoard/AdminDashBoard/AdminDashBoard";
import User from "../Components/User/User";
import Genre from "../Components/Genre/Genre";
import Book from "../Components/Book/Book";

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
    {
      path: "/dashboard",
      Component: AdminDashBoard,
      children: [
        {
          path: "viewBook",
          element: <Book />,
        },
        {
          path: "users",
          element: <User />,
        },
        {
          path: "genre",
          element: <Genre />,
        },
      ],
    },
  ]);

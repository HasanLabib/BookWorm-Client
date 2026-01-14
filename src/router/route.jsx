import { createBrowserRouter } from "react-router";
import App from "../App";
import Register from "../Page/Register/Register";
import Login from "../Page/Login/Login";
import AdminDashBoard from "../Page/DashBoard/AdminDashBoard/AdminDashBoard";
import User from "../Components/User/User";
import Genre from "../Components/Genre/Genre";
import Book from "../Components/Book/Book";
import PrivateRouteProvide from "../Provider/PrivateRouteProvider/PrivateRouteProvide";
import BookList from "../Components/Reading/BookList";
import AuthRoute from "../Provider/PrivateRouteProvider/AuthRoute";

export const route = () =>
  createBrowserRouter([
    {
      path: "/",
      element: (
        <PrivateRouteProvide>
          <App />
        </PrivateRouteProvide>
      ),
      children: [
        {
          path: "/register",
          element: (
            <AuthRoute>
              <Register />
            </AuthRoute>
          ),
        },
        {
          path: "/login",
          element: (
            <AuthRoute>
              <Login />
            </AuthRoute>
          ),
        },
        {
          path: "/book",
          element: (
            <PrivateRouteProvide>
              <BookList />
            </PrivateRouteProvide>
          ),
        },
      ],
    },
    {
      path: "/dashboard",
      Component: AdminDashBoard,
      children: [
        {
          path: "viewBook",
          element: (
            <PrivateRouteProvide>
              <Book />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "users",
          element: (
            <PrivateRouteProvide>
              <User />
            </PrivateRouteProvide>
          ),
        },
        {
          path: "genre",
          element: (
            <PrivateRouteProvide>
              <Genre />
            </PrivateRouteProvide>
          ),
        },
      ],
    },
  ]);

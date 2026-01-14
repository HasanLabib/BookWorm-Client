import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { route } from "./router/route.jsx";
import { RouterProvider } from "react-router/dom";
import { ToastContainer } from "react-toastify";
import AuthProvider from "./Provider/AuthProvider/AuthProvider.jsx";
const router = route();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
    <ToastContainer />
  </StrictMode>
);

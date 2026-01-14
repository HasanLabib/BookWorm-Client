import React, { useContext } from "react";
import { NavLink, Outlet } from "react-router";
import CreateIcon from "@mui/icons-material/Create";
import ViewListIcon from "@mui/icons-material/ViewList";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import AdminNav from "./AdminNav";
import MenuIcon from "@mui/icons-material/Menu";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import LibraryBooksOutlinedIcon from "@mui/icons-material/LibraryBooksOutlined";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import { UserAuthContext } from "../../../Provider/AuthProvider/AuthContext";
const AdminDashBoard = () => {
  const { user } = useContext(UserAuthContext);
  const sideMenu = [
    {
      name: "View All User",
      path: "users",
      icon: <GroupAddOutlinedIcon />,
    },
    {
      name: "View All Book",
      path: "viewBook",
      icon: <ViewListIcon />,
    },
    {
      name: "Genre",
      path: "genre",
      icon: <LibraryBooksOutlinedIcon />,
    },
  ];
  return (
    <div className="drawer lg:drawer-open bg-base-100 min-h-screen">
      <input id="my-drawer-4" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content flex flex-col">
        <nav className="navbar bg-base-100 backdrop-blur border-b border-base-300 px-4">
          <label
            htmlFor="my-drawer-4"
            aria-label="open sidebar"
            className="btn btn-square btn-ghost"
          >
            <svg
              xmlns="http://www.w3.org3.org/2000/svg"
              viewBox="0 0 24 24"
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2"
              fill="none"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
              <path d="M9 4v16"></path>
              <path d="M14 10l2 2l-2 2"></path>
            </svg>
          </label>

          <div className="flex-1 px-4 text-lg font-black tracking-wide">
            Dashboard
          </div>

          <AdminNav />
        </nav>
        <div className="p-6 bg-base-100 flex-1">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side is-drawer-close:overflow-visible">
        <label
          htmlFor="my-drawer-4"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>

        <div className="flex min-h-full flex-col bg-linear-to-br from-gray-200 to-white text-white backdrop-blur border-r border-base-300 shadow-xl is-drawer-close:w-20 is-drawer-open:w-64 transition-all duration-300">
          <ul className="menu w-full grow px-3 py-4 gap-1">
            {sideMenu.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-6 px-4 py-3 rounded-xl transition-all duration-200
                ${
                  isActive
                    ? "bg-linear-to-br from-cyan-500 to-blue-500 text-white border py-3 rounded-lg border-b-0 border-r-0   border-blue-500 translate-x-0 translate-y-0 transition-all duration-100"
                    : "bg-linear-to-br hover:to-cyan-500 hover:from-blue-500 hover:text-black text-black opacity-60"
                }`
                  }
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="is-drawer-close:hidden font-medium">
                    {item.name}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashBoard;

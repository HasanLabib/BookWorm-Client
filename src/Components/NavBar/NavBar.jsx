import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import logo from "../../assets/logo.jpg"; // Adjust path based on file location

import { UserAuthContext } from "../../Provider/AuthProvider/AuthContext";

const NavBar = () => {
  const { user, logout } = useContext(UserAuthContext);
  const [photo, setPhoto] = useState("");
  const location = useLocation();
  const isDashboard = location.pathname.startsWith("/dashboard");

  useEffect(() => {
    const fetchPhoto = () => {
      if (user) {
        const { photoURL } = user;
        setPhoto(photoURL);
      }
    };
    fetchPhoto();
  }, [user]);

  const handleSignOut = async () => {
    try {
      const result = await logout();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    { name: "book", path: "/book" },
    { name: "Dashboard", path: "/dashboard" },
  ];
  const link = menuItems.map((item, index) => (
    <li key={index}>
      <NavLink
        to={item.path}
        className={({ isActive }) =>
          isActive ? "bg-amber-500 text-white" : ""
        }
      >
        {item.name}
      </NavLink>
    </li>
  ));

  return (
    <div>
      <div
        className={`bg-base-100 ${
          isDashboard ? "hidden" : "fixed top-0 left-0 w-full z-50 shadow-sm"
        }`}
      >
        <div className="navbar w-full mx-auto md:w-[96%] lg:w-11/12">
          <div className="navbar-start">
            <div className="dropdown">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost lg:hidden"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />{" "}
                </svg>
              </div>
              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content  bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow"
              >
                <div className=" menu bg-base-200 rounded-box w-full">
                  {link}
                </div>
                {/* <div className="flex justify-end p-4">
                  <ThemeToggle />
                </div> */}
              </ul>
            </div>
            <NavLink to={`/`} className="btn btn-ghost text-xl">
              <img src={logo} className="h-12 w-auto" />
            </NavLink>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <div className="menu menu-horizontal rounded-box ">{link}</div>
            </ul>
          </div>
          <div className="navbar-end">
            {user ? (
              <>
                <div className="dropdown dropdown-end cursor-pointer	z-50">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar "
                  >
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS Navbar component"
                        src={photo}
                        title={user?.displayName}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex="-1"
                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
                  >
                    <li>
                      <button className="btn">{user.displayName}</button>
                    </li>
                    <li>
                      <NavLink to={`/profile`} className="btn">
                        My Profile
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to={`/dashboard`} className="btn">
                        Dashboard
                      </NavLink>
                    </li>

                    <li>
                      <NavLink onClick={handleSignOut} className="btn">
                        Logout
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <NavLink
                to={`/login`}
                className="btn btn-neutral text-white rounded-2xl px-9"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

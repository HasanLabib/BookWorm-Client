import React, { useContext } from "react";
import { UserAuthContext } from "../../../Provider/AuthProvider/AuthContext";

const AdminNav = () => {
  const { user, logout } = useContext(UserAuthContext);
  const handleSignOut = async () => {
    try {
      const result = await logout();
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="navbar-end w-[86%]">
      <div className="dropdown dropdown-end">
        <div
          tabIndex={0}
          role="button"
          className="btn btn-ghost btn-circle avatar"
        >
          <div className="w-10 rounded-full">
            <img alt="User Pic" src={user && user.photo} />
          </div>
        </div>
        <ul
          tabIndex="-1"
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
        >
          <li>
            <NavLink onClick={handleSignOut} className="btn">
              Logout
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminNav;

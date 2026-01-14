import React from "react";
import axios from "axios";
import Swal from "sweetalert2";
import useUserHook from "../../hooks/useUserHook";

const User = () => {
  const { allUsers, setAllUsers } = useUserHook();

  const handleRoleChange = async (user, newRole) => {
    const result = await Swal.fire({
      title: "Change user role?",
      text: `Change ${user.name}'s role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it",
    });

    if (!result.isConfirmed) return;

    const res = await axios.put(
      `/updateRole/${user._id}`,
      { role: newRole },
      { withCredentials: true }
    );

    if (res.data.modifiedCount > 0) {
      const updatedUsers = allUsers.map((userItem) =>
        userItem._id === user._id ? { ...userItem, role: newRole } : userItem
      );

      setAllUsers(updatedUsers);

      Swal.fire("Updated!", "User role updated successfully.", "success");
    }
  };

  return (
    <section className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Users</h1>
          <p className="text-sm text-gray-500">
            Manage all users and their roles from one place
          </p>
        </div>
      </div>

      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table table-md border border-gray-200">
            <thead className="bg-base-100 sticky top-0 z-10">
              <tr className="text-base">
                <th className="text-black">Name</th>
                <th className="text-black">Email</th>
                <th className="text-black">Role</th>
                <th className="text-right text-black">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allUsers.map((user) => (
                <tr key={user._id} className="hover:bg-base-300">
                  <td>
                    <div className="flex gap-3 items-center">
                      {" "}
                      <div className="avatar">
                        <div className="w-14 h-14 rounded-full shadow">
                          <img
                            src={user.photo}
                            alt={user.name}
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="font-semibold">{user.name}</div>
                    </div>
                  </td>

                  <td className="text-gray-600">{user.email}</td>

                  <td>
                    <span
                      className={`badge badge-lg ${
                        user.role === "admin" ? "badge-primary" : "badge-ghost"
                      }`}
                    >
                      {user.role}
                    </span>
                  </td>

                  <td>
                    <div className="flex justify-end gap-2">
                      {user.role === "user" ? (
                        <button
                          className="btn btn-sm btn-success btn-outline"
                          onClick={() => handleRoleChange(user, "admin")}
                        >
                          Make Admin
                        </button>
                      ) : (
                        <button
                          className="btn btn-sm btn-warning btn-outline"
                          onClick={() => handleRoleChange(user, "user")}
                        >
                          Remove Admin
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}

              {allUsers.length === 0 && (
                <tr>
                  <td colSpan="5" className="text-center py-10 text-gray-400">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default User;

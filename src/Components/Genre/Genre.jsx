import React, { useEffect, useState } from "react";
import { Link } from "react-router";

import Icon from "@mui/material/Icon";
import { Select, MenuItem, ListItemText } from "@mui/material";
import { bookGenreIconsMUI } from "../../utility/icon";
import axios from "axios";
import useGenreHook from "../../hooks/useGenreHook";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Genre = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [genre, setGenre] = useState("");
  const [icon, setIcon] = useState(bookGenreIconsMUI[0]);
  const { allGenre, error, loading, setAllGenre, setLoading } = useGenreHook();
  const [editingGenre, setEditingGenre] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "genre") setGenre(value);
    if (name === "icon") {
      const selectedIconObject = bookGenreIconsMUI.find(
        (item) => item.name === value
      );
      setIcon(selectedIconObject);
    }
  };

  const handleEdit = (genreItem) => {
    setEditingGenre(genreItem);
    setGenre(genreItem.genre);

    const selectedIcon = bookGenreIconsMUI.find(
      (i) => i.name === genreItem.icon
    );
    setIcon(selectedIcon);

    setModalOpen(true);
  };
  const handleDelete = async (genreItem) => {
    try {
      const resDelete = await axios.delete(`/deleteGenre/${genreItem._id}`, {
        withCredentials: true,
      });

      if (resDelete.data?.deletedCount > 0) {
        const afterDelete = allGenre.filter(
          (genre) => genre._id !== genreItem._id
        );

        setAllGenre(afterDelete);
      }
    } catch (err) {
      console.error("Delete error:", err.response?.data || err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const genre =
      e.target.genre.value[0].toUpperCase() + e.target.genre.value.slice(1);
    const icon = e.target.icon.value;

    const genreData = { genre, icon };

    if (editingGenre) {
      const resEdit = await axios.put(
        `/update-genre/${editingGenre._id}`,
        genreData,
        { withCredentials: true }
      );

      if (resEdit.data?.modifiedCount > 0) {
        const newGenre = allGenre.filter(
          (genre) => genre._id != editingGenre._id
        );
        setAllGenre([...newGenre, { _id: editingGenre._id, ...genreData }]);
      }
      setEditingGenre(null);
      setModalOpen(false);
    } else {
      const res = await axios.post("/add-genre", genreData, {
        withCredentials: true,
      });
      console.log(res);

      if (res.data?.insertedId) {
        setAllGenre([...allGenre, { _id: res.data.insertedId, ...genreData }]);
      }

      setGenre("");
      setIcon(bookGenreIconsMUI[0]);
      setModalOpen(false);
    }
  };

  return (
    <section className="min-h-screen bg-base-200 ">
      <div className="shadow bg-base-100">
        <div className="flex flex-col sm:flex-row gap-3 sm:justify-between sm:items-center mb-4 pt-4 px-4 sm:px-8">
          <div>
            <h1 className="text-3xl font-bold">All Genres</h1>
            <p className="text-sm text-gray-500">
              Manage all genre from one place
            </p>
          </div>
          <button
            className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
            onClick={() => setModalOpen(true)}
          >
            + Add Genre
          </button>
        </div>
        <hr className="border-base-300" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4 sm:px-8 mt-6">
        {allGenre.map((item) => {
          const iconObj = bookGenreIconsMUI.find((i) => i.name === item.icon);

          return (
            <div
              key={item._id}
              className="card bg-base-100 shadow-md hover:shadow-lg transition-all"
            >
              <div className="card-body h-24 p-4 flex flex-row items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
                    <span className="absolute inset-0 bg-linear-to-br from-cyan-500 to-blue-200 opacity-60"></span>
                    <span className="relative text-xl">{iconObj?.icon}</span>
                  </span>
                  <h2 className="font-semibold text-base">{item.genre}</h2>
                </div>

                <div className="flex gap-2">
                  <button
                    className="btn btn-md rounded-full w-12 h-12 btn-outline btn-info"
                    onClick={() => handleEdit(item)}
                  >
                    <CiEdit className="text-2xl" />
                  </button>
                  <button
                    className="btn btn-md rounded-full w-12 h-12 btn-outline btn-error"
                    onClick={() => handleDelete(item)}
                  >
                    <MdDelete className="text-2xl" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box w-11/12 max-w-md">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            <h3 className="font-bold text-lg mb-4 text-center">
              {editingGenre ? "Edit Genre" : "Add Genre"}
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Genre Name"
                name="genre"
                value={genre}
                className="input input-bordered w-full"
                onChange={handleChange}
                required
              />

              <Select
                fullWidth
                name="icon"
                className="input input-bordered p-2 w-full"
                value={icon.name}
                onChange={handleChange}
              >
                {bookGenreIconsMUI.map((item) => (
                  <MenuItem key={item.name} value={item.name}>
                    <ListItemText>
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                    </ListItemText>
                  </MenuItem>
                ))}
              </Select>

              <div className="modal-action">
                <button type="submit" className="btn btn-success w-full">
                  Save Genre
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default Genre;

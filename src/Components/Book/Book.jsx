import React, { useState } from "react";
import axios from "axios";
import useGenreHook from "../../hooks/useGenreHook";
import useBookHook from "../../hooks/useBookHook";
import Swal from "sweetalert2";
import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

const Book = () => {
  const { allBooks, setAllBooks } = useBookHook();
  const { allGenre } = useGenreHook();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    if (editingBook) {
      const res = await axios.put(`/update-book/${editingBook._id}`, formData, {
        withCredentials: true,
      });

      if (res.data.modifiedCount > 0) {
        const newData = Object.fromEntries(formData);
        const updatedList = allBooks.map((book) => {
          book._id === editingBook._id ? { ...book, ...newData } : book;
        });
        setAllBooks(updatedList);
      }
    } else {
      const res = await axios.post("/add-book", formData, {
        withCredentials: true,
      });

      if (res.data.insertedId) {
        setAllBooks([
          ...allBooks,
          { _id: res.data.insertedId, ...Object.fromEntries(formData) },
        ]);
      }
    }

    setEditingBook(null);
    setModalOpen(false);
    form.reset();
  };

  const handleDelete = async (book) => {
    const result = await Swal.fire({
      title: "Delete book?",
      text: "This will permanently remove the book, cover & PDF.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    });

    if (!result.isConfirmed) return;

    const res = await axios.delete(`/delete-book/${book._id}`, {
      withCredentials: true,
    });

    if (res.data.deletedCount > 0) {
      setAllBooks(allBooks.filter((b) => b._id !== book._id));

      Swal.fire("Deleted!", "Book has been deleted.", "success");
    }
  };

  return (
    <section className="min-h-screen bg-base-200 p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Books Library</h1>
          <p className="text-sm text-gray-500">
            Manage all books from one place
          </p>
        </div>

        <button
          className="btn btn-primary btn-wide shadow-md"
          onClick={() => setModalOpen(true)}
        >
          + Add New Book
        </button>
      </div>

      <div className="bg-base-100 rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="table  table-md">
            <thead className=" sticky top-0 z-10">
              <tr className="text-base">
                <th>Title</th>
                <th>Author</th>
                <th>Genre</th>
                <th className="text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {allBooks.map((book) => (
                <tr key={book._id} className="hover">
                  <td className="flex items-center gap-5">
                    <div className="avatar">
                      <div className="w-12 h-12 rounded-full shadow">
                        <img
                          src={book.cover}
                          alt={book.title}
                          className="object-cover"
                        />
                      </div>
                    </div>
                    <div className="font-semibold">{book.title}</div>
                  </td>

                  <td className="text-gray-600">{book.author}</td>

                  <td>
                    <span className="badge badge-outline bg-gray-200 badge-md">
                      {book.genre}
                    </span>
                  </td>

                  <td>

                    <div className="flex justify-end gap-2">
                      <button
                        className="btn btn-md rounded-full w-12 h-12 btn-outline btn-info"
                        onClick={() => {
                          setEditingBook(book);
                          setModalOpen(true);
                        }}
                      >
                        <CiEdit className="text-2xl" />
                      </button>
                      <button
                        className="btn btn-md rounded-full w-12 h-12 btn-outline btn-error"
                        onClick={() => handleDelete(book)}
                      >
                        <MdDelete className="text-2xl" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {modalOpen && (
        <dialog className="modal modal-open">
          <div className="modal-box max-w-2xl">
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={() => {
                setModalOpen(false);
                setEditingBook(null);
              }}
            >
              ✕
            </button>

            <h3 className="font-bold text-2xl mb-6">
              {editingBook ? "Edit Book" : "Add New Book"}
            </h3>

            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <input
                name="title"
                placeholder="Book Title"
                defaultValue={editingBook ? editingBook.title : ""}
                className="input input-bordered w-full"
                required
              />

              <input
                name="author"
                placeholder="Author Name"
                defaultValue={editingBook ? editingBook.author : ""}
                className="input input-bordered w-full"
                required
              />

              <select
                name="genre"
                defaultValue={editingBook?.genre}
                className="select select-bordered w-full md:col-span-2"
              >
                {allGenre.map((genre) => (
                  <option key={genre._id} value={genre.genre}>
                    {genre.genre}
                  </option>
                ))}
              </select>

              <textarea
                name="description"
                placeholder="Book Description"
                defaultValue={editingBook ? editingBook.description : ""}
                className="textarea textarea-bordered w-full md:col-span-2"
              />

              <div className="md:col-span-2">
                <label className="label font-medium">Book Cover</label>
                <input
                  type="file"
                  name="cover"
                  accept="image/*"
                  className="file-input file-input-bordered w-full"
                  required={!editingBook}
                />
              </div>

              <div className="md:col-span-2">
                <label className="label font-medium">Book PDF</label>
                <input
                  type="file"
                  name="pdf"
                  accept="application/pdf"
                  className="file-input file-input-bordered w-full"
                  required={!editingBook}
                />
              </div>

              <div className="md:col-span-2 mt-4">
                <button className="btn btn-success btn-wide shadow w-full">
                  Save Book
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </section>
  );
};

export default Book;

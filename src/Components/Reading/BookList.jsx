import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router";
import useGenreHook from "../../hooks/useGenreHook";

import SearchIcon from "@mui/icons-material/Search";
import StarIcon from "@mui/icons-material/Star";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

const BookList = () => {
  const { allGenre, loading: genreLoading } = useGenreHook();

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("");
  const fetchBooks = async () => {
    const res = await axios.get("/books-paginated", {
      params: {
        page,
        search,
        genres: genre || undefined,
        minRating,
        sort,
      },
      withCredentials: true,
    });
    if (page === 1) {
      setBooks(res.data.books);
    } else {
      setBooks((prev) => [...prev, ...res.data.books]);
    }

    setTotalPages(res.data.totalPages);
  };

  useEffect(() => {
    fetchBooks();
  }, [page, search, genre, minRating, sort]);

  const hasMore = page < totalPages;

  return (
    <section className="min-h-screen bg-base-200 p-6 w-11/12 mx-auto">
      <div className="mb-8 flex items-center gap-3">
        <LocalLibraryIcon className="text-primary" fontSize="large" />
        <h1 className="text-3xl font-bold tracking-tight">Browse Books</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <aside className="bg-base-100 shadow rounded-xl p-5 space-y-8">
          <div>
            <h3 className="font-semibold mb-3">Search</h3>
            <div className="relative">
              <SearchIcon className="absolute left-3 top-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title"
                className="input input-bordered w-full pl-10"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Sort By</h3>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => {
                setSort(e.target.value);
                setPage(1);
              }}
            >
              <option value="">Default</option>
              <option value="rating">Top Rated</option>
              <option value="shelved">Most Shelved</option>
            </select>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Genres</h3>
            {genreLoading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              <div className="flex flex-wrap gap-2">
                {allGenre.map((g) => (
                  <button
                    key={g._id}
                    onClick={() => {
                      setGenre(g.genre);
                      setPage(1);
                    }}
                    className={`btn btn-xs rounded-full ${
                      genre === g.genre ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {g.genre}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div>
            <h3 className="font-semibold mb-3">Minimum Rating</h3>
            <input
              type="range"
              min="0"
              max="5"
              step="1"
              value={minRating}
              onChange={(e) => {
                setMinRating(e.target.value);
                setPage(1);
              }}
              className="range range-warning"
            />
            <p className="text-sm mt-1">{minRating} stars & up</p>
          </div>
        </aside>
        <main className="lg:col-span-3">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {books.map((book) => (
              <Link
                to={`/book/${book._id}`}
                key={book._id}
                className="card bg-base-100 shadow-md hover:shadow-xl transition"
              >
                <img
                  src={book.cover}
                  className="h-60 object-cover rounded-t-xl"
                  alt={book.title}
                />
                <div className="p-4">
                  <h3 className="font-semibold text-sm line-clamp-2">
                    {book.title}
                  </h3>
                  <p className="text-xs opacity-60 mt-1">{book.author}</p>

                  <div className="flex items-center gap-1 mt-2 text-sm">
                    <StarIcon className="text-warning" fontSize="small" />
                    {book.rating || "N/A"}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center mt-12">
              <button
                className="btn btn-primary btn-wide rounded-full"
                onClick={() => setPage(page + 1)}
              >
                Load More
              </button>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default BookList;

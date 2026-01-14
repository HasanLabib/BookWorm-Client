import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UserAuthContext } from "../../Provider/AuthProvider/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { user, getUser } = useContext(UserAuthContext);

  const [userFormData, setUserFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError("");
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userFormData.email || !userFormData.password) {
      setError("Email and password are required");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("/login", userFormData, {
        withCredentials: true,
      });

      toast.success("Login successful");
      await getUser();

      console.log(res.data);
    } catch (err) {
      console.log(err);
      setError(err?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (user) {
      console.log("Logged in user:", user);
    }
  }, [user]);

  return (
    <section className="max-w-[300px] border border-black bg-gray-50 mx-auto w-11/12 mt-10 px-6 py-9 rounded-3xl shadow-2xl">
      <h2 className="text-2xl font-bold mb-4 w-[88%] mx-auto">Login</h2>

      {error && <p className="text-red-500 mb-3">{error}</p>}

      <form className="w-[88%] mx-auto space-x-4 " onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          className="input rounded-2xl w-full h-12  mb-5 border border-gray-50 bg-gray-300 opacity-50 "
          placeholder="Enter your email"
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          className="input rounded-2xl w-full h-12  mb-3 border border-gray-50 bg-gray-300 opacity-50 "
          placeholder="Enter your password"
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className=" btn rounded-2xl h-12 bg-slate-500 text-white w-full mt-4"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </section>
  );
};

export default Login;

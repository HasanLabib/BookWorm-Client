import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { UserAuthContext } from "../../Provider/AuthProvider/AuthContext";

const Register = () => {
  const [error, setError] = useState(" ");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    email: "",
    photo: null,
  });
  const { user: logged_in_User, getUser } = useContext(UserAuthContext);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setError(" ");
    const valueField = name === "photo" ? files[0] : value;
    setFormData({ ...formData, [name]: valueField });
  };
  const validation = () => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

    if (!formData?.name) {
      setError("Name is required");
      return false;
    }
    if (!formData?.email) {
      setError("Email is required");
      return false;
    }
    if (!formData?.photo) {
      setError("Profile photo is required");
      return false;
    }

    if (!passwordRegex.test(formData?.password)) {
      setError("Password must be 6+ chars with uppercase & lowercase letters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validation()) {
      console.log(error);
      return;
    }
    setLoading(true);
    const user = new FormData();

    user.append("name", formData?.name);
    user.append("email", formData?.email);
    user.append("password", formData?.password);
    user.append("photo", formData?.photo);

    try {
      const res = await axios.post("/register", user, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      console.log(res.data);
      await getUser();

      toast.success("Registration successful");
    } catch (err) {
      const msg = err?.response?.data?.message || "Registration failed";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (logged_in_User) {
      console.log("Logged in user:", logged_in_User);
    }
  }, [logged_in_User]);

  return (
    <section className="max-w-[350px] border border-black bg-gray-50 mx-auto w-11/12 mt-10 px-6 py-12  rounded-3xl shadow-2xl">
      <h1 className="font-black text-2xl mx-auto w-[85%] mb-4">Register</h1>
      <form className="w-[88%] mx-auto space-x-4" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input rounded-2xl w-full h-12 mb-5 border border-gray-50 bg-gray-300 opacity-50 "
          name="name"
          placeholder="John Don"
          onChange={handleChange}
          required
          aria-required
        />
        <input
          type="email"
          className="input rounded-2xl w-full h-12  mb-5 border border-gray-50 bg-gray-300 opacity-50 "
          name="email"
          placeholder="Email"
          onChange={handleChange}
          required
          aria-required
        />
        <input
          type="password"
          className="input rounded-2xl w-full  h-12  border mb-5 border-gray-50 bg-gray-300 opacity-50 "
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
          aria-required
        />
        <input
          type="file"
          className="file-input file-input-bordered  rounded-2xl border h-12  w-full mb-3 border-black  bg-gray-300 opacity-50 "
          name="photo"
          placeholder="Photo"
          accept="image/*"
          onChange={handleChange}
          required
          aria-required
        />

        <button className="btn rounded-2xl h-12 bg-slate-500 text-white w-full mt-4">
          Register
        </button>
      </form>
    </section>
  );
};

export default Register;

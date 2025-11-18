import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    contact: "",
  });

  // Handle Login
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      console.log("Logging in...");
      const res = await axios.post("http://localhost:3000/users/login", {
        email: formData.email,
        password: formData.password,
      },
        { withCredentials: true }
      );

      console.log(res);

      setMessage(res.data.message || "Login successful!");
      setError("");

      // Optional: store token
      if (res.data.token) localStorage.setItem("token", res.data.token);

      // Redirect to home page
      setTimeout(() => {
        setLoading(false);
        navigate("/home");
      }, 4000);
    } catch (err) {
      const errMsg = err.response?.data?.message || "Invalid email or password";
      setError(errMsg);
      setMessage("");
      setTimeout(() => setError(""), 3000);
    }
  };

  // Handle Signup
  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Signing up...");
      const res = await axios.post("http://localhost:3000/users/signup", {
        fullname: formData.fullname,
        email: formData.email,
        password: formData.password,
        contact: formData.contact,
      },
        { withCredentials: true }
      );

      // The backend now sends an object, so handle message properly
      setMessage(res.data.message || "Signup successful!");
      setError("");

      setTimeout(() => {
        setLoading(false);
        setIsLogin(true);
        setMessage("");
      }, 3000);
    } catch (err) {
      const errMsg =
        err.response?.data?.message ||
        err.response?.data ||
        "Something went wrong during signup";
      setError(errMsg);
      setMessage("");
      setTimeout(() => setError(""), 3000);
    }
  };

  //Toggle between Login & Signup
  const toggleAuth = () => {
    setIsLogin(!isLogin);
    setMessage("");
    setError("");
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 flex justify-center items-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">
          {isLogin ? "Welcome Back 👋" : "Create an Account 🚀"}
        </h2>

        {/* Status Messages */}
        {message && (
          <p className="text-green-600 font-semibold text-center mb-3">
            {message}
          </p>
        )}
        {error && (
          <p className="text-red-600 font-semibold text-center mb-3">{error}</p>
        )}

        {/* Auth Form */}
        <form
          onSubmit={isLogin ? handleLogin : handleSignup}
          className="space-y-4"
        >
          {!isLogin && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <label className="block text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter full name"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
              />
            </motion.div>
          )}

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter email"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-700 font-medium mb-1">
                Contact
              </label>
              <input
                type="text"
                placeholder="Enter number"
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 outline-none"
                onChange={(e) =>
                  setFormData({ ...formData, contact: e.target.value })
                }
              />
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 active:scale-95 transition-all font-semibold shadow-md"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <div className="text-center mt-4">
          <p className="text-gray-600">
            {isLogin
              ? "Don't have an account?"
              : "Already have an account?"}
            <span
              onClick={toggleAuth}
              className="text-blue-600 font-semibold cursor-pointer ml-1 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;

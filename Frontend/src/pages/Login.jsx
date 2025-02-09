import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FaUser, FaLock, FaSignOutAlt } from "react-icons/fa";

const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://travel-hogs.onrender.com/users/login",
        loginData,
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        setIsLoggedIn(true);
        alert("🎉 Login Successful! Redirecting...");
        navigate("/travel-planner", { replace: true });
        window.location.reload();
      } else {
        alert(response.data.message || "❌ Login failed. Please try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Login Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "❌ Login failed. Try again.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    alert("🚪 Logged out successfully!");
    navigate("/login", { replace: true });
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-200 to-white h-auto p-5">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        {isLoggedIn ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Already Logged In
            </h2>
            <p className="text-gray-600">You are already logged in.</p>
            <button
              onClick={handleLogout}
              className="mt-4 w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all duration-300"
            >
              <FaSignOutAlt className="inline-block mr-2" />
              Logout
            </button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-extrabold text-center text-gray-800">
              Welcome Back! 👋
            </h2>
            <p className="text-center text-gray-500">Log in to continue</p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-5">
              <div className="relative">
                <FaUser className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={loginData.email}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  value={loginData.password}
                  onChange={handleChange}
                  className="w-full pl-10 p-3 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none shadow-sm"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
                disabled={loading}
              >
                {loading ? "Logging In..." : "Login"}
              </button>
            </form>

            <div className="mt-5 text-center text-gray-600 space-y-3">
              <p>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="text-indigo-500 hover:underline font-semibold"
                >
                  Sign up
                </Link>
              </p>
              <p>
                <Link
                  to="/forgot-password"
                  className="text-gray-500 hover:underline font-semibold"
                >
                  Forgot Password?
                </Link>
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

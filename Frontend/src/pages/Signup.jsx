import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://travel-hogs.onrender.com/users/signup",
        signupData,
        { headers: { "Content-Type": "application/json" } }
      );

      setLoading(false);

      if (response.status === 201) {
        alert("✅ Signup successful! Please login.");
        navigate("/login", { replace: true }); // ✅ Redirect to login after signup
      } else {
        alert(response.data.message || "❌ Signup failed. Try again.");
      }
    } catch (error) {
      setLoading(false);
      console.error("Signup Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "❌ Signup failed. Try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-emerald-200 to-white h-auto p-5">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create an Account
        </h2>
        <p className="text-center text-gray-500">Sign up to get started</p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={signupData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={signupData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={signupData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300"
            disabled={loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-5 text-center text-gray-600">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;

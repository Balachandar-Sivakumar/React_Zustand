import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTodoStore from "../store/useStore";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const LoginForm = () => {
  const { authUser, error, setError, handleLogin } = useTodoStore();

  const [loginFormData, setLoginFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // If user already logged in, redirect to dashboard
    if (authUser && Object.keys(authUser).length > 0) {
      navigate("/dashboard");
    }
  }, [authUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin(loginFormData, setLoginFormData, navigate);
          }}
          className="mt-6 space-y-4"
        >
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={loginFormData.email}
              onChange={(e) => {
                setLoginFormData({...loginFormData,email: (e.target.value).toLowerCase()});
                setError({ ...error, email: "" });
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.email && (
              <small className="text-red-500">{error.email}</small>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={loginFormData.password}
                onChange={(e) => {
                  setLoginFormData({...loginFormData,password: e.target.value,});
                  setError({ ...error, password: "" });
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
              />

              {/* Eye Icon */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <AiFillEyeInvisible size={20} />
                ) : (
                  <AiFillEye size={20} />
                )}
              </button>
            </div>

            {error?.password && (
              <small className="text-red-500">{error.password}</small>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       font-semibold hover:bg-blue-700 transition"
          >
            Login
          </button>

          <span className="block text-center mt-2">
            If you don't have an account{" "}
            <Link className="text-blue-500 hover:underline" to="/register">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;

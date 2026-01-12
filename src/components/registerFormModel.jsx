import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import useTodoStore from "../store/useStore";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

function RegisterForm() {
  const { error, setError, handleRegister, authUser } = useTodoStore();

  const [formdata, setFormdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  ///if user already loged in it will redirect dashboard
  useEffect(() => {
    if (authUser && Object.keys(authUser).length > 0) {
      navigate("/dashboard");
    }
  }, [authUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <h2 className="text-3xl font-bold text-gray-800 text-center">
          Create Account
        </h2>
        <p className="text-sm text-gray-500 text-center mt-2">
          Sign up to get started
        </p>

        <form onSubmit={(e) => {
          e.preventDefault()
          handleRegister(navigate, formdata);
        }} className="mt-8 space-y-5">
          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Username
            </label>
            <input
              type="text"
              value={formdata.name}
              onChange={(e) => {
                setFormdata({ ...formdata, name: e.target.value });
                setError({ ...error, name: "" });
              }}
              placeholder="Enter your name"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
            {error?.name && <small className="text-red-500">{error.name}</small>}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={formdata.email}
              onChange={(e) => {
                setFormdata({ ...formdata, email: (e.target.value).toLowerCase() });
                setError({ ...error, email: "" });
              }}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                         focus:outline-none focus:ring-2 focus:ring-blue-500
                         focus:border-blue-500 transition"
            />
            {error?.email && <small className="text-red-500">{error.email}</small>}
          </div>

          {/* Password with Eye Icon */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formdata.password}
                onChange={(e) => {
                  setFormdata({ ...formdata, password: e.target.value });
                  setError({ ...error, password: "" });
                }}
                placeholder="••••••••"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5
                           focus:outline-none focus:ring-2 focus:ring-blue-500
                           focus:border-blue-500 pr-10 transition"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2
                           text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <AiFillEyeInvisible size={20} /> : <AiFillEye size={20} />}
              </button>
            </div>

            {error?.password && (
              <small className="text-red-500">{error.password}</small>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2.5 rounded-lg
                       font-semibold hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
          >
            Register
          </button>
        </form>

        {/* Footer */}
        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterForm;

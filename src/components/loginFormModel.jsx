import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useTodoStore from "../store/useStore";


const LoginForm = () => {

    const {authUser,error,setError,handleLogin} = useTodoStore()

    const  [loginFormData,setLoginFormData] = useState({
        email : '',
        password: ''
    })

    const navigate = useNavigate()

    useEffect(() => {

        ///if user already login redirect to dashboard
        if (Object.keys(authUser).length > 0) {
            navigate("/dashboard");
        }
    }, [authUser]);

    return (
         <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        <form onSubmit={(e) =>{
          e.preventDefault()
          handleLogin(loginFormData,setLoginFormData,navigate)
        } } className="mt-6 space-y-4">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Email
            </label>
            <input
              type="email"
              value={loginFormData.email}
              onChange={(e) =>{
                setLoginFormData({...loginFormData,email:e.target.value})
                setError({...error,email:''})
            }
            }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error.email && <small className="text-red-500">{error.email}</small>}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Password
            </label>
            <input
              type="password"
              value={loginFormData.password}
              onChange={(e) =>{
                setLoginFormData({...loginFormData,password:e.target.value})
                setError({...error,password:''})
            }  
            }
              className="w-full px-4 py-2 border border-gray-300 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error.password && <small className="text-red-500">{error.password}</small>}
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">
            Login
          </button>

          <span className="block text-center mt-2">If you don't have account <Link className='text-blue-500 hover:underline' to="/register">signUp</Link></span>

        </form>
      </div>
    </div>
    )
}

export default LoginForm;
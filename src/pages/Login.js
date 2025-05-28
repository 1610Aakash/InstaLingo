


import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import loginImage from '../assets/Images/login.avif'; // adjust path as needed

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();

  const [showPassword, setShowPassword] = useState(false);
  const rememberMe = watch("rememberMe");

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("rememberMe", true);
    }
  }, [setValue]);

  const onSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:4000/api/v1/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem("token", result.token);
        rememberMe
          ? localStorage.setItem("rememberedEmail", data.email)
          : localStorage.removeItem("rememberedEmail");

        toast.success("Login Successful!");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        if (
          result.error === "Invalid email or password" ||
          result.error === "User not found"
        ) {
          toast.error(result.error || "Login failed");
          setTimeout(() => navigate("/signup"), 2000); // Redirect to signup
        } else {
          toast.error("Login failed");
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
      console.error("Login error:", error);
    }
  };


  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 sm:px-6">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full">
        {/* Left Panel */}
        <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 bg-white">
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Welcome Back!</h2>
          <p className="text-gray-600 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Invalid email address',
                  },
                })}
                className="w-full mt-1 p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && (
                <span className="text-sm text-red-500">{errors.email.message}</span>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 6,
                      message: 'Password must be at least 6 characters',
                    },
                  })}
                  className="w-full mt-1 p-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <AiOutlineEyeInvisible size={20} />
                  ) : (
                    <AiOutlineEye size={20} />
                  )}
                </button>
              </div>
              {errors.password && (
                <span className="text-sm text-red-500">{errors.password.message}</span>
              )}
            </div>

            <div className="flex justify-between items-center text-sm">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  {...register('rememberMe')}
                  className="accent-blue-600"
                />
                Remember Me
              </label>
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              className="bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-all"
            >
              Login
            </button>
          </form>

          <div className="flex items-center justify-center gap-2 my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="text-sm text-gray-500">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <button
            onClick={() => toast('Google login coming soon!', { icon: '⚙️' })}
            className="py-2 border text-sm rounded-xl hover:bg-gray-100 w-full"
          >
            Login with Google
          </button>

          <p className="text-sm text-center mt-6">
            New here?{' '}
            <Link to="/signup" className="text-blue-600 hover:underline">
              Sign Up
            </Link>
          </p>
        </div>

        {/* Right Panel */}
        {/* <div className="hidden md:flex items-center justify-center p-6 bg-blue-50 md:w-1/2">
          <img
            src="./assets/login.avif"
            alt="Login"
            className="w-72 md:w-80 object-contain"
          />
        </div> */
        <div className="hidden md:flex items-center justify-center p-6 bg-blue-50 md:w-1/2">
      <img
        src={loginImage}
        alt="Login"
        className="w-72 md:w-80 object-contain"
      />
    </div>}
      </div>
    </div>
  );
};

export default Login;

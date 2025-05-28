

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { Toaster, toast } from 'react-hot-toast';
import signupImage from '../assets/Images/signup.webp'; // adjust path as needed
import axios from 'axios';

// Yup validation schema
const schema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
});

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const onSubmit = async (data) => {
  setLoading(true);
  console.log("Submitting signup form with data:", data);
  try {
    console.log("Sending request to backend...");
    const response = await axios.post('http://localhost:4000/api/v1/signup', {
      username: data.name,
      email: data.email,
      password: data.password,
    });
    console.log("Received response:", response);

    if (response.status === 201) {
      toast.success('Signup successful!');
      setTimeout(() => navigate('/login'), 1500); // ✅ Go to login
    }
  } catch (err) {
    console.error("Error during signup request:", err);

    if (
      err.response &&
      err.response.status === 400 &&
      err.response.data.error === "Email already exists"
    ) {
      toast.error("Account already exists with this email");

      // ✅ Redirect to login after showing error
      setTimeout(() => navigate('/login'), 2000);
    } else {
      toast.error("Signup failed, please try again");
    }
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-4 py-8 sm:px-6 lg:px-8">
      <Toaster position="top-right" />
      <div className="flex flex-col md:flex-row shadow-xl rounded-2xl overflow-hidden max-w-4xl w-full">
        {/* Left Form */}
        <div className="flex flex-col justify-center p-8 md:p-12 md:w-1/2 bg-white">
          <h2 className="text-3xl font-bold text-blue-800 mb-2">Create Account</h2>
          <p className="text-gray-600 mb-6 text-sm">Join our AI Writing Assistant</p>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <input
                type="text"
                placeholder="Full Name"
                {...register('name')}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <input
                type="email"
                placeholder="Email Address"
                {...register('email')}
                className="w-full p-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
                className="w-full p-3 pr-10 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <span
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
              </span>
              {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-blue-700 text-white py-3 rounded-xl hover:bg-blue-800 transition-all disabled:opacity-50"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <p className="text-sm text-center mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </div>

        {/* Right Image */}
        {/* <div className="hidden md:flex items-center justify-center p-6 bg-blue-50 md:w-1/2">
          <img
            src="https://cdn.dribbble.com/users/298092/screenshots/14202087/media/63f3a49a1351ceff894b41625ef948f5.png"
            alt="AI Illustration"
            className="w-72 md:w-80 object-contain"
          />
        </div> */}
        <div className="hidden md:flex items-center justify-center p-6 bg-blue-50 md:w-1/2">
      <img
        src={signupImage}
        alt="Signup"
        className="w-72 md:w-80 object-contain"
      />
    </div>
      </div>
    </div>
  );
};

export default Signup;

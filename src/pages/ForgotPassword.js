


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { FiEye, FiEyeOff } from 'react-icons/fi';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [storedUser, setStoredUser] = useState(null);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    watch: watchPassword,
    formState: { errors: passwordErrors },
  } = useForm();

  const evaluateStrength = (password) => {
    let strength = 0;
    if (password.length >= 6) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const handleEmailSubmit = (data) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      if (user && user.email === data.email) {
        setStoredUser(user);
        setStep(2);
        toast.success('Email verified! Please enter your new password.', {
          style: { background: '#D1FAE5', color: '#065F46' },
        });
      } else {
        toast.error('No user found with that email.', {
          style: { background: '#FEE2E2', color: '#991B1B' },
        });
      }
    } catch (error) {
      toast.error('Something went wrong accessing user data.');
    }
  };

  const handlePasswordReset = (data) => {
    if (data.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters.', {
        style: { background: '#FEE2E2', color: '#991B1B' },
      });
      return;
    }

    const updatedUser = { ...storedUser, password: data.newPassword };
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Password updated successfully!', {
      style: { background: '#D1FAE5', color: '#065F46' },
    });
    reset();
    setTimeout(() => navigate('/'), 1200);
  };

  const currentPassword = watchPassword('newPassword') || '';

  useEffect(() => {
    setPasswordStrength(evaluateStrength(currentPassword));
  }, [currentPassword]);

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 0:
      case 1:
        return 'bg-red-500';
      case 2:
        return 'bg-yellow-500';
      case 3:
        return 'bg-amber-500';
      case 4:
        return 'bg-green-500';
      default:
        return 'bg-gray-300';
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4 py-10">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-2xl">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">
          Forgot Password
        </h2>

        {step === 1 && (
          <form className="space-y-5" onSubmit={handleSubmit(handleEmailSubmit)}>
            <div>
              <label className="text-sm text-gray-600">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                {...register('email', { required: 'Email is required' })}
                className="mt-2 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none"
              />
              {errors.email && (
                <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition duration-200"
            >
              Verify Email
            </button>
          </form>
        )}

        {step === 2 && (
          <form className="space-y-5" onSubmit={handlePasswordSubmit(handlePasswordReset)}>
            <div className="relative">
              <label className="text-sm text-gray-600">New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter new password"
                {...registerPassword('newPassword', {
                  required: 'New password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className="mt-2 w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none pr-12"
              />
              <div
                className="absolute right-4 top-11 cursor-pointer text-gray-600"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
              </div>
              {passwordErrors.newPassword && (
                <p className="text-red-600 text-xs mt-1">{passwordErrors.newPassword.message}</p>
              )}
            </div>

            {/* Password Strength Bar */}
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className={`h-2.5 rounded-full transition-all duration-500 ${getStrengthColor(passwordStrength)}`}
                style={{ width: `${(passwordStrength / 4) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {passwordStrength < 2
                ? 'Weak Password'
                : passwordStrength < 4
                ? 'Medium Password'
                : 'Strong Password'}
            </p>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition duration-200"
            >
              Reset Password
            </button>
          </form>
        )}

        {/* <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className="text-blue-600 hover:underline text-sm"
          >
            Back to Login
          </button>
        </div> */}
        <div className="text-center mt-6">
  <button
    onClick={() => navigate('/login', { replace: true })}
    className="text-blue-600 hover:underline text-sm"
  >
    Back to Login
  </button>
</div>

      </div>
    </div>
  );
};

export default ForgotPassword;

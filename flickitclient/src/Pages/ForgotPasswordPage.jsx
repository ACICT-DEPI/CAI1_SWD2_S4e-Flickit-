import React from 'react';
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";

const ForgotPasswordPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">Forgot Password</h1>

        <p className="text-center mb-4 text-gray-600">
          Enter your email address to reset your password.
        </p>

        {/* Email Input */}
        <input
          type="email"
          placeholder="Enter your email"
          className="border border-gray-300 p-3 rounded w-full mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Send Reset Link Button */}
        <button className="w-full bg-blue-500 text-white p-3 rounded mb-4 hover:bg-blue-600">
          Send Reset Link
        </button>

        {/* Back to Login Link */}
        <p className="text-center">
          <a href="/login" className="text-blue-500 hover:underline">
            Back to Login
          </a>
        </p>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

// RegisterPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../assets/question-mark.png";
import backgroundImage from "../assets/Background.jpg";

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[a-zA-Z][a-zA-Z0-9]*$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!username) {
      newErrors.username = 'Username is required';
    } else if (username.length < 4) {
      newErrors.username = 'Username must be at least 4 characters long';
    } else if (!namePattern.test(username)) {
      newErrors.username = 'Username cannot be only numbers';
    }

    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 5) {
      newErrors.password = 'Password must be at least 5 characters long';
    }

    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailPattern.test(email)) {
      newErrors.email = 'Email is invalid';
    }

    return newErrors;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      })
      .then(response => {
        if (response.status === 409) {
          throw new Error('Username already exists');
        }
        return response.json();
      })
      .then(data => {
        if (data.message === 'Registration successful') {
          // Redirect to login page
          console.log('Registration successful');
          // Example redirection code, replace with actual navigation logic
          window.location.href = '/login';
        } else {
          setErrors({ global: data.message });
        }
      })
      .catch(error => {
        console.error('Error:', error);
        setErrors({ global: error.message });
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100"  style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        {/* Registration Form */}
        <form onSubmit={handleRegister}>
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.username ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.username && <p className="text-red-500 mb-4">{errors.username}</p>}

          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}

          {/* Email Input */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
          />
          {errors.email && <p className="text-red-500 mb-4">{errors.email}</p>}

          {/* Login Link */}
          <p className="text-right mb-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account ? Login
            </Link>
          </p>

          {/* Register Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded mb-4 hover:bg-blue-600"
          >
            Register
          </button>

          {/* Global Error Message */}
          {errors.global && <p className="text-red-500 text-center">{errors.global}</p>}
        </form>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default RegisterPage;

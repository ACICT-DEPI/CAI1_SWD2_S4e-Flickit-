import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from "../../assets/question-mark.png";
import backgroundImage from "../../assets/Background.jpg";
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [globalError, setGlobalError] = useState('');
  // const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const namePattern = /^[a-zA-Z][a-zA-Z0-9]*$/;

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

    return newErrors;
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    fetch('http://localhost:5000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
    .then(response => {
      if (response.status === 401) {
        throw new Error('Invalid username or password');
      }
      return response.json();
    })
    .then(data => {
      if (data.message === 'Login successful') {
        // Redirect to dashboard or another page
        console.log('Login successful');
        window.location.href = '/profile/:username'; // Replace with actual redirection
      }
    })
    .catch(error => {
      console.error('Error:', error);
      setGlobalError(error.message);
    });
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-gray-100"  style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
  
        {/* Login Form */}
        <form onSubmit={handleLogin}>
          {/* Username Input */}
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.username ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.username && <p className="text-red-500 mb-4">{errors.username}</p>}
  
          {/* Password Input */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.password && <p className="text-red-500 mb-4">{errors.password}</p>}
  
          {/* Forgot Password Link */}
          <p className="text-right mb-4">
            <Link to="/forgot-password" className="text-blue-500 hover:underline">
              Forgot Password ?
            </Link>
          </p>
  
          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded mb-4 hover:bg-blue-600"
          >
            Login
          </button>
  
          {/* Register Link */}
          <p className="text-left mb-4">
            <Link to="/register" className="text-blue-500 hover:underline">
              First time in Flickit! , Create account :)
            </Link>
          </p>
  
          {/* Global Error Message */}
          {globalError && <p className="text-red-500 text-center">{globalError}</p>}
        </form>
      </div>
  
      {/* Bottom Right Section */}
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
  
  
};

export default LoginPage;

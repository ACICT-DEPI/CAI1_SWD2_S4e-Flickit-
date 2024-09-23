import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createUser } from "../api/userApi";
import swal from "sweetalert2";
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';
const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password, email } = formData;
    
    if (username.length < 4 || /^\d+$/.test(username)) {
      swal.fire("Error", "Username must be at least 4 characters and cannot be only numbers", "error");
      return false;
    }
    
    if (password.length < 4) {
      swal.fire("Error", "Password must be at least 4 characters", "error");
      return false;
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      swal.fire("Error", "Please enter a valid email address", "error");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      await createUser(formData);
      swal.fire("Success", "User Created", "success");
    } catch (error) {
      if (error.response && error.response.status === 409) {
        swal.fire("Error", "Username already exists", "error");
      } else {
        swal.fire("Error", "Failed to create User", "error");
      }
      console.log(error);
    }
  };
  
  

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gray-100"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>
      <div className="flex items-center justify-center p-8" style={{ paddingTop: '120px' }}>
      <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6">Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            name='username'
            value={formData.username}
            onChange={handleChange}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500  'border-gray-300'}`}
          />

          <input
            type="password"
            placeholder="Password"
            name='password'
            value={formData.password}
            onChange={handleChange}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500  'border-gray-300'}`}
          />

          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            name='email'
            onChange={handleChange}
            className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 'border-gray-300'}`}
          />

          <p className="text-right mb-4">
            <Link to="/login" className="text-blue-500 hover:underline">
              Already have an account? Login
            </Link>
          </p>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded mb-4 hover:bg-blue-600"
          >
            Register
          </button>

        </form>
      </div>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default RegisterPage;

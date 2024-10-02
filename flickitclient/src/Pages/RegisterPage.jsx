import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Added useNavigate
import { createUser } from "../api/userApi";
// import swal from "sweetalert2";
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import HomeNavBar from '../Components/HomeNavBar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { username, password, email } = formData;

    if (username.length < 4 || /^\d+$/.test(username)) {
      toast.error("Username must be at least 4 characters and cannot be only numbers");
      return false;
    }

    if (password.length < 4) {
      toast.error("Password must be at least 4 characters");
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      toast.error("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      await createUser(formData);
      toast.success("User Created");
  
      // Add a delay before navigating
      setTimeout(() => {
        navigate('/login');
      }, 2000); // 2 seconds delay
    } catch (error) {
      if (error.response && error.response.status === 409) {
        toast.error("Username already exists");
      } else {
        toast.error("Failed to create User");
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
        <HomeNavBar />
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
              className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />

            <input
              type="password"
              placeholder="Password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
            />

            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              name='email'
              onChange={handleChange}
              className="border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
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
            <ToastContainer  className="custom-toast-container"
  position="top-right"
  autoClose={3000}
  hideProgressBar={false}
  closeOnClick
  pauseOnHover
  draggable
  toastClassName="custom-toast-container" />

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

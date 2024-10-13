import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { loginUser } from "../api/userApi"; 
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import swal from "sweetalert2";
import Navbar from '../Components/NavBar';
import Cookies from 'js-cookie'; 
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Check for admin credentials
    if (username === 'admin' && password === '1111111111') {
      toast.success("Welcome, Admin!");
      setTimeout(() => {
        localStorage.setItem('username', username);
        navigate('/admin');
      }, 1000);
      return;
    }

    // Proceed with loginUser function
    try {
      const data = await loginUser({ username, password });
      
      toast.success(data.message);
      setTimeout(() => {
        Cookies.set('token', data.token, { expires: 7 });
        localStorage.setItem('username', username);
        navigate('/GamesPage');
      }, 1000);
      
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An unexpected error occurred");
      }
      console.log(error);
    }
  };
  return (
    <div
      className="min-h-screen bg-gray-100 relative"
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
        <div className="bg-blue-300 rounded-lg shadow-md w-full max-w-md p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Login</h1>
  
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            />
  
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`border p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300`}
            />
  
            <p className="text-right mb-4">
              <Link to="/forgot-password" className="text-blue-500 hover:underline">
                Forgot Password?
              </Link>
            </p>
  
            <button
              type="submit"
              className="w-full bg-blue-500 text-white p-3 rounded mb-4 hover:bg-blue-600"
            >
              Login
            </button>
  
            <p className="text-left mb-4">
              <Link to="/register" className="text-blue-500 hover:underline">
                First time in Flickit! Create account :)
              </Link>
            </p>
          </form>
        </div>
      </div>
      <ToastContainer
        className="custom-toast-container"
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default LoginPage;

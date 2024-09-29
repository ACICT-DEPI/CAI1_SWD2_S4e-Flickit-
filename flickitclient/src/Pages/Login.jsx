import { useState } from 'react';
import { Link } from 'react-router-dom';
import { loginUser } from "../api/userApi"; 
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import swal from "sweetalert2";
import Navbar from '../Components/NavBar';
import Cookies from 'js-cookie'; // Import the js-cookie library

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const data = await loginUser({ username, password });
      
      swal.fire({
        title: "Success",
        text: data.message,
        icon: "success",
        confirmButtonText: "OK"
      }).then(() => {
        // Set the token in cookies
        Cookies.set('token', data.token, { expires: 7 }); // Set token with a 7-day expiry
        localStorage.setItem('username', username);
      });
      
    } catch (error) {
      if (error.response) {
        swal.fire("Error", error.response.data.message, "error");
      } else {
        swal.fire("Error", "An unexpected error occurred", "error");
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
  
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default LoginPage;

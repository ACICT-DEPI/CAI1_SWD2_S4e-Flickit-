import { useState } from 'react';
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import swal from 'sweetalert2';
import axios from 'axios';
import Navbar from '../Components/NavBar';
const ForgotPasswordPage = () => {
  const [username, setUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:8000/api/update-password', {
        username,
        newPassword,
      });
      swal.fire("Success", "Password updated successfully", "success");
    } catch (error) {
      swal.fire("Error", "Failed to update password", "error");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="flex items-center justify-center min-h-screen pt-16"> 
        <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md">
          <h1 className="text-2xl font-bold text-center mb-6">Update Password</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="w-full bg-blue-500 text-white p-3 rounded mb-4 hover:bg-blue-600">
              Update Password
            </button>
          </form>

          <p className="text-center">
            <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
          </p>
        </div>
        <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
          <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
          <p className="text-3xl font-bold text-white">Flickit!</p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;

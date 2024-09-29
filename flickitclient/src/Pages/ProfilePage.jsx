import { useEffect, useState } from 'react';
import profileImage from '../assets/images/user.png';
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import axios from 'axios';
import swal from "sweetalert2";
import Navbar from '../Components/NavBar';

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newEmail, setNewEmail] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const username = localStorage.getItem('username');
        const response = await axios.get(`http://localhost:8000/api/user-profile?username=${username}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    swal.fire({
      title: 'Are You Sure ?',
      text: 'Log out!',
      confirmButtonText: 'OK'
    }).then(() => {
      localStorage.removeItem('username');
      window.location.href = '/login';    
    });
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode) {
      setNewUsername(userData.username);
      setNewEmail(userData.email);
    }
  };

  const handleSave = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.put(`http://localhost:8000/api/user-profile`, {
        username: localStorage.getItem('username'), 
        newUsername,
        email: newEmail
      });

      swal.fire("Success", "Profile updated successfully", "success");
      setUserData(response.data);
      setEditMode(false); 
    } catch (error) {
      console.error('Error saving user data:', error);
      swal.fire("Error", "Failed to update profile", "error");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 relative" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="flex items-center justify-center p-8" style={{ paddingTop: '150px' }}>
        <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md relative">
          <div className="flex justify-center mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="absolute top-[-15%] left-1/2 transform -translate-x-1/2 h-32 w-32 rounded-full object-cover shadow-lg"
            />
          </div>

          <form className='mt-20' onSubmit={handleSave}>
            {userData ? (
              <>
                {editMode ? (
                  <>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder="New Username"
                      className="border rounded p-2 w-full mb-4"
                    />
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="New Email"
                      className="border rounded p-2 w-full mb-4"
                    />
                  </>
                ) : (
                  <>
                    <div className="mb-4 text-center">
                      <label className="block text-gray-700 text-xl font-bold">{userData.username}</label> 
                    </div>
                    <div className="mb-4 text-center">
                      <label className="block text-gray-700 font-bold">{userData.location || 'Cairo, Egypt'}</label> 
                    </div>
                    <div className="mb-4 text-center">
                      <label className="block text-gray-700 font-bold">{userData.email}</label> 
                    </div>
                  </>
                )}
              </>
            ) : (
              <p className="text-center">Loading...</p>
            )}

            <div className="flex justify-around mb-4">
              <button
                type="button"
                onClick={handleEditToggle}
                className={`bg-blue-500 text-white p-2 rounded px-16 hover:bg-blue-600`}>
                {editMode ? 'Cancel' : 'Edit'}
              </button>

              {editMode && (
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded px-5 mx-2 hover:bg-green-600"
                >
                  Save
                </button>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="bg-red-500 text-white p-2 rounded px-12 hover:bg-red-600"
              >
                Log Out
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Logo and title at the bottom-right corner */}
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default ProfilePage;
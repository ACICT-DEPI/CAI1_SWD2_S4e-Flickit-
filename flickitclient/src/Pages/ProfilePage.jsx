import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
import profileImage from '../assets/images/user.png'; // Import your profile image
import backgroundImage from "../assets/images/Background.jpg";
import logo from "../assets/images/question-mark.png";

const ProfilePage = () => {
  // const { username } = useParams();
  // const [profile, setProfile] = useState({ username: '', email: '', password: '' });
  const [editMode, setEditMode] = useState(false);
  // const [errors, setErrors] = useState({});
  // const [globalError, setGlobalError] = useState('');

  // useEffect(() => {
  //   fetch(`http://localhost:5000/api/profile/${username}`)
  //     .then(response => response.json())
  //     .then(data => setProfile(data))
  //     .catch(error => {
  //       console.error('Error fetching profile:', error);
  //       setGlobalError('Failed to load profile');
  //     });
  // }, [username]);

  // const validateForm = () => {
  //   const newErrors = {};
  //   if (!profile.email.includes('@')) {
  //     newErrors.email = 'Invalid email address';
  //   }
  //   if (profile.password && profile.password.length < 5) {
  //     newErrors.password = 'Password must be at least 5 characters long';
  //   }
  //   return newErrors;
  // };

  // const handleUpdate = (e) => {
  //   e.preventDefault();
  //   const formErrors = validateForm();
  //   if (Object.keys(formErrors).length > 0) {
  //     setErrors(formErrors);
  //     return;
  //   }

  //   fetch(`http://localhost:5000/api/profile/${username}`, {
  //     method: 'PUT',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(profile),
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     if (data.message === 'Profile updated successfully') {
  //       setEditMode(false);
  //       alert('Profile updated successfully');
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error updating profile:', error);
  //     setGlobalError('Failed to update profile');
  //   });
  // };

  const handleLogout = () => {
    // Handle logout functionality
    alert('Logged out!');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100" style={{
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
      <div className="p-8 bg-blue-300 rounded-lg shadow-md w-full max-w-md relative">
        {/* Profile Image at the top center */}
        <div className="flex justify-center mb-4">
          <img
            src={profileImage}
            alt="Profile"
            className="absolute top-[-15%] left-1/2 transform -translate-x-1/2 h-32 w-32 rounded-full object-cover shadow-lg"
          />
        </div>


        {/* Profile Form */}
        {/* onSubmit={handleUpdate} */}
        <form className='mt-20'>
          {/* Centered Labels */}
          <div className="mb-4 text-center">
            <label className="block text-gray-700 text-xl font-bold">Basmala Naeem</label>
          </div>
          <div className="mb-4 text-center">
            <label className="block text-gray-700 font-bold">Cairo, Egypt</label>
          </div>
          <div className="mb-4 text-center">
            <label className="block text-gray-700 font-bold">basmalanaeem@gamil.com</label>
          </div>
          <div className="mb-4 text-center">
            <label className="block text-gray-700 font-bold">Score</label>
          </div>

          {/* Edit and Log Out Buttons */}
          <div className="flex justify-around mb-4">
            <button
              type="button"
              onClick={() => setEditMode(!editMode)}
              className={`bg-blue-500 text-white p-2 rounded px-16 hover:bg-blue-600 ${editMode ? 'bg-gray-500' : 'bg-blue-500'}`}> {editMode ? 'Cancel' : 'Edit'}
            </button>

            {editMode && (
              <button
                type="submit"
                className="bg-green-500 text-white p-2 rounded px-10 hover:bg-green-600"
              >
                Save
              </button>
            )}

            {/* Log Out Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="bg-red-500 text-white p-2 rounded px-12 hover:bg-red-600"
            >
              Log Out
            </button>
          </div>

          {/* Global Error Message */}
          {/* {globalError && <p className="text-red-500 text-center">{globalError}</p>} */}
        </form>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
};

export default ProfilePage;

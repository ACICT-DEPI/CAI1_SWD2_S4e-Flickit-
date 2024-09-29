import { useEffect, useState } from 'react';
import { CgGames } from "react-icons/cg";
import { MdPerson } from "react-icons/md";
import { Slide } from '../Styles/slide';
import logo from '../assets/images/question-mark.png';
import '../Styles/Admin.css';
import axios from 'axios';

export function Admin() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users') // Ensure the endpoint matches your backend route
      .then((response) => setUsers(response.data))
      .catch((error) => console.log('Error fetching users:', error));
  }, []);

  return (
    <div className="flex">
      <Slide />
      <div className="p-4 sm:p-16 bg-white h-full flex justify-center items-center flex-col">
        <div className="flex justify-between items-center mb-8 w-full">
          <div className="text-purple">
            <i className="fas fa-bell"></i> {/* Optional notification icon */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 justify-center items-center w-full">
          {/* Games Card */}
          <div className="bg-gradient-to-r from-pink-500 p-6 sm:p-8 rounded-2xl shadow-xl flex justify-between items-center w-full max-w-xs mx-auto">
            <div>
              <CgGames className="text-pink-300 text-6xl mb-4" />
              <p className="text-white text-4xl font-semibold">Games</p>
            </div>
            <div className="text-6xl text-white font-bold">4</div>
          </div>

          {/* Users Card */}
          <div className="bg-gradient-to-r from-indigo-500 p-6 sm:p-8 rounded-2xl shadow-xl flex justify-between items-center w-full max-w-xs mx-auto">
            <div>
              <MdPerson className="text-purple-300 text-6xl mb-4" />
              <p className="text-white text-4xl font-semibold">Users</p>
            </div>
            <div className="text-6xl text-white font-bold">{users.length}</div> {/* Display user count */}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
}

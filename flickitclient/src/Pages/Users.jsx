import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import { MdEdit, MdDelete, MdPerson } from "react-icons/md";
import {Slide} from '../Styles/slide'

export function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from MongoDB
  useEffect(() => {
    axios
      .get('http://localhost:3000/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.log(error));
  }, []);

  // Delete user function
  const handleDelete = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`http://localhost:3000/users/${userId}`)
        .then(() => {
          // Remove the user from the state after deletion
          setUsers(users.filter(user => user.Id !== userId));
        })
        .catch((error) => console.error("Error deleting user: ", error));
    }
  };

  // Update user function (navigates to update page)
  const handleUpdate = (userId) => {
    navigate(`/update/${userId}`); // Assuming the update page takes the userId as a route parameter
  };

  return (
    <div className="flex">
<Slide/>
    
    <div className="flex flex-col items-center mb-20">
      
      {/* Header with User Icon */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500 p-5 rounded-xl shadow-lg mb-8">
        <MdPerson className="text-4xl text-white" />
        <div>
          <p className="text-white text-lg">Users</p>
          <p className="text-white text-2xl font-bold">{users.length}</p>
        </div>
      </div>

      {/* Add New User Button */}
      <div className="flex justify-between w-2/3">
        <Link
          to="/create"
          className="inline-block px-6 py-2 border-2 border-green-500 text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500">
          Add +
        </Link>
      </div>

      {/* User Table */}
      <div className="w-2/3 bg-white rounded-md p-10 m-5 shadow-lg">
        <table className="w-full text-left table-auto">
          <thead>
            <tr className="text-gray-600 font-semibold border-b">
              <th className="p-4">Name</th>
              <th className="p-4">Email</th>
              <th className="p-4">Id</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.Id} className="border-b hover:bg-gray-100">
                <td className="p-4">{user.Name}</td>
                <td className="p-4">{user.Email}</td>
                <td className="p-4">{user.Id}</td>
                <td className="p-4">
                  <div className="flex gap-2">
                    {/* Update (Edit) Icon */}
                    <button onClick={() => handleUpdate(user.Id)}>
                      <MdEdit className="text-indigo-500 hover:text-indigo-700 text-xl cursor-pointer" />
                    </button>

                    {/* Delete Icon */}
                    <button onClick={() => handleDelete(user.Id)}>
                      <MdDelete className="text-red-500 hover:text-red-700 text-xl cursor-pointer" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}

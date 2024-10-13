import { useEffect, useState } from "react";
import axios from 'axios';
import { Link, useNavigate } from "react-router-dom";
import {  MdDelete, MdPerson } from "react-icons/md";
import { Slide } from '../Styles/slide';
import swal from "sweetalert2";

export function Users() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Fetch users from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/api/users') // Ensure the endpoint matches your backend route
      .then((response) => setUsers(response.data))
      .catch((error) => console.log('Error fetching users:', error));
  }, []);

  // Delete user function
  const handleDelete = (userId) => {
    swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this user? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/api/users/${userId}`) // Use backticks here
          .then((response) => {
            setUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
            swal.fire({
              title: "Success",
              text: response.data.message || "User deleted successfully.",
              icon: "success",
              confirmButtonText: "OK"
            });
          })
          .catch((error) => {
            console.error("Error deleting user: ", error);
            swal.fire({
              title: "Error",
              text: "Failed to delete user. Please try again.",
              icon: "error",
              confirmButtonText: "OK"
            });
          });
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row">
      <Slide />

      <div className="flex flex-col items-center w-full lg:w-4/5 px-4 sm:px-6 lg:px-8 mb-20 mt-10">
        {/* Header with User Icon */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500 p-5 rounded-xl shadow-lg mb-8">
          <MdPerson className="text-5xl text-white" />
          <div>
            <p className="text-white text-xl">Users</p>
            <p className="text-white text-3xl font-bold">{users.length}</p>
          </div>
        </div>

        {/* User Table */}
        <div className="w-full lg:w-3/4 bg-white rounded-md p-6 sm:p-12 m-5 shadow-lg overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-gray-600 font-bold border-b text-lg">
                <th className="p-5">Name</th>
                <th className="p-5">Email</th>
                <th className="p-5">Id</th>
                <th className="p-5">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-100">
                  <td className="p-5 text-lg">{user.username}</td>
                  <td className="p-5 text-lg">{user.email}</td>
                  <td className="p-5 text-lg">{user._id}</td>
                  <td className="p-5">
                    <div className="flex gap-3">


                      {/* Delete Icon */}
                      <button onClick={() => handleDelete(user._id)}>
                        <MdDelete className="text-red-500 hover:text-red-700 text-2xl cursor-pointer" />
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
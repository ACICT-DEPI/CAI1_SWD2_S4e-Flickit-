import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

export function Update() {
  const { userId } = useParams();
  const [user, setUser] = useState({ Name: '', Email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/${userId}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.log(error));
  }, [userId]);

  const handleUpdate = () => {
    axios
      .put(`http://localhost:8000/users/${userId}`, user)
      .then(() => {
        navigate('/'); // Redirect back to user list
      })
      .catch((error) => console.error("Error updating user: ", error));
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold">Update User</h1>
      <form className="w-1/2 mt-5">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={user.Name}
            onChange={(e) => setUser({ ...user, Name: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={user.Email}
            onChange={(e) => setUser({ ...user, Email: e.target.value })}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="button"
          onClick={handleUpdate}
          className="px-4 py-2 bg-blue-500 text-white rounded-md">
          Update
        </button>
      </form>
    </div>
  );
}

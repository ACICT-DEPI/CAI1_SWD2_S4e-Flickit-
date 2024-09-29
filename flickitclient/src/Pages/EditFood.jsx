import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { MdEdit, MdDelete } from "react-icons/md";
import { Slide } from '../Styles/slide';
import swal from "sweetalert2";
import { PiFilmSlateFill } from "react-icons/pi";

export function EditFood() {
  const [food, setfood] = useState([]);
  const navigate = useNavigate();

  // Fetch films from the backend
  useEffect(() => {
    axios
      .get('http://localhost:8000/foods') 
      .then((response) => setfood(response.data))
      .catch((error) => console.log('Error fetching films:', error));
  }, []);

  // Delete film function
  const handleDelete = (foodId) => {
    swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this food? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:8000/food/${foodId}`) 
          .then((response) => {
            setfood((prevfoods) => prevfoods.filter((food) => food._id !== foodId));
            swal.fire({
              title: "Success",
              text: response.data.message || "Film deleted successfully.",
              icon: "success",
              confirmButtonText: "OK"
            });
          })
          .catch((error) => {
            console.error("Error deleting food: ", error);
            swal.fire({
              title: "Error",
              text: "Failed to delete food. Please try again.",
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
        {/* Header with Film Icon */}
        <div className="flex items-center gap-4 bg-gradient-to-r from-indigo-500 p-5 rounded-xl shadow-lg mb-8">
          <PiFilmSlateFill className="text-4xl text-white" />
          <div>
            <p className="text-white text-lg">Food</p>
            <p className="text-white text-2xl font-bold">{food.length}</p>
          </div>
        </div>
        {/* Film Table */}
        <div className="w-full lg:w-2/3 bg-white rounded-md p-5 sm:p-10 m-5 shadow-lg overflow-x-auto">
          <table className="w-full text-left table-auto">
            <thead>
              <tr className="text-gray-600 font-semibold border-b">
                <th className="p-4">Food Emojis</th>
                <th className="p-4">Actual food Name</th>
                <th className="p-4">Id</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {food.map((food) => (
                <tr key={food._id} className="border-b hover:bg-gray-100">
                  <td className="p-4">{food.foodEmojis}</td>
                  <td className="p-4">{food.actualFoodName}</td>
                  <td className="p-4">{food.createdById}</td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      {/* Update (Edit) Icon */}
                      <button onClick={() => navigate(`/EditFilm/${food._id}`)}>
                        <MdEdit className="text-indigo-500 hover:text-indigo-700 text-xl cursor-pointer" />
                      </button>

                      {/* Delete Icon */}
                      <button onClick={() => handleDelete(food._id)}>
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

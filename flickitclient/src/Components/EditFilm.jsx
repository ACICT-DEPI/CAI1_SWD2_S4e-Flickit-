import React, { useState, useEffect } from 'react';
import GameBar from './gameBar';
import Button from './Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useParams } from 'react-router-dom';
import logo from '../assets/images/question-mark.png';
import Navbar from "../Components/NavBar";
import backgroundImage from "../assets/images/Background.jpg";

const EditFilm = () => {
    const { id } = useParams(); 
    const [movieEmojis, setMovieEmojis] = useState('');
    const [actualMovieName, setActualMovieName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFilmData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/game/${id}`); // Replace with your actual API endpoint
                const filmData = response.data;
                setMovieEmojis(filmData.movieEmojis);
                setActualMovieName(filmData.actualMovieName);
            } catch (error) {
                console.error("Error fetching film data:", error);
                setErrorMessage("Error fetching film data.");
            }
        };
        
        fetchFilmData();
    }, [id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');

        // Check if any input is empty and show SweetAlert
        if (!movieEmojis || !actualMovieName) {
            Swal.fire({
                icon: 'error',
                title: 'Missing Fields',
                text: 'Both fields are required. Please fill in all fields.',
                confirmButtonColor: '#7209B7',
            });
            setLoading(false);
            return;
        }

        const payload = {
            movieEmojis,
            actualMovieName,
        };

        try {
            // Use 'id' instead of 'gameId'
            const response = await axios.put(`http://localhost:8000/movie/${id}`, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Movie updated:", response.data);

            // Show SweetAlert success message
            Swal.fire({
                icon: 'success',
                title: 'Movie Updated!',
                text: 'The movie has been successfully updated.',
                confirmButtonColor: '#7209B7',
            });
        } catch (error) {
            setErrorMessage("Error updating movie: " + (error.response?.data.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div 
            className="min-h-screen flex flex-col bg-gray-100 relative" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <Navbar />
            <div className="flex justify-center items-center flex-grow w-full h-full"> 
                <div className="flex justify-around items-center flex-grow w-full h-full">
                    <form onSubmit={handleSubmit} className='flex flex-col pb-8 border border-gray-500 items-center justify-start bg-opacity-60 w-1/3 rounded-lg bg-[#290346]'>
                        <GameBar />
                        <div className="w-full px-6">
                            <div className="mb-4 w-full">
                                <label className="block text-xl text-white font-DancingScript mb-2">Movie Emoji</label>
                                <input
                                    type="text"
                                    placeholder="Enter Movie ...."
                                    className="bg-transparent border border-gray-500 w-full p-2 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7209B7]"
                                    value={movieEmojis}
                                    onChange={(e) => setMovieEmojis(e.target.value)}
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <label className="block text-xl text-white font-DancingScript mb-2">Movie Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter movie name ......"
                                    className="bg-transparent border border-gray-500 w-full p-2 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7209B7]"
                                    value={actualMovieName}
                                    onChange={(e) => setActualMovieName(e.target.value)}
                                />
                            </div>
                            {loading && <p className="text-white">Updating movie...</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button
                                type="submit"
                                style="w-full text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
                                text="Update"
                            />
                        </div>
                    </form>
                    <div className="flex flex-col justify-center items-center">
                        <img src={logo} alt="Flickit Logo" className="mb-2 w-5/6 h52/6" />
                        <h1 className="text-white text-4xl font-Risque">Flickit!</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EditFilm;

import React, { useState } from 'react';
import GameBar from './gameBar';
import Button from '../Components/Button';
import axios from 'axios';
import Swal from 'sweetalert2'; // Import SweetAlert

function GameForm() {
    const [movieEmojis, setMovieEmojis] = useState('');
    const [actualMovieName, setActualMovieName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

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
                confirmButtonColor: '#7209B7', // Optional: Customizing the button color
            });
            setLoading(false);
            return;
        }

        const payload = {
            movieEmojis,
            actualMovieName,
            createdById: '66f057bfede303183691e9da', // Replace with actual user ID
        };

        try {
            const response = await axios.post('http://localhost:8000/game', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            console.log("Movie created:", response.data);

            // Show SweetAlert success message
            Swal.fire({
                icon: 'success',
                title: 'Movie Created!',
                text: 'The movie has been successfully created.',
                confirmButtonColor: '#7209B7',
            });

            // Optionally clear the form after success
            setMovieEmojis('');
            setActualMovieName('');
        } catch (error) {
            setErrorMessage("Error creating movie: " + (error.response?.data.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    return (
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
                {loading && <p className="text-white">Creating movie...</p>}
                {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                <Button
                    type="submit"
                    style="w-full text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
                    text="Create"
                />
            </div>
        </form>
    );
}

export default GameForm;
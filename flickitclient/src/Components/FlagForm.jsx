import React, { useState, useEffect } from 'react';
import GameBar from './gameBar';
import Button from '../Components/Button';
import axios from 'axios';
import Swal from 'sweetalert2';
import backgroundImage from "../assets/images/Background.jpg";
import logo from '../assets/images/question-mark.png';
import Navbar from "../Components/NavBar";

function FoodForm() {
    const [flagEmojis, setFlagEmojis] = useState('');
    const [actualFlagName, setActualFlagName] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchFlags = async () => {
            try {
                const response = await axios.get('http://localhost:8000/flags');
                console.log(response.data); // Handle the fetched data
            } catch (error) {
                console.error("Error fetching flags:", error);
                // Handle error state here if needed
            }
        };

        fetchFlags();
    }, []); // Empty dependency array means this runs once after the component mounts

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setErrorMessage('');
    
        if (!flagEmojis || !actualFlagName) {
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
            flagEmojis,
            actualCountryName: actualFlagName, // Change this to actualCountryName to match the backend
            createdById: '66f057bfede303183691e9da', // Replace with actual user ID
        };
    
        try {
            const response = await axios.post('http://localhost:8000/flag', payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            Swal.fire({
                icon: 'success',
                title: 'Flag Created!',
                text: 'The flag has been successfully created.',
                confirmButtonColor: '#7209B7',
            });
    
            setFlagEmojis('');
            setActualFlagName('');
        } catch (error) {
            setErrorMessage("Error creating flag: " + (error.response?.data.message || error.message));
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
            <div className=" flex justify-center items-center  flex-grow w-full h-full"> 
                <div className="flex  justify-around  items-center flex-grow w-full h-full">
                    <form onSubmit={handleSubmit} className='flex flex-col pb-8 border border-gray-500 items-center justify-start bg-opacity-60 w-1/3 rounded-lg bg-[#290346]'>
                        <GameBar />
                        <div className="w-full px-6">
                            <div className="mb-4 w-full">
                                <label className="block text-xl text-white font-DancingScript mb-2">Flag </label>
                                <input
                                    type="text"
                                    placeholder="Enter Flag...."
                                    className="bg-transparent border border-gray-500 w-full p-2 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7209B7]"
                                    value={flagEmojis}
                                    onChange={(e) => setFlagEmojis(e.target.value)}
                                />
                            </div>
                            <div className="mb-6 w-full">
                                <label className="block text-xl text-white font-DancingScript mb-2">Flag Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter flag name......"
                                    className="bg-transparent border border-gray-500 w-full p-2 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7209B7]"
                                    value={actualFlagName}
                                    onChange={(e) => setActualFlagName(e.target.value)}
                                />
                            </div>
                            {loading && <p className="text-white">Creating Flag...</p>}
                            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                            <Button
                                type="submit"
                                style="w-full text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
                                text="Create"
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

export default FoodForm;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';

const SetNumber = () => {
    const [userDefinedNumber, setUserDefinedNumber] = useState('');
    const navigate = useNavigate();

    const handleSetNumber = () => {
        const numericNumber = parseInt(userDefinedNumber, 10);

        if (numericNumber >= 1 && numericNumber <= 100) {
            navigate('/guessing-number', { state: { userDefinedNumber: numericNumber } });
        } else {
            alert('Please enter a valid number between 1 and 100.');
        }
    };

    return (
        <div className="flex flex-col min-h-screen">
            <div className="fixed top-0 w-full z-10">
                <Navbar />
            </div>

            <div className="flex-grow flex items-center justify-center bg-gray-200 mt-16" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="p-8 bg-blue-300 rounded-lg shadow-md max-w-sm w-full">
                    <h3 className="text-2xl font-bold mb-4 text-center">Set Number to Guess</h3>
                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        value={userDefinedNumber}
                        onChange={(e) => setUserDefinedNumber(e.target.value)}
                        placeholder="Enter a number between 1 and 100"
                    />
                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={handleSetNumber}
                    >
                        Set Number and Start Game
                    </button>
                </div>
                <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                    <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                    <p className="text-3xl font-bold text-white">Flickit!</p>
                </div>
            </div>
        </div>
    );
};

export default SetNumber;

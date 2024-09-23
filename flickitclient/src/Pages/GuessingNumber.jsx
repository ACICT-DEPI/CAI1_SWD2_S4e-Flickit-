import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';
const GuessingNumber = () => {
    const navigate = useNavigate();
    const location = useLocation();
    
    const [randomNumber, setRandomNumber] = useState(location.state?.userDefinedNumber || Math.floor(Math.random() * 100) + 1);
    const [guess, setGuess] = useState('');
    const [message, setMessage] = useState('');
    const [points, setPoints] = useState(10);
    const [attempts, setAttempts] = useState(0);
    const [showAlert, setShowAlert] = useState(false); 
    const [showExitConfirm, setShowExitConfirm] = useState(false);

    useEffect(() => {
        if (location.state?.userDefinedNumber) {
            setRandomNumber(location.state.userDefinedNumber);
        }
    }, [location.state]);

    const handleGuess = () => {
        const numericGuess = parseInt(guess, 10);

        if (isNaN(numericGuess) || numericGuess < 1 || numericGuess > 100) {
            setMessage('Please enter a valid number between 1 and 100.');
            return;
        }

        setAttempts(attempts + 1);

        if (numericGuess > randomNumber) {
            setMessage('Too high!');
            setPoints(points - 1);
        } else if (numericGuess < randomNumber) {
            setMessage('Too low!');
            setPoints(points - 1);
        } else {
            setMessage(`Correct! You guessed it in ${attempts + 1} attempts!`);
        }

        if (points - 1 <= 0 && numericGuess !== randomNumber) {
            setShowAlert(true);
        }
    };

    const handleReset = () => {
        setGuess('');
        setMessage('');
        setPoints(10);
        setAttempts(0);
        setShowAlert(false); 
        setShowExitConfirm(false); 
        setRandomNumber(Math.floor(Math.random() * 100) + 1);
    };

    const handleExitClick = () => {
        setShowExitConfirm(true); 
    };

    const handleExitConfirm = () => {
        handleReset(); 
    };

    const handleExitCancel = () => {
        setShowExitConfirm(false); 
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
                <div className="relative bg-blue-300 p-8 rounded-lg shadow-lg max-w-md w-full">
                    <h1 className="text-2xl font-bold text-center mb-4">Number Guessing Game</h1>
                    <p className="text-center mb-6">Guess a number between 1 and 100</p>

                    <input
                        type="number"
                        className="w-full p-2 border border-gray-300 rounded-md mb-4"
                        value={guess}
                        onChange={(e) => setGuess(e.target.value)}
                        placeholder="Enter your guess"
                    />

                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                        onClick={handleGuess}
                    >
                        Guess
                    </button>

                    {message && (
                        <div className="mt-4 p-2 text-center text-lg font-semibold">
                            {message}
                        </div>
                    )}

                    <div className="mt-4 text-center">
                        <p className="text-lg">Points Left: <span className="font-bold">{points}</span></p>
                        <p className="text-lg">Attempts: <span className="font-bold">{attempts}</span></p>
                    </div>

                    <button
                        className="w-full bg-yellow-500 text-white p-2 mt-4 rounded-md hover:bg-yellow-600"
                        onClick={() => navigate('/set-number')}
                    >
                        Set Number to Guess
                    </button>

                    <button
                        className="w-full bg-red-500 text-white p-2 rounded-md mt-4 hover:bg-red-600"
                        onClick={handleReset}
                    >
                        Reset Game
                    </button>
                    <button
                        className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                        onClick={handleExitClick}
                    >
                        X
                    </button>

                    {showExitConfirm && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-lg">
                            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
                                <h2 className="text-xl font-bold mb-4">Are you sure you want to exit?</h2>
                                <div className="space-x-4">
                                    <button
                                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                        onClick={handleExitConfirm}
                                    >
                                        Yes, Exit
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                                        onClick={handleExitCancel}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {showAlert && (
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg text-center max-w-xs w-full">
                            <h2 className="text-2xl font-bold mb-4">Game Over</h2>
                            <p className="mb-4">You have run out of points. Better luck next time!</p>

                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                                onClick={handleReset}
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                )}
            </div>
            
            {/* Flickit logo */}
            <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>
        </div>
    );
};

export default GuessingNumber;

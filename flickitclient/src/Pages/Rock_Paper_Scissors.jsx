import React, { useState } from "react";
import { FaHandRock, FaHandPaper, FaHandScissors } from "react-icons/fa";
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from "../Components/NavBar";
import { useNavigate } from "react-router-dom"; // For navigation
import Swal from "sweetalert2";

const choices = [
  { name: "Rock", icon: <FaHandRock size={40} /> },
  { name: "Paper", icon: <FaHandPaper size={40} /> },
  { name: "Scissors", icon: <FaHandScissors size={40} /> },
];

function Rock_Paper_Scissors() {
  const [playerChoice, setPlayerChoice] = useState("");
  const [computerChoice, setComputerChoice] = useState("");
  const [result, setResult] = useState("");
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);

  const navigate = useNavigate(); // To navigate back or to other routes

  // Function to handle player choice
  const handlePlayerChoice = (choice) => {
    setPlayerChoice(choice.name);
    const randomChoice =
      choices[Math.floor(Math.random() * choices.length)].name;
    setComputerChoice(randomChoice);
    determineWinner(choice.name, randomChoice);
  };

  // Determine the winner
  const determineWinner = (player, computer) => {
    if (player === computer) {
      setResult("It's a draw!");
    } else if (
      (player === "Rock" && computer === "Scissors") ||
      (player === "Scissors" && computer === "Paper") ||
      (player === "Paper" && computer === "Rock")
    ) {
      setResult("You win!");
      setPlayerScore(playerScore + 1);
    } else {
      setResult("Computer wins!");
      setComputerScore(computerScore + 1);
    }
  };

  // Reset the game
  const resetGame = () => {
    setPlayerChoice("");
    setComputerChoice("");
    setResult("");
    setPlayerScore(0);
    setComputerScore(0);
  };

  // Exit game and redirect to a different page (e.g., home page)
  function exitGame() {
    Swal.fire({
      title: 'Thank You for Playing!',
      text: 'See you next time!',
      icon: 'info',
      confirmButtonText: 'OK',
    }).then(() => {
      // Optionally, you could redirect to another page or close the game here
      // For example, window.location.href = '/'; 
      window.location.href = '/info'; 
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-4">Rock, Paper, Scissors</h1>

        <div className="flex justify-center space-x-4 mb-4">
          {choices.map((choice) => (
            <button
              key={choice.name}
              onClick={() => handlePlayerChoice(choice)}
              className="flex flex-col items-center px-6 py-3 bg-blue-500 text-white text-lg rounded-lg hover:bg-blue-600"
            >
              {choice.icon}
              <span>{choice.name}</span>
            </button>
          ))}
        </div>

        <div className="text-lg mb-4">
          <p>
            Your choice: <strong>{playerChoice}</strong>
          </p>
          <p>
            Computer's choice: <strong>{computerChoice}</strong>
          </p>
          <h2 className="text-2xl mt-2">{result}</h2>
        </div>

        <div className="flex justify-center space-x-10 text-lg">
          <div>
            <p className="font-bold">Player Score</p>
            <p>{playerScore}</p>
          </div>
          <div>
            <p className="font-bold">Computer Score</p>
            <p>{computerScore}</p>
          </div>
        </div>

        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={resetGame}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Reset Game
          </button>
          <button
            onClick={exitGame}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
          >
            Exit Game
          </button>
        </div>
      </div>

      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
}

export default Rock_Paper_Scissors;

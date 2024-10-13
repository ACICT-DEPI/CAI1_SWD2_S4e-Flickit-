import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';

function Square({ value, onClick }) {
  return (
    <button
      className="w-20 h-20 bg-blue-200 text-4xl font-bold flex items-center justify-center m-1 border border-blue-500"
      onClick={onClick}
    >
      {value}
    </button>
  );
}

function TicTacToeGame() {

  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true); // Control turns
  const [gameOver, setGameOver] = useState(false);
  const [playerSymbol, setPlayerSymbol] = useState("X"); // Player's symbol
  const [computerSymbol, setComputerSymbol] = useState("O"); // Computer's symbol

  // Function for when a square is clicked by the player
  function handleClick(i) {
    if (!isPlayerTurn || calculateWinner(squares) || squares[i] || gameOver) {
      return;
    }
    const nextSquares = squares.slice();
    nextSquares[i] = playerSymbol; // Player uses selected symbol
    setSquares(nextSquares);
    setXIsNext(!xIsNext);
    setIsPlayerTurn(false);
  }

  // Function for the computer to play
  function computerMove() {
    if (calculateWinner(squares) || gameOver) return;
    const emptySquares = squares
      .map((val, idx) => (val === null ? idx : null))
      .filter((val) => val !== null);

    if (emptySquares.length === 0) return; // No move left

    // Computer randomly picks an empty square
    const randomIndex = Math.floor(Math.random() * emptySquares.length);
    const computerSquare = emptySquares[randomIndex];

    const nextSquares = squares.slice();
    nextSquares[computerSquare] = computerSymbol; // Computer uses other symbol
    setSquares(nextSquares);
    setXIsNext(true); // Back to player's turn
    setIsPlayerTurn(true);
  }

  // Use `useEffect` to check for a winner or draw
  useEffect(() => {
    const winner = calculateWinner(squares);
    if (winner) {
      setGameOver(true);
      if (winner === playerSymbol) {
        Swal.fire({
          title: 'Congratulations!',
          text: `You win!`,
          icon: 'success',
          showCancelButton: true,
          confirmButtonText: 'Play Again',
          cancelButtonText: 'Exit Game',
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          } else {
            exitGame();
          }
        });
      } else if (winner === computerSymbol) {
        Swal.fire({
          title: 'Game Over!',
          text: 'Computer wins!',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Play Again',
          cancelButtonText: 'Exit Game',
        }).then((result) => {
          if (result.isConfirmed) {
            resetGame();
          } else {
            exitGame();
          }
        });
      }
    } else if (squares.every((square) => square !== null)) {
      setGameOver(true);
      Swal.fire({
        title: 'Game Over!',
        text: "It's a Draw!",
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Play Again',
        cancelButtonText: 'Exit Game',
      }).then((result) => {
        if (result.isConfirmed) {
          resetGame();
        } else {
          exitGame();
        }
      });
    }
  }, [squares, playerSymbol, computerSymbol]);

  // Use `useEffect` to trigger the computer's move after the player's move
  useEffect(() => {
    if (!isPlayerTurn && !calculateWinner(squares) && !gameOver) {
      // Delay the computer move to make it look more natural
      const timeoutId = setTimeout(() => {
        computerMove();
      }, 500); // 500ms delay before computer plays

      return () => clearTimeout(timeoutId); // Cleanup in case of re-render
    }
  }, [isPlayerTurn, squares, gameOver]);

  // Function to reset the game
  function resetGame() {
    Swal.fire({
      title: 'Choose Your Symbol',
      input: 'radio',
      inputOptions: {
        X: 'X',
        O: 'O'
      },
      inputValidator: (value) => {
        if (!value) {
          return 'You need to choose something!';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const playerChoice = result.value;
        const computerChoice = playerChoice === "X" ? "O" : "X";
        setPlayerSymbol(playerChoice);
        setComputerSymbol(computerChoice);
        setSquares(Array(9).fill(null)); // Reset the board
        setXIsNext(true); // Reset the player turn state
        setGameOver(false); // Reset the game over state
        setIsPlayerTurn(playerChoice === "X"); // Player goes first if "X"
      }
    });
  }
  // Function to exit the game
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

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every((square) => square !== null)) {
    status = "Draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="fixed top-0 w-full z-10">
        <Navbar />
      </div>

      <div className="flex flex-col items-center justify-center bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
        <div className="text-xl mb-4">{status}</div>
        <div className="flex">
          <Square value={squares[0]} onClick={() => handleClick(0)} />
          <Square value={squares[1]} onClick={() => handleClick(1)} />
          <Square value={squares[2]} onClick={() => handleClick(2)} />
        </div>
        <div className="flex">
          <Square value={squares[3]} onClick={() => handleClick(3)} />
          <Square value={squares[4]} onClick={() => handleClick(4)} />
          <Square value={squares[5]} onClick={() => handleClick(5)} />
        </div>
        <div className="flex">
          <Square value={squares[6]} onClick={() => handleClick(6)} />
          <Square value={squares[7]} onClick={() => handleClick(7)} />
          <Square value={squares[8]} onClick={() => handleClick(8)} />
        </div>
        <button
            onClick={exitGame}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 mt-3"
          >
            Exit Game
          </button>
        <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
          <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
          <p className="text-3xl font-bold text-white">Flickit!</p>
        </div>
      </div>
    </div>
  );
}

// Function to determine the winner
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToeGame;

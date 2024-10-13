import logo from '../assets/images/question-mark.png'
import Card from "./Card";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from "../Components/NavBar"
import { useNavigate } from "react-router-dom";
import Button from '../Components/Button';

function Info() {
  const navigate = useNavigate();

  const games = [
    { emoji: "🔢", title: "Guess by Number", description: "Guess the number based on clues!" },
    { emoji: "🍕", title: "Guess the Meal", description: "Identify meals from emojis!" },
    { emoji: "🎬", title: "Guess the Film", description: "Guess the film title from emojis!" },
    { emoji: "🌍", title: "Guess the Country", description: "Identify countries by their flags!" },
    // { emoji: "❌⭕", title: "TicTacToeGame", description: "X OR O" },

  ];

  return (
    <div
      className="game min-h-screen flex flex-col bg-gray-100 relative text-white text-center"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Navbar />

      <div className="absolute top-24 right-10" onClick={()=> {navigate("/dashboard");}}> 
        <Button 
                text="DashBoard" 
                style="cursor-pointer bg-yellow-500 w-[200px] h-[60px] flex justify-center items-center rounded-2xl border-2 border-white font-Risque text-3xl mb-8"
            /></div>

      <span>
        <h1 className="text-white text-4xl font-Risque">Flickit Games</h1>
      </span>
  
      <div className="max-w-6xl mx-auto mt-32 grid grid-cols-4 gap-4">
        {games.map((game, index) => (
          <Card key={index} emoji={game.emoji} title={game.title} description={game.description} />
        ))}
      </div>
  
      <div className="flex justify-center mt-4">
        <div className="flex space-x-4">
          <div
            className="bg-white p-[20px] text-center border rounded-lg shadow-lg cursor-pointer"
            onClick={() => { navigate("/TicTacToeGame"); }}
          >
            <div className="text-6xl mb-[15px]">❌⭕</div>
            <h2 className="text-sm m-0 ">TicTacToeGame</h2>
            <p className="text-gray-700 text-sm">X OR O</p>
          </div>
          <div
            className="bg-white p-[20px] text-center border rounded-lg shadow-lg cursor-pointer"
            onClick={() => { navigate("/Rock_Paper_Scissors"); }}
          >
            <div className="text-6xl mb-[15px]">✂️📄</div>
            <h2 className="text-sm m-0 ">Rock_Paper_Scissors</h2>
            <p className="text-gray-700 text-sm">Rock_Paper_Scissors</p>
          </div>
        </div>
      </div>
  
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
        <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
        <p className="text-3xl font-bold text-white">Flickit!</p>
      </div>
    </div>
  );
  
  
}

export default Info;

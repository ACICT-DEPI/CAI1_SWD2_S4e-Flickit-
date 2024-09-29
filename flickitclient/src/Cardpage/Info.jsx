import logo from '../assets/images/question-mark.png'
import Card from "./Card";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from "../Components/NavBar"
function Info() {
  const games = [
    { emoji: "🔢", title: "Guess by Number", description: "Guess the number based on clues!" },
    { emoji: "🍕", title: "Guess the Meal", description: "Identify meals from emojis!" },
    { emoji: "🎬", title: "Guess the Film", description: "Guess the film title from emojis!" },
    { emoji: "🌍", title: "Guess the Country", description: "Identify countries by their flags!" },
  ];

  return (
    <div className="game min-h-screen flex flex-col bg-gray-100 relative text-white text-center"
    style={{
      backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    }}
>
    <Navbar />
     <span><h1 className="text-white text-4xl font-Risque">Flickit Games</h1></span>
      
      <div className=" flex justify-center mt-32">
        {games.map((game, index) => (
          <Card key={index} emoji={game.emoji} title={game.title} description={game.description} />
        ))}
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>
    </div>
  );
}

export default Info;

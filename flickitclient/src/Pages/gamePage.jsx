import Card from "../Cardpage/Card";
import Navbar from "../Components/NavBar";
import backgroundImage from "../assets/images/Background.jpg";
import { useLocation, useNavigate } from "react-router-dom";
import Button from '../Components/Button';

function GamePage() {
    const location = useLocation();
    const navigate = useNavigate();

    const { game, emoji, description } = location.state || {}; 
    console.log(game);
    console.log(emoji);
    console.log(description);

    const handleNewGame = () => {
        switch (game) {
            case "Guess the Country":
                navigate("/FlagForm", { state: { game, emoji } });
                break;
            case "Guess the Film": 
                navigate("/NewGame", { state: { game, emoji } });
                break;
            case "Guess the Meal": 
                navigate("/FoodForm", { state: { game, emoji } });
                break;
            default:
                navigate("/guessing-number", { state: { game, emoji } });
                break;
        }
    };

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
            
            <div className="flex justify-center items-center flex-col mt-10">
                <Card emoji={emoji} title={game} description={description}/>
{game==="Guess by Number" ?                 <Button
    type="submit"
    style="mt-5 p-3 rounded text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
    text="Start Game"
    onClick={() => navigate("/guessing-number", { state: { game, emoji } })}
/>:                <Button
type="submit"
style="mt-5 p-3 rounded text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
text="Start Game"
onClick={() => navigate("/ScoringPage", { state: { game, emoji } })}
/>}
                <Button
                    type="submit"
                    style="mt-5 p-3 rounded text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
                    text="New Game"
                    onClick={handleNewGame} // Call the function here
                />
            </div>
        </div>
    );
}

export default GamePage;

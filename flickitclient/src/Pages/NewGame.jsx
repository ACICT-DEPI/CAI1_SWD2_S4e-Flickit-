import backgroundImage from "../assets/images/Background.jpg";
import HomeNavBar from '../Components/HomeNavBar';
import logo from '../assets/images/question-mark.png';
import GameForm from "../Components/gameForm";
import Navbar from "../Components/NavBar";

function NewGame() {
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
                <GameForm/>
                <div className="flex flex-col justify-center  items-center">
                    <img src={logo} alt="Flickit Logo" className="  mb-2 w-5/6 h52/6" />
                    <h1 className="text-white text-4xl  font-Risque">Flickit!</h1>
                </div>
            </div>
            </div>
        </div>
    )
}

export default NewGame

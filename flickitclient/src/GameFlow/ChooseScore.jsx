// import { Route } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import monkey from "../assets/images/monkey.png";
import monkey2 from "../assets/images/monkey2.png";
import coin from "../assets/images/coin.png";
import stars from "../assets/images/star.png";
import Navbar from '../Components/NavBar';
import { useRef, useState } from "react";
import GamePlay from '../GameFlow/GamePlay.jsx';
import { useLocation } from 'react-router-dom';
import swal from "sweetalert2";
const ChooseScore=( )=>{

    const navigate = useNavigate();
    const location = useLocation();
    const { game } = location.state || 0; //specify the game
    const [scoreValue,setScore] = useState(0); //score chosen
    const [isClicked, setIsClicked] = useState(0);
    const scores=[1,2,3,4,5,6,8,10];
    const [isSubmitted, setIsSubmitted] = useState(false);
    function handleScore(num){
        setIsClicked(num);
        setScore(num);
        console.log(num);
    }
    function handleSubmit(){
        if(scoreValue !== 0) {
            console.log(scoreValue);
            setIsSubmitted(true); 
           
            navigate("/GamingPage", { state: { score: scoreValue, gameChosen: game } });
        }
        else {
            // alert("your score for this level will be ZERO");
            swal.fire("Your score can not be ZERO", "Please choose from boxes in front of you");
        }
    }
    return (
        <div className="flex " >
            <div className="fixed top-0 w-full z-10">
               <Navbar /> 
            </div>
            <div className=" relative flex-grow flex items-center justify-center bg-gray-200  h-screen " style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                 <img className="absolute right-0 w-1/5 md:h-2/3 top-24 sm:h-1/3" src={monkey}></img>
                 <img className="absolute left-0 bottom-0 w-1/4 md:h-2/3 sm:h-1/3" src={monkey2}></img>
                 <img className="absolute md:right-20 bottom-16 md:w-64  sm:h-48 sm:w-48 sm:right-10" src={stars}></img>
                
                <div className="absolute top-24 sm:ml-16 text-3xl font-bold text-white font-Risque text-stone-50"> <label> Choose the score you want for this game play!</label></div>
                <div className="Scoring-window flex-wrap flex items-center justify-center w-3/5 top-0 mt-16 mb-32 sm:top-16 sm:mb-16">
                {scores.map( score => {
                    return  <button className={`border-solid border-4 rounded-3xl md:w-40 md:h-40 sm:w-24 sm:h-24 m-5 text-7xl  ${isClicked === score? "bg-gray-100 border-4" : " text-white bg-gradient-to-b from-green-500  to-green-400"}`} onClick={()=>{handleScore(score)}}> {score} </button>
                })}
                    
                </div>
                <div className="absolute bottom-20 flex">
                <img className=" w-24 h-24" src={coin}></img>
                    <button className="border-solid rounded-3xl border-4 w-64 h-20 mt-2 ml-5 mr-5 mb-5 bg-purple-900 text-3xl font-bold text-white font-Risque text-stone-50"  onClick={() =>{handleSubmit()} }> confirm choice </button>
                    <img className=" w-24 h-24" src={coin}></img>
                    {/* {isSubmitted && <GamePlay score={scoreValue} />} */}
                </div>
            </div>
             <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>

            
        </div>
    )
}

export default ChooseScore;
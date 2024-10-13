import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';
import monkey from "../assets/images/monkey.png";
import monkey2 from "../assets/images/monkey2.png";
import check from "../assets/images/submitAns.png";
import reset from "../assets/images/reset.png";
import deleteIcon from "../assets/images/close.png";

import Button from '../Components/Button';

import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import swal from "sweetalert2";
import axios from "axios";
import { useEffect, useRef, useState } from "react";

const GamePlay = () => {

    const location = useLocation();
    const { score } = location.state || 0;

    const [scoreDisplayed,setscoreDisplayed]= useState(score);
    const { gameChosen } = location.state || 0;
const [correctLevels, setCorrect]=useState(0);

    const [currentEmoji, setCurrentEmoji] = useState({});
    const navigate = useNavigate();
    let randomy = 0;

    useEffect(() => {
        fetchEmojis();
    }, []);
    

    const fetchEmojis = async () => {
        try {
            let response;
            switch (gameChosen) {
                case "Guess the Country":
                    response = await axios.get('http://localhost:8000/flags');
                    break;
                case "Guess the Film":
                    response = await axios.get('http://localhost:8000/games');
                    break;
                case "Guess the Meal":
                    response = await axios.get('http://localhost:8000/foods');
                    break;
            }
            console.log("API Response for Meals:", response.data); // Log the entire response for meals
    
            if (response.data.length > 0) {
                const randomIndex = Math.floor(Math.random() * response.data.length);
                setCurrentEmoji(response.data[randomIndex]);
                console.log("Selected Emoji Data for Meal Game:", response.data[randomIndex]); // Log the selected emoji
            }
        } catch (error) {
            console.error('Error fetching emojis:', error);
        }
    };


    const alpha = ["ذ", "د", "خ", "ح", "ج", "ث", "ت", "ب", "ا", "غ", "ع", "ظ", "ط", "ض", "ص", "ش", "س", "ز", "ر", "ؤ", "ئ","أ", "ء","ي", "ى", "و","ة", "ه", "ن", "م", "ل", "ك", "ق", "ف", " "];

    let ans = useRef("");
    const inputField = document.getElementById('answerInput');
    const [tryCount, setTryCount] = useState(2);

    function handleSubmit() {
        console.log("Current Emoji Data:", currentEmoji); // Check currentEmoji content
        let correctAnswer;

        if (gameChosen === "Guess the Film") {
            correctAnswer = currentEmoji?.actualMovieName;
        } else if (gameChosen === "Guess the Country") {
            correctAnswer = currentEmoji?.actualCountryName;
        } else if (gameChosen === "Guess the Meal") {
            correctAnswer = currentEmoji?.actualFoodName; // Change made here
        }
        
        // Check if correctAnswer was set
        if (!correctAnswer) {
            console.error("Correct answer is undefined for the selected game", currentEmoji, gameChosen);
            swal.fire("Error", "The game data is not set correctly.", "error");
            return;
        }

        // Normalize answers for comparison
        const userAnswer = inputField.value.trim().normalize('NFC').toLowerCase();
        const expectedAnswer = correctAnswer.trim().normalize('NFC').toLowerCase();
    
        // Debugging output
        console.log("User answer (normalized):", userAnswer);
        console.log("Correct answer (normalized):", expectedAnswer);
    
        // Compare the normalized and trimmed answers
        if (userAnswer === expectedAnswer) {
            console.log("Correct answer");

            setCorrect(correctLevels+1);
            swal.fire("Yohooo!!! Congratulations!", "To a new level with doubled score!", "success");
            fetchEmojis();
            inputField.value = "";
            setscoreDisplayed(scoreDisplayed*2);

        } else if (tryCount > 0) {
            setTryCount(tryCount - 1);
            swal.fire("Wrong answer", `You have ${tryCount} try left`);
            inputField.value = "";
        } else {
            navigate("/ResultsPage", { state: { status: "Loser..", win: false, score: 0 ,Level: correctLevels, gameChosen: gameChosen} });
        }
    }
    
    function handleEndingGame(){
        swal.fire({
            title: 'Are you sure you want to exit this game?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "No",
            icon: 'warning'
        }
        ).then((result) => {
            if (result.isConfirmed) {
                if(scoreDisplayed===score){
                    navigate("/ResultsPage", { state: { status: "Loser..", win: false, score: 0 , Level: correctLevels, gameChosen: gameChosen} });
                }else {
                    navigate("/ResultsPage", { state: { status: "Winning!!", win: true, score: scoreDisplayed , Level: correctLevels, gameChosen: gameChosen} });
                }
            } 
        });
    }


    function handleClick(alphab) {
        inputField.value += alphab.alph;
        console.log(inputField);
        console.log("euiejw", alphab.alph);
    }

    function handleReset() {
        inputField.value = "";
    }

    // New function for handling delete
    function handleDelete() {
        inputField.value = inputField.value.slice(0, -1); // Remove the last character
    }

    return (
        <div className="flex ">
            <div className="fixed top-0 w-full z-10">
                <Navbar />
            </div>
            <div className="relative flex-grow flex justify-center bg-gray-200 h-screen" style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}>
                <div className="playing-window flex-wrap  items-center justify-center lg:w-3/5 sm:w-4/5 top-0 mt-16 mb-32">
                    <img className="absolute right-0 w-1/5 h-2/3 top-24 sm:h-1/3" src={monkey}></img>
                    <img className="absolute left-0 bottom-0 w-1/4 h-2/3 sm:h-1/3" src={monkey2}></img>

                    <div  className="absolute right-6 top-6 cursor-pointer" onClick={handleEndingGame}> 
                        <Button 
                            text="End game" 
                            style=" bg-red-500 w-[150px] h-[50px] text-violet-50 flex justify-center items-center rounded-2xl border-2 border-black font-Risque text-2xl mb-8 absolute right-12 top-24 hover:bg-green-400"
                        />
                   </div>
                    
                    <div className="absolute lg:left-24 top-24 sm:right-12 items-center justify-center w-64">
                        <p className="lg:text-3xl sm:text-2xl font-bold font-Risque text-yellow-400"> YOUR SCORE </p>
                        <p className="lg:text-4xl sm:text-2xl font-bold font-Risque text-yellow-400 ml-24"> X{scoreDisplayed} </p>

                    </div>

                    {/* sentence */}
                    <div className="w-full h-1/5 relative top-0 flex-grow flex justify-center items-center">
                        <p className="text-3xl font-bold  font-Risque text-stone-50 "> {gameChosen} from emoji </p>
                    </div>

                    {/* game emoji */}
                    <div className="w-full h-1/5 relative top-0 flex-grow flex justify-center items-center mt-4">

                        <div className="lg:text-7xl sm:text-5xl bg-gray-100 lg:w-1/2 sm:w-full h-36 border-8 rounded-3xl border-yellow-600 flex justify-center items-center">
                            {gameChosen === "Guess the Film" && currentEmoji.movieEmojis}
                            {gameChosen === "Guess the Country" && currentEmoji.flagEmojis}
                            {gameChosen === "Guess the Meal" && currentEmoji.foodEmojis}
                        </div>
                    </div>


                    {/* answer, reset, submit, delete */}
                    <div className="w-full h-fit relative top-0 flex-grow flex justify-center items-center mt-8 ml-5">
                        <img className="w-16 h-16" onClick={handleReset} src={reset}></img>
                        <input id="answerInput" className="w-96 border-2 rounded-xl border-black p-2 bg-gray-100 m-2 text-right text-2xl" ref={ans} />
                        <img className="w-16 h-16" onClick={handleSubmit} src={check}></img>
                        <img className="w-16 h-16" onClick={handleDelete} src={deleteIcon}></img> {/* Delete button */}
                    </div>

                    {/* alphabet buttons */}
                    <div className="w-full m-6 relative top-0 flex-wrap flex items-center justify-center">
                        {alpha.map(alph => {
                            return <button id={alph} key={alph} className="border-solid rounded-2xl border-2 w-16 h-16 m-2 mb-4 pb-1 text-white text-3xl bg-gradient-to-b from-green-500 to-green-400 hover:bg-gray-400" onClick={() => { handleClick({ alph }) }}> {alph} </button>
                        })}
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

export default GamePlay;

import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';
import monkey from "../assets/images/monkey.png";
import monkey2 from "../assets/images/monkey2.png";
import stars from "../assets/images/star.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios"
const Dashboard=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    let MovieGameDashboar;
    let sortedMGData;
    let MovieHighScores=[];
    let count=0;
 async function fetchAllData(){
    try {
        MovieGameDashboar = await axios.get('http://localhost:8000/movierooms');
        console.log("MovieRoom created:", MovieGameDashboar.data);
        sortedMGData = [...MovieGameDashboar.data].sort((a, b) => b.Score - a.Score);
        let length= sortedMGData.length;
        while(length>0 && count<4){
            MovieHighScores.push(sortedMGData[count]);
            console.log(MovieHighScores);
            count++;
            if(length > count ){continue;}
            else break;
        }
        console.log(sortedMGData);
        MovieHighScores.map(OneRoom => console.log(OneRoom.username))
    } catch (error) {
        console.log("error fetching rooms data")
    } 
 }
 fetchAllData();
 console.log(MovieHighScores);
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
                <img className="absolute right-0 w-1/5 md:h-2/3 top-24 sm:h-1/3 z-10" src={monkey}></img>
                <img className="absolute left-0 bottom-0 w-1/4 md:h-2/3 sm:h-1/3" src={monkey2}></img>
                <img className="absolute md:right-20 bottom-16 md:w-64  sm:h-48 sm:w-48 sm:right-10" src={stars}></img>
               
                {/* <div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-fit top-0 mt-16 mr-16 ml-16 mb-32  rounded-3xl  bg-gray-600"> 
                <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> {MovieHighScores[0].username}</div>
                <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> {MovieHighScores[0].username}</div>
                <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> {MovieHighScores[0].username}</div>
                </div> */}
                
{/* <div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-96 top-0 mt-16 mr-16 mb-32 border-2 rounded-3xl  bg-gray-200"> 
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
</div>
<div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-96 top-0 mt-16 mr-16 mb-32 border-2 rounded-3xl  bg-gray-200"> 
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-3xl items-center justify-center"> Movie Game HighScores!!</div>
</div>
<div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-96 top-0 mt-16 mr-16  mb-32 border-2 rounded-3xl  bg-gray-200 z-10"> 
    <div className="w-full h-16 bg-blue-200 border-2 rounded-xl items-center justify-center z-10"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-xl items-center justify-center z-10"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-xl items-center justify-center z-10"> Movie Game HighScores!!</div>
    <div className="w-full h-16 bg-blue-200 border-2 rounded-xl items-center justify-center z-10"> Movie Game HighScores!!</div> */}
{/* </div> */}

            </div>

             <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>
        </div>
    )
}

export default Dashboard;
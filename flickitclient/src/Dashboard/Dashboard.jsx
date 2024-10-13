import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';
import monkey from "../assets/images/monkey.png";
import monkey2 from "../assets/images/monkey2.png";
import stars from "../assets/images/star.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import axios from "axios"
import { useEffect, useState } from "react";
const Dashboard=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    let MovieGameDashboar,FoodGameDashboar,FlagGameDashboar ;
    let sortedMGData=[],sortedFoGData=[],sortedFLGData=[] ;
    let HighScores=[];
    const [MovieHighScores,setScores]=useState([]);
    const [FoodHighScores,setFoScores]=useState([]);
    const [FlagHighScores,setFlScores]=useState([]);
    let count=0;
    useEffect(() => {
        fetchAllData();
    }, []);
    
 async function fetchAllData(){
    try {
        MovieGameDashboar = await axios.get('http://localhost:8000/movierooms');
        console.log("MovieRoom created:", MovieGameDashboar.data);
        if(MovieGameDashboar.data.length>1){sortedMGData = [...MovieGameDashboar.data].sort((a, b) => b.Score - a.Score);}
        else if(MovieGameDashboar.data.length==1) {sortedMGData.push(MovieGameDashboar.data[0]);}
        ////////////
        FlagGameDashboar = await axios.get('http://localhost:8000/flagrooms');
        console.log("FlagRoom created:", FlagGameDashboar.data);
        if(FlagGameDashboar.data.length>1){ sortedFLGData = [...FlagGameDashboar.data].sort((a, b) => b.Score - a.Score);}
        else if(FlagGameDashboar.data.length==1) {sortedFLGData.push(FlagGameDashboar.data[0]);}
        ////////////
        FoodGameDashboar = await axios.get('http://localhost:8000/foodrooms');
        console.log("FoodRoom created:", FoodGameDashboar.data);
        if(FoodGameDashboar.data.length>1){sortedFoGData = [...FoodGameDashboar.data].sort((a, b) => b.Score - a.Score);}
        else if(FoodGameDashboar.data.length==1) {sortedFoGData.push(FoodGameDashboar.data[0]);}

        let length= sortedMGData.length;
        while(length>0 && count<3){
            HighScores.push(sortedMGData[count]);
            setScores(HighScores);
            count++;
            if((length > count)&& count!==4 ){}
            else {
                count=0; HighScores=[];break;};
        }


        count=0;
        console.log(count);
        HighScores=[];
        let length2= sortedFoGData.length;
        while(length2>0 && count<3){
            HighScores.push(sortedFoGData[count]);
            setFoScores(HighScores);
            count++;
            if(length2 > count ){continue;}
            else break;
        }


        count=0;
        console.log(count);
        HighScores=[];
        let length3= sortedFLGData.length;
        while(length3>0 && count<3){
            HighScores.push(sortedFLGData[count]);
            setFlScores(HighScores);
            count++;
            if(length3 > count ){continue;}
            else {
                count =0; HighScores=[]; break;};
        }
    } catch (error) {
        console.log("error fetching rooms data")
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
                <img className="absolute right-0 w-1/5 md:h-2/3 top-24 sm:h-1/3 z-10" src={monkey}></img>
                <img className="absolute left-0 bottom-0 w-1/4 md:h-2/3 sm:h-1/3" src={monkey2}></img>
                <img className="absolute md:right-20 bottom-16 md:w-64  sm:h-48 sm:w-48 sm:right-10" src={stars}></img>
                <div className="w-full h-1/5 absolute top-12 flex-grow flex justify-center items-center">
                        <p className="text-5xl font-bold  font-Risque text-stone-50 ">DashBoard - HighScores!!</p>
                    </div>
                <div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-fit top-0 mt-16 mr-16 ml-16 mb-32  rounded-2xl border-1 p-2 bg-black"> 
                <div className="w-full h-16 bg-gray-600 border-2 rounded-2xl flex items-center justify-center text-2xl font-bold  text-yellow-300 p-4"> Movie HighScores!</div>
                {MovieHighScores.map(Place => {
                    return <div className="w-full h-16 bg-blue-200 mt-2 border-2 rounded-2xl flex items-center justify-center text-3xl font-bold  text-black p-4"> {Place.username} {Place.Score}</div>
                })}
                </div>
                <div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-fit top-0 mt-16 mr-16 ml-16 mb-32  rounded-2xl border-1 p-2 bg-black"> 
                <div className="w-full h-16 bg-gray-600 border-2 rounded-2xl flex items-center justify-center text-2xl font-bold  text-yellow-300 p-4"> Food HighScores!</div>
                {FoodHighScores.map(Place => {
                    return <div className="w-full h-16 bg-blue-200 mt-2 border-2 rounded-2xl flex items-center justify-center text-3xl font-bold  text-black p-4"> {Place.username} {Place.Score}</div>
                })}
                </div>
                <div className="flex-wrap items-center justify-center lg:w-1/5 sm:w-3/5 h-fit top-0 mt-16 mr-16 ml-16 mb-32  rounded-2xl border-1 p-2 bg-black"> 
                <div className="w-full h-16 bg-gray-600 border-2 rounded-2xl flex items-center justify-center text-2xl font-bold  text-yellow-300 p-4"> Flag HighScores!</div>
                {FlagHighScores.map(Place => {
                    return <div className="w-full h-16 bg-blue-200 mt-2 border-2 rounded-2xl flex items-center justify-center text-3xl font-bold  text-black p-4"> {Place.username} {Place.Score}</div>
                })}
                </div>
 
            </div>

             <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>
        </div>
    )
}

export default Dashboard;
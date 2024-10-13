import logo from "../assets/images/question-mark.png";
import backgroundImage from "../assets/images/Background.jpg";
import Navbar from '../Components/NavBar';
import monkey from "../assets/images/monkey.png";
import monkey2 from "../assets/images/monkey2.png";
import stars from "../assets/images/star.png";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
// import axios from "axios"
const ResultsPage=()=>{
    const location = useLocation();
    const navigate = useNavigate();
    const { status } = location.state || 0;
    const { win } = location.state || false;
    const { score } = location.state || 0;
  
    const handleSaveRoom = async () => {
     navigate("/GamesPage");
      };
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
                

                <div className="Results-window flex-wrap items-center justify-center lg:w-1/3 sm:w-4/5 h-96 top-0 mt-16 mb-32 border-2 rounded-3xl pt-12">
                    <div className="w-full h-1/5  relative top-0 flex-grow  flex justify-center items-center"> 
                        <p className={`text-3xl font-bold  font-Risque text-stone-50`}> Welcome Back, Hey YOU!! </p>
                    </div>
                    <div className="w-full h-1/5  relative top-0 flex-grow  flex justify-center items-center"> 
                        <p className={`text-3xl font-bold  font-Risque text-stone-50 ${win? "text-green-400":"text-red-600"}`}> {status}</p>
                    </div>
                    <div className="w-full h-1/5  relative top-0 flex-grow  flex justify-center items-center	"> 
                        <p className="text-3xl font-bold  font-Risque text-stone-50">your score in this level : </p>
                    </div>
                    <div className="w-full h-1/5  relative top-0 flex-grow  flex justify-center items-center	"> 
                        <p className="text-3xl font-bold  font-Risque text-stone-50"> {score} </p>
                    </div>
                </div>

                <div className="absolute bottom-20">
                    {/* <button className={`border-solid rounded-2xl border-2 w-40 h-16 m-5 text-3xl font-bold 
                                      text-white font-Risque text-stone-50 hover:bg-gray-100 hover:text-black
                                    ${win? "bg-green-400":"bg-red-500"}`} onClick={()=> navigate('/ScoringPage')}> OK  </button> */}
                                    <button
  className={`border-solid rounded-2xl border-2 w-40 h-16 m-5 text-3xl font-bold 
              text-white font-Risque 
              ${win ? "bg-green-400" : "bg-red-500"}`} onClick={() => handleSaveRoom()}> OK</button>

                </div>
            </div>

             <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>
        </div>
    )
}

export default ResultsPage;
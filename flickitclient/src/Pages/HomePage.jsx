import React from 'react';
import backgroundImage from "../assets/images/Background.jpg";
import HomeNavBar from '../Components/HomeNavBar';
import Button from '../Components/Button';
import logo from '../assets/images/question-mark.png';
import { Link } from 'react-router-dom';
// import NotSignedIn from '../Components/notSignedIn';

export default function HomePage() {

    return (
        <div 
            className="min-h-screen flex flex-col bg-gray-100 relative" 
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <HomeNavBar />
            <div className="flex  justify-around  items-center flex-grow w-full h-full">
            <Link to="/login">  {/* Adjust the path to your login route */}
                <Button 
                    text="Ready to Flick" 
                    style="cursor-pointer bg-[#7209B7] w-[400px] h-[120px] text-violet-50 flex justify-center items-center rounded-2xl border border-black font-Risque text-3xl mb-8"
                />
            </Link>
                <div className="flex flex-col justify-center  items-center">
                    <img src={logo} alt="Flickit Logo" className="  mb-2 w-5/6 h52/6" />
                    <h1 className="text-white text-4xl  font-Risque">Flickit!</h1>
                </div>
            </div>
        </div>
    );
}

/* <HomeNavBar />
<div className="flex  justify-around  items-center flex-grow w-full h-full">
    <Button text="Ready to Flick" style={"bg-[#7209B7] w-[400px] h-[120px] text-violet-50 flex justify-center items-center rounded-2xl border border-black font-Risque text-3xl  mb-8" }/>
    <div className="flex flex-col justify-center  items-center">
        <img src={logo} alt="Flickit Logo" className="  mb-2 w-5/6 h52/6" />
        <h1 className="text-white text-4xl  font-Risque">Flickit!</h1>
    </div>
</div> */
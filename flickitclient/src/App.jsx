import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './Styles/App.css'
export default function App() {
    const [isOn, setIsOn] = useState(true);
  
    const toggleLamp = () => {
      setIsOn(!isOn);
    };
  return (
    <div className='w-screen h-screen flex justify-center items-center flex-col'>
      {isOn?
      <div className='flex w-full h-full justify-center items-center flex-col bg-black'>
          <img src='../public/light-bulb (1).png' className='flex h-60 w-60 hover:cursor-pointer'onClick={toggleLamp}/>  
          <div className='flex flex-col justify-center items-center'>
          <div className=' text-xl font-medium font-fellFrench text-white'>click on the lamp!</div>
            <div className=' text-8xl font-medium font-fellFrench text-white'>trust the darkness</div>
          </div>
          <div className=' text-xl font-medium font-fellFrench text-white text-center'>This is Vite React + Tailwind CSS template provides a streamlined setup for developing React applications <br/> with the Vite build tool and integrating Tailwind CSS for styling</div>
          <div className='h-1/4 flex justify-center items-end text-lg font-medium font-fellFrench text-white'>
          &copy; Copyright 2024 . Made by &nbsp;<span onClick={()=>{
            window.open('https://norhan.netlify.app/', '_blank')
          }} className='cursor-pointer underline font-light4'> Norhan Ahmed</span>.
        </div>
          </div>:
      <div className='flex w-full h-full justify-center items-center flex-col bg-white'>
          <img src='../public/light-bulb.png' className='flex h-60 w-60 hover:cursor-pointer'onClick={toggleLamp}/>
          <div className='flex flex-col justify-center items-center'>
            <div className=' text-xl font-medium font-fellFrench text-black'>click on the lamp!</div>
            <div className=' text-8xl font-medium font-fellFrench text-black'>lumière templates</div>
          </div>
          <div className=' text-xl font-medium font-fellFrench text-black text-center'>This is Vite React + Tailwind CSS template provides a streamlined setup for developing React applications <br/> with the Vite build tool and integrating Tailwind CSS for styling</div>
          <div className='h-1/4 flex justify-center items-end text-lg font-medium font-fellFrench text-black'>
          &copy; Copyright 2024 . Made by &nbsp;<span onClick={()=>{
            window.open('https://norhan.netlify.app/', '_blank')
          }} className='cursor-pointer underline font-light4'> Norhan Ahmed</span>.
        </div>
      </div>
    } 
    </div>
  )
}


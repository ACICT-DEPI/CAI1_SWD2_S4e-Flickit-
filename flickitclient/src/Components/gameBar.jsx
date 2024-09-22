import React from 'react'
import logo from '../assets/images/question-mark.png'

export default function GameBar() {
    return (
        <div className='bg-[#3A0CA3] w-full h-16 flex justify-center items-center p-2 rounded-t-lg'>
        <div className="flex items-center space-x-2">
        <img
          src={logo} 
          alt="logo"
          className="w-8 h-8"
        />
        <div className="text-2xl font-Risque text-stone-50">lets's create a guess!</div>
      </div>
</div> 
    )
}



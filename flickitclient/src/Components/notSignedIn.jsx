import React from 'react'
import notauth from '../assets/images/touch-face.png'
function NotSignedIn() {
    return (
        <div className='flex justify-center items-center p-8 flex-col'>
        <img src={notauth} className='w-1/4 h-1/4'/>
        <div className='flex font-Risque pt-4 text-white text-3xl'> You need to be logged in to continue</div>
        <div className='font-Risque text-white text-3xl'>Sign in?</div>
        </div>
    )
}

export default NotSignedIn

import React from 'react'
import GameBar from './gameBar'
import Button from '../Components/Button';

function GameForm() {
    return (
        <div className='flex flex-col pb-8 border border-gray-500 items-center justify-start bg-opacity-60 w-1/3 rounded-lg bg-[#290346]'>
            <GameBar />
            
            {/* Form container */}
            <div className="w-full px-6"> {/* px-6 adds horizontal padding */}
              
                {/* Flag input */}
                <div className="mb-4 w-full">
                    <label className="block text-xl text-white font-DancingScript mb-2">Flag</label>
                    <input
                        type="text"
                        placeholder="Enter Flag ...."
                        className="bg-transparent border border-gray-500 w-full p-2 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7209B7]"
                    />
                </div>
              
                {/* Country input */}
                <div className="mb-6 w-full">
                    <label className="block text-xl text-white font-DancingScript mb-2">Country</label>
                    <input
                        type="text"
                        placeholder="Enter country name ......"
                        className="bg-transparent border border-gray-500 w-full p-2 rounded-md text-white text-lg focus:outline-none focus:ring-2 focus:ring-[#7209B7]"
                    />
                </div>
              
                {/* Submit Button */}
                <Button
                    style="w-full text-white py-2 bg-[#7209B7] hover:bg-[#560BAD] rounded-lg text-2xl font-Risque tracking-wide transition duration-300 text-center"
                    text="create"
                />
            </div>
        </div>
    );
}

export default GameForm;

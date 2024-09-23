import React from 'react'
import logo from '../assets/images/question-mark.png'
import InstructionModal from '../Modals/instructionModal';
import { Link } from 'react-router-dom';
function HomeNavBar() {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }
    return (
       <div className='bg-[#3A0CA3] w-full h-16 flex justify-between items-center p-2'>
      <div className="flex items-center space-x-2">
      <img
        src={logo} 
        alt="logo"
        className="w-8 h-8"
      />
      <div className="text-2xl font-Risque text-stone-50">Flickit!</div>
    </div>

    <div className="flex space-x-6 text-lg ">
      <div className="hover:underline font-DancingScript text-2xl text-stone-50 pr-40" onClick={openModal}>
        How to play?
      </div>
      <InstructionModal modalIsOpen={modalIsOpen} afterOpenModal={ afterOpenModal} closeModal={closeModal} />
      <Link to="/login"> {/* Link to the login page */}
                <div className="hover:underline font-Risque text-stone-50 pr-5 cursor-pointer">
                    Sign In
                </div>
            </Link>
    </div>
    </div> 
    )
}

export default HomeNavBar

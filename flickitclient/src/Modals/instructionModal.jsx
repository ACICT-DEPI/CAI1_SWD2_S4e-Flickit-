import React from 'react';
import Modal from 'react-modal';
import close from '../assets/images/close.png';
import question from '../assets/images/questions.png';
import logo from '../assets/images/question-mark.png';
import Button from '../Components/Button';

function InstructionModal({ modalIsOpen, afterOpenModal, closeModal }) {
    return (
        <div className='flex justify-start items-center'>
            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                className={"border-2 border-[#F72585] transition: opacity 2000ms ease-in-out shadow-xl bg-[white] h-[27rem] w-[45rem] left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 absolute flex flex-col justify-between items-center rounded-[0.3125rem] p-8"}
            >
                {/* Close button in the top-right corner */}
                <img src={close} onClick={closeModal} className='absolute top-3 right-3 w-8 h-8' />

                {/* Modal content */}
                <div className='flex justify-center items-center'>
                    <img src={question} className='w-12 h-12 mr-4' />
                    <div className='font-Risque text-2xl text-[#7209B7]'>How to flick?</div>
                </div>

                <div className="text-center text-lg font-semibold text-gray-700">
                    <p>Choose a Category: Pick from Flags, Foods, or Movies!</p>
                    <p>Guess!: Type your guess and hit submit.</p>
                    <p>Earn Points: The faster you guess, the more points you get!</p>
                </div>

                {/* "Got it" button */}
                <div 
                    className='bg-[#7209B7] w-[200px] h-[50px] text-violet-50 flex justify-center items-center rounded-2xl border border-black font-Risque text-3xl mb-8 cursor-pointer'
                    onClick={closeModal} // Close modal when clicked
                >
                    <img src={logo} className='w-10 h-10' />
                    <div className='pr-4'>Got it</div>
                </div>
            </Modal>
        </div>
    );
}

export default InstructionModal;

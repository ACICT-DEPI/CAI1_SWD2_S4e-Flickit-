import { CgGames } from "react-icons/cg";
import { MdPerson } from "react-icons/md";
import {Slide} from '../Styles/slide'

import logo from '../assets/images/question-mark.png';
import '../Styles/Admin.css';

export function Admin() {
  return (
    <div className="flex" > 
      <Slide/>
      <div className="p-16 bg-white h-full flex justify-center items-center ">
        <div className="flex justify-between items-center mb-8 w-full">
          <div className="text-purple">
            <i className="fas fa-bell"></i> {/* Optional notification icon */}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-40 justify-center items-center">
          {/* Games Card */}
          <div className="bg-gradient-to-r from-pink-500 p-8 rounded-2xl shadow-xl flex justify-between items-center w-60">
            <div>
              {/* Icon with larger size */}
              <CgGames className="text-pink-300 text-6xl mb-4" />
              <p className="text-white text-4xl font-semibold">Games</p>
            </div>
            <div className="text-6xl text-white font-bold">4</div>
          </div>

          {/* Users Card */}
          <div className="bg-gradient-to-r from-indigo-500 p-8 rounded-2xl shadow-xl flex justify-between items-center w-60 ml-8">
            <div>
              {/* Icon with larger size */}
              <MdPerson className="text-purple-300 text-6xl mb-4" />
              <p className="text-white text-4xl font-semibold">Users</p>
            </div>
            <div className="text-6xl text-white font-bold">3</div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col items-center mb-4 mr-4">
                <img src={logo} alt="Flickit Logo" className="h-16 mb-2" />
                <p className="text-3xl font-bold text-white">Flickit!</p>
            </div>
    </div>
  );
}

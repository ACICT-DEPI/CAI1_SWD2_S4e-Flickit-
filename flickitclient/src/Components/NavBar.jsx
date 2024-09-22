import logo from '../assets/images/question-mark.png';
import user from '../assets/images/user.png'
import settings from '../assets/images/cogwheel.png'
 
export default function Navbar() {
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
      <img
      src={user} 
      alt="logo"
      className="w-8 h-8"
    />
        <img
          src={settings} 
          alt="logo"
          className="w-8 h-8"
        />
      </div>
      </div> 
    );
}


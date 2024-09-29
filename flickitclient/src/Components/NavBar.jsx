import { useNavigate, Link } from 'react-router-dom';
import logo from '../assets/images/question-mark.png';
import user from '../assets/images/user.png';
import settings from '../assets/images/cogwheel.png';

export default function Navbar() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogoClick = () => {
    navigate('/GamesPage'); // Navigate to /GamesPage when logo is clicked
  };

  return (
    <div className='bg-[#3A0CA3] w-full h-16 flex justify-between items-center p-2'>
      <div className="flex items-center space-x-2">
        <img
          src={logo} 
          alt="logo"
          className="w-8 h-8 cursor-pointer" // Make the logo clickable
          onClick={handleLogoClick} // Call handleLogoClick on click
        />
        <div className="text-2xl font-Risque text-stone-50 cursor-pointer" onClick={handleLogoClick} >Flickit!</div>
      </div>

      <div className="flex space-x-6 text-lg ">
        <Link to="/profile">
          <img
            src={user}
            alt="Profile"
            className="w-8 h-8 cursor-pointer" 
          />
        </Link>
        <img
          src={settings} 
          alt="Settings"
          className="w-8 h-8 cursor-pointer"
        />
      </div>
    </div>
  );
}

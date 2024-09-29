/* import { createBrowserRouterRoutes, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import RegisterPage from './Components/RegisterPage';
import ProfilePage from './Components/ProfilePage';
import GuessingNumber from './Components/GuessingNumber';
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/guessing-number" element={<GuessingNumber />} />
      </Routes>
    </div>
  );
};

export default App;
 */
import config from '../config'
import Cookies from 'js-cookie'

function App() {
  function test(){
    fetch(config.BASE_URL+"/user-profile?username=sohila Ahmed" , {
      method:"GET" , 
      headers:{
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Cookies.get('token')}`
      }     
    })
  }
  return (
    <div className='flex items-center justify-center h-screen'>
    <div className='bg-red-600 flex  items-center justify-center text-white p-3 rounded-md shadow 'onClick={test}>
      test 
    </div>
  </div>
  )
}

export default App

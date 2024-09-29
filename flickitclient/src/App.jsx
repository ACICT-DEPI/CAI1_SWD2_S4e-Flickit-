import { createBrowserRouterRoutes, Route } from 'react-router-dom';
import LoginPage from './Components/Login';
import ForgotPasswordPage from './Components/ForgotPasswordPage';
import RegisterPage from './Components/RegisterPage';
import ProfilePage from './Components/ProfilePage';
import HomePage from './Pages/HomePage';
import GuessingNumber from './Components/GuessingNumber';
import GamePlay from '../src/GameFlow/GamePlay';
const App = () => {
  return (
    <div>
      <Routes>
      <Route path="/GamingPage" element={<GamePlay />} />
      <Route path="/Home" element={<HomePage />} />
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
 
// import React from 'react'
// //  path: "/Home",
// // element: <HomePage />,
// // 
// function App() {
//   return (
//     <div className='flex items-center justify-center h-screen'>
//     <div className='bg-red-600 flex  items-center justify-center text-white p-3 rounded-md shadow '>
//       test 
      
//     </div>
//   </div>
//   )
// }

// export default App

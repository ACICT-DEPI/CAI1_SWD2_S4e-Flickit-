import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginPage from '../src/Pages/Login';
import ForgotPasswordPage from '../src/Pages/ForgotPasswordPage';
import RegisterPage from '../src/Pages/RegisterPage';
import ProfilePage from '../src/Pages/ProfilePage';
import GuessingNumber from '../src/Pages/GuessingNumber';
import  HomePage from '../src/Pages/HomePage'
import NewGame from '../src/Pages/NewGame';
import SetNumber from '../src/Pages/SetNumber';
import { Admin } from '../src/Pages/Admin.jsx';
import { Film } from '../src/Pages/Film.jsx';
import { Meals } from '../src/Pages/Meals.jsx';
import { Flags } from '../src/Pages/Flags.jsx';
import { Logout } from '../src/Pages/Logout.jsx';
import ChooseScore from '../src/GameFlow/ChooseScore';
import GamePlay from '../src/GameFlow/GamePlay';
import ResultsPage from '../src/GameFlow/ResultsWindow';
import GamesPage from '../src/Cardpage/Gameinfo.jsx';
import { Users } from '../src/Pages/Users.jsx';
import FoodForm from '../src/Components/FoodForm.jsx';
import FlagForm from '../src/Components/FlagForm.jsx';
import EditFilm from '../src/Components/EditFilm.jsx';
import  EditFood  from '../src/Pages/EditFood.jsx';
import Change_Flag from '../src/Components/Change_Flag.jsx';
// import EditFood from '../src/Pages/EditFood.jsx'
// import {EditFilm} from '../src/Components/EditFilm.jsx';
// import EditFilm from '../src/Pages/EditFilm.jsx';
export default function Router() {
    const router = createBrowserRouter([      
          {
        path: "/login",
        element: <LoginPage />,
      },          {
        path: "/forgot-password",
        element: <ForgotPasswordPage   />,
      },          {
        path: "/register",
        element: <RegisterPage   />,
      },          {
        path: "/profile",
        element: <ProfilePage   />,
      },         {
        path: "/guessing-number",
        element: <GuessingNumber   />,
      },{
        path: "/set-number",
        element: <SetNumber   />,
      },         {
        path: "/",
        element: <HomePage />,
      },         {
        path: "/NewGame",
        element: <NewGame />,
      },  
      {
        path: "/Admin",
        element: <Admin />,
      },    
      {
        path: "/Film",
        element: <Film />,
      },     
      {
        path: "/Meals",
        element: <Meals />,
      }, 
        
      {
        path: "/Flags",
        element: <Flags />,
      },
      {
        path: "/Logout",
        element: <Logout />,
      },
       {
        path: "/ScoringPage",
        element: <ChooseScore />,
      }, 
      {
        path: "/GamingPage",
        element: <GamePlay />,
      }, 
      {
        path: "/ResultsPage",
        element: <ResultsPage />,
      },   
      {
        path: "/GamesPage",
        element: <GamesPage />,
      },                                              
      },    
      {
        path: "/Users",
        element: <Users />,
      },   {
        path: "/FoodForm",
        element: <FoodForm />,
      },
      {
        path: "/FlagForm",
        element: <FlagForm />,
      },
      {
        path: "/Change_Flag/:id",
        element : <Change_Flag/>
      },
      {
        path: "/EditFood/:id",
        element: <EditFood />,
      },
        
      {
        path: "/EditFilm/:id",
        element: <EditFilm />,
      },                                        
        ]);
    return <RouterProvider router={router} />;
}



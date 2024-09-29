import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginPage from '../src/Pages/Login';
import ForgotPasswordPage from '../src/Pages/ForgotPasswordPage';
import RegisterPage from '../src/Pages/RegisterPage';
import ProfilePage from '../src/Pages/ProfilePage';
import GuessingNumber from '../src/Pages/GuessingNumber';
import  HomePage from '../src/Pages/HomePage'
import NewGame from '../src/Pages/NewGame';
import SetNumber from '../src/Pages/SetNumber';
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
        ]);
    return <RouterProvider router={router} />;
}



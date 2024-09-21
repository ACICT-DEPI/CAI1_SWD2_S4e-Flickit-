import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import LoginPage from '../src/Pages/Login/Login';
import ForgotPasswordPage from '../src/Pages/ForgotPasswordPage';
import RegisterPage from '../src/Pages/Login/RegisterPage';
import ProfilePage from '../src/Pages/ProfilePage';
import GuessingNumber from '../src/Pages/GuessingNumber';
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
      },
        ]);
    return <RouterProvider router={router} />;
}



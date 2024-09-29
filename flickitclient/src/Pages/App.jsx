import './Styles/App.css'
import  { BrowserRouter ,Routes,Route} from 'react-router-dom';
import { Users } from './Users';
import { Create } from './Create';
import { Update } from './Update';
import { Admin } from './Admin.jsx';
import { Film } from './Film';

import { Meals } from './Meals';
import { Profile } from './Profile.jsx';
import { Guess } from './Guess.jsx';
import { Flags } from './Flags.jsx';
import { Logout } from './Logout.jsx';
import Info from './Cardpage/Gameinfo.jsx';





export default function App() {


  return (
  <div>
  <BrowserRouter>
  <div className='flex'> 


    
 
     <Routes>
  <Route path='/' element={<Info/>} ></Route>
      
    <Route path='/Admin' element={<Admin/>}> </Route>
    <Route path='/Film' element={<Film/>}> </Route>
    <Route path='/Users' element={<Users/>}> </Route>
    <Route path='/create' element={<Create/>}> </Route>
    <Route path='/update' element={<Update/>}> </Route>
    <Route path='/Meals' element={<Meals/>}> </Route>
    <Route path='/profile' element={<Profile/>}> </Route>
    <Route path='/guess' element={<Guess/>}> </Route>
    <Route path='/flags' element={<Flags/>}> </Route>
    <Route path='/logout' element={<Logout/>}> </Route>

  </Routes>
  </div>
  


 
  </BrowserRouter>
  </div>

  );
  

} 
  

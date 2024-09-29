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

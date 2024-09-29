
import { useNavigate } from "react-router-dom";

function Card({ emoji, title, description }) {
  const navigate = useNavigate();
  return (  
 
     <div className=" bg-white p-[20px] m-[10px] text-center border rounded-lg shadow-lg " onClick={()=> { navigate("/GamePage", { state: { game: title, emoji: emoji ,description:description} });}}>
      <div className=" text-6xl mb-[15px]">{emoji}</div>
      <h2 className="text-sm m-0 ">{title}</h2>
      <p className=" text-gray-700 text-sm">{description}</p>
    </div>
   
  );
}

export default Card;
/* /ScoringPage */
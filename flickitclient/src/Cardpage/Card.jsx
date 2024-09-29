// src/Card.js

import "./Card.css"; // Import the CSS file for styling
import { useNavigate } from "react-router-dom";

function Card({ emoji, title, description }) {
  const navigate = useNavigate();
  return (
    <>
 
     <div className="card" onClick={()=> { navigate("/ScoringPage", { state: { game: title} });}}>
      <div className="emoji">{emoji}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
</>
   
  );
}

export default Card;

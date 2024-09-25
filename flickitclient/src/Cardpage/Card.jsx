// src/Card.js

import "./Card.css"; // Import the CSS file for styling


function Card({ emoji, title, description }) {
  return (
    <>
 
     <div className="card">
      <div className="emoji">{emoji}</div>
      <h2>{title}</h2>
      <p>{description}</p>
    </div>
</>
   
  );
}

export default Card;

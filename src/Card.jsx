import React from "react";

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src={process.env.PUBLIC_URL + "/img/cover-image.jpg"}
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

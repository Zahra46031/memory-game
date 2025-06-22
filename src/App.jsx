import React, { useState, useEffect } from "react";
import Card from "./Card";
import "./App.css";

const allCardImages = [
  process.env.PUBLIC_URL + "/img/helmet.jpg",
  process.env.PUBLIC_URL + "/img/potion.jpg",
  process.env.PUBLIC_URL + "/img/ring.jpg",
  process.env.PUBLIC_URL + "/img/scroll.jpg",
  process.env.PUBLIC_URL + "/img/shield.jpg",
  process.env.PUBLIC_URL + "/img/sword.jpg",
  process.env.PUBLIC_URL + "/img/axe.jpg",
  process.env.PUBLIC_URL + "/img/book.jpg",
  process.env.PUBLIC_URL + "/img/bow.jpg",
  process.env.PUBLIC_URL + "/img/boots.jpg",
  process.env.PUBLIC_URL + "/img/fireball.jpg",
  process.env.PUBLIC_URL + "/img/dragon.jpg",
  process.env.PUBLIC_URL + "/img/wand.jpg",
  process.env.PUBLIC_URL + "/img/star.jpg",
  process.env.PUBLIC_URL + "/img/ice.jpg",
  process.env.PUBLIC_URL + "/img/lightning.jpg",
  process.env.PUBLIC_URL + "/img/ghost.jpg",
  process.env.PUBLIC_URL + "/img/coin.jpg",
  process.env.PUBLIC_URL + "/img/leaf.jpg",
  process.env.PUBLIC_URL + "/img/skull.jpg",
  process.env.PUBLIC_URL + "/img/mask.png",
  process.env.PUBLIC_URL + "/img/crystal.jpg",
  process.env.PUBLIC_URL + "/img/feather.jpg",
  process.env.PUBLIC_URL + "/img/eye.png",
  process.env.PUBLIC_URL + "/img/hammer.png",
  process.env.PUBLIC_URL + "/img/key.jpg",
  process.env.PUBLIC_URL + "/img/moon.jpg",
  process.env.PUBLIC_URL + "/img/sun.png",
  process.env.PUBLIC_URL + "/img/tooth.jpg",
  process.env.PUBLIC_URL + "/img/trophy.jpg",
  process.env.PUBLIC_URL + "/img/vial.jpg",
  process.env.PUBLIC_URL + "/img/claws.jpg"
]; // 32 unique images

const levelConfig = {
  beginner: 2,      // 2x2 = 4 cards = 2 pairs
  intermediate: 8, // 4x4 = 16 cards = 8 pairs
  advanced:   18    // 6x6 = 36 cards = 18 pairs
};

function App() {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [level, setLevel] = useState(null);
  const [gameWon, setGameWon] = useState(false);

  const shuffleCards = (pairCount) => {
  // Step 1: Randomly pick N unique images
  const selectedImages = [...allCardImages]
    .sort(() => Math.random() - 0.5) // shuffle the full list
    .slice(0, pairCount);            // pick N images

  // Step 2: Create pairs and shuffle them
  const shuffled = [...selectedImages, ...selectedImages]
    .sort(() => Math.random() - 0.5) // shuffle again
    .map((src) => ({
      src,
      matched: false,
      id: Math.random()
    }));

  setCards(shuffled);
  setChoiceOne(null);
  setChoiceTwo(null);
  setGameWon(false);
};


  const handleChoice = (card) => {
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
    }
  };

  useEffect(() => {
  if (choiceOne && choiceTwo) {
    setDisabled(true);
    if (choiceOne.src === choiceTwo.src) {
      setCards((prev) => {
        const updated = prev.map((card) =>
          card.src === choiceOne.src ? { ...card, matched: true } : card
        );
        // Check for win condition
        const allMatched = updated.every((card) => card.matched);
        if (allMatched) {
          setTimeout(() => setGameWon(true), 500); // short delay for last card flip
        }
        return updated;
      });
      resetTurn();
    } else {
      setTimeout(resetTurn, 1000);
    }
  }
}, [choiceOne, choiceTwo]);


  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setDisabled(false);
  };

  const handleLevelSelect = (selectedLevel) => {
    setLevel(selectedLevel);
    shuffleCards(levelConfig[selectedLevel]);
  };



  return (
    
    <div className="App">
      {gameWon && (
  <div className="success-message">
    🎉 You matched all cards! Try a new game or change difficulty.
  </div>
)}
      <h1>Memory Game</h1>
      {!level ? (
        <div className="level-select">
          <h2>Select Difficulty</h2>
          <button onClick={() => handleLevelSelect("beginner")}>Beginner</button>
          &nbsp;
          <button onClick={() => handleLevelSelect("intermediate")}>Intermediate</button>
          &nbsp;
          <button onClick={() => handleLevelSelect("advanced")}>Advanced</button>
        </div>
      ) : (
        <>
          <button onClick={() => handleLevelSelect(level)}>New Game</button>
          &nbsp;
          <button onClick={() => setLevel(null)}>Change Difficulty</button>
          <div
            className="card-grid"
            style={{
              gridTemplateColumns: `repeat(${Math.sqrt(levelConfig[level] * 2)}, 100px)`
            }}
          >
            {cards.map((card) => (
              <Card
                key={card.id}
                card={card}
                handleChoice={handleChoice}
                flipped={card === choiceOne || card === choiceTwo || card.matched}
                disabled={disabled}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;

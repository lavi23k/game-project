import React from 'react';
import { Link } from 'react-router-dom';
import './MemoryGame.css';

const MemoryGame = () => {
  return (
    <div className="memory-game-container">
      <h1 className="memory-game-header">Memory Game</h1>
      <div className="memory-game-selection">
        <div className="memory-game-option">
          <Link to="/verbal-memory" className="memory-game-button">
            Verbal Memory
          </Link>
          <p>You will be shown words individually. Click Seen if you have encountered the word before. Click New if it is the first time you are seeing the word.</p>
        </div>
        <div className="memory-game-option">
          <Link to="/number-memory" className="memory-game-button">
            Number Memory
          </Link>
          <p>Your task is to remember sequences of numbers. A number will appear briefly, and you must recall it accurately.</p>
        </div>
      </div>
    </div>
  );
};

export default MemoryGame;
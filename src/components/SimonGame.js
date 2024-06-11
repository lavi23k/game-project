import React, { useState, useEffect, useCallback } from 'react';
import './SimonGame.css';

const SimonGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [message, setMessage] = useState('Press "Start Game" to begin');

  const playSequence = useCallback((sequence) => {
    sequence.forEach((square, index) => {
      setTimeout(() => {
        activateSquare(square);
      }, (index + 1) * 600);
    });
    setTimeout(() => {
      setIsUserTurn(true);
      setMessage('Your turn! Repeat the sequence.');
    }, sequence.length * 600 + 500);
  }, []);

  const startNextRound = useCallback(() => {
    setIsUserTurn(false);
    const newSequence = [...sequence, Math.floor(Math.random() * 9)];
    setSequence(newSequence);
    setUserSequence([]);
    playSequence(newSequence);
  }, [sequence, playSequence]);

  useEffect(() => {
    if (userSequence.length === sequence.length && isUserTurn) {
      if (userSequence.join('') === sequence.join('')) {
        setMessage('Correct! Get ready for the next round.');
        setTimeout(() => {
          startNextRound();
        }, 1000);
      } else {
        setMessage('Game Over! Press "Play Again" to restart.');
      }
    }
  }, [userSequence, isUserTurn, sequence, startNextRound]);

  const startGame = () => {
    setSequence([]);
    setUserSequence([]);
    setMessage('Watch the sequence...');
    setTimeout(() => {
      startNextRound();
    }, 1000);
  };

  const activateSquare = (index) => {
    const square = document.getElementById(`square-${index}`);
    square.classList.add('simon-active');
    setTimeout(() => {
      square.classList.remove('simon-active');
    }, 300);
  };

  const handleSquareClick = (index) => {
    if (!isUserTurn) return;
    setUserSequence([...userSequence, index]);
    activateSquare(index);
  };

  return (
    <div className="simon-app">
      <h1>Simon Game</h1>
      <button onClick={startGame}>Start Game</button>
      <p>{message}</p>
      <div className="simon-board">
        {Array.from({ length: 9 }, (_, index) => (
          <div
            key={index}
            id={`square-${index}`}
            className="simon-square"
            onClick={() => handleSquareClick(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default SimonGame;
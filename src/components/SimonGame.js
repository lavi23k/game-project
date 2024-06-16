import React, { useState, useEffect, useCallback } from 'react';
import './SimonGame.css';

const SimonGame = () => {
  const [sequence, setSequence] = useState([]);
  const [userSequence, setUserSequence] = useState([]);
  const [isUserTurn, setIsUserTurn] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [level, setLevel] = useState(1);

  const playSequence = useCallback((sequence) => {
    sequence.forEach((square, index) => {
      setTimeout(() => {
        activateSquare(square);
      }, (index + 1) * 600);
    });
    setTimeout(() => {
      setIsUserTurn(true);
    }, sequence.length * 600 + 500);
  }, []);

  const startNextRound = useCallback(() => {
    setIsUserTurn(false);
    const newSequence = [...sequence, Math.floor(Math.random() * 9)];
    setSequence(newSequence);
    setUserSequence([]);
    setLevel((prevLevel) => prevLevel + 1);
    playSequence(newSequence);
  }, [sequence, playSequence]);

  useEffect(() => {
    if (userSequence.length === sequence.length && isUserTurn) {
      if (userSequence.join('') === sequence.join('')) {
        setTimeout(() => {
          startNextRound();
        }, 1000);
      } else {
        setGameOver(true);
      }
    } else if (isUserTurn && userSequence.length < sequence.length) {
      for (let i = 0; i < userSequence.length; i++) {
        if (userSequence[i] !== sequence[i]) {
          setGameOver(true);
          return;
        }
      }
    }
  }, [userSequence, isUserTurn, sequence, startNextRound]);

  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 9)];
    setSequence(newSequence);
    setUserSequence([]);
    setLevel(1);
    setGameOver(false);
    setTimeout(() => {
      playSequence(newSequence);
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
    if (!isUserTurn || gameOver) return;
    setUserSequence([...userSequence, index]);
    activateSquare(index);
  };

  return (
    <div className="simon-app">
      <h1 className="simon-title">Simon Game</h1>
      <h2 className="simon-level">Level: {level}</h2>
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
      <button className="game-button" onClick={startGame}>
        {gameOver ? 'Play Again' : 'Start Game'}
      </button>
    </div>
  );
};

export default SimonGame;
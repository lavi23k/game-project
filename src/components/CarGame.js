import React, { useState, useEffect } from 'react';
import './CarGame.css';

const CarGame = () => {
  const [cars, setCars] = useState([]);
  const [currentRound, setCurrentRound] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [guessSubmitted, setGuessSubmitted] = useState(false);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCars(data);
      } catch (err) {
        console.error('Fetch error:', err);
      }
    };
    fetchCars();
  }, []);

  const handleGuessChange = (e) => {
    const value = e.target.value;
    if (value.length <= 4 && /^\d*$/.test(value)) {
      setCurrentGuess(value);
    }
  };

  const handleSubmitGuess = () => {
    if (currentGuess.length !== 4) return;

    const car = cars[currentRound - 1];
    const yearGuess = parseInt(currentGuess, 10);
    const points = Math.max(0, 100 - Math.abs(car.year - yearGuess));

    setResults([...results, { ...car, guess: yearGuess, points }]);
    setScore(score + points);
    setCurrentGuess('');
    setGuessSubmitted(true);
  };

  const handleNextRound = () => {
    if (currentRound === cars.length) {
      setGameOver(true);
    } else {
      setCurrentRound(currentRound + 1);
      setGuessSubmitted(false);
    }
  };

  const handlePlayAgain = () => {
    setCurrentRound(1);
    setCurrentGuess('');
    setScore(0);
    setResults([]);
    setGameOver(false);
    setGameStarted(true);
    setGuessSubmitted(false);
  };

  const handleStartGame = () => {
    setGameStarted(true);
  };

  if (cars.length === 0) return <p>Loading...</p>;

  return (
    <div className="car-game-container car-game-background">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Car Guessing Game</h1>
          <p><b>Guess the year of the car to score points</b></p>
          <button className="start-button" onClick={handleStartGame}>Start</button>
        </div>
      ) : gameOver ? (
        <div className="end-screen">
          <h1>Car Guessing Game</h1>
          <h2>Points: {score}</h2>
          <button className="play-again-button" onClick={handlePlayAgain}>Play Again</button>
        </div>
      ) : (
        <div>
          <h1>Round {currentRound}/{cars.length}</h1>
          <div className="car-image-container">
            <img src={cars[currentRound - 1].image} alt={cars[currentRound - 1].name} className="car-image"/>
          </div>
          <h2 className="car-name">{cars[currentRound - 1].name}</h2>
          {!guessSubmitted ? (
            <>
              <input
                type="text"
                placeholder="Guess the year"
                value={currentGuess}
                onChange={handleGuessChange}
                maxLength={4}
                className="year-input"
              />
              <button className="submit-button" onClick={handleSubmitGuess} disabled={currentGuess.length !== 4}>
                Submit Guess
              </button>
            </>
          ) : (
            <div className="result">
              <p className="result-text">Correct Year: {cars[currentRound - 1].year}</p>
              <p className="points">Points: {results[currentRound - 1].points}</p>
              <button className="next-button" onClick={handleNextRound}>
                Next
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CarGame;
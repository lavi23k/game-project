import React, { useState } from 'react';
import './CarGame.css';

const cars = [
  { name: "Audi 80", year: 1994, image: '/images/cars/audi_80.jpg' },
  { name: "BMW 3.0 CSL", year: 1975, image: '/images/cars/bmw_csl.webp' },
  { name: "BMW M1", year: 1979, image: '/images/cars/bmw_m1.jpg' },
  { name: "Mercedes-Benz C250", year: 2014, image: '/images/cars/mercedes_c250.jpg' },
  { name: "Kia Sportage", year: 1996, image: '/images/cars/kia_sportage.jpg' },
  { name: "Hyundai Sonata", year: 2009, image: '/images/cars/hyundai_sonata.jpg' },
  { name: "Toyota Corolla", year: 1998, image: '/images/cars/toyota_carolla.jpg' },
  { name: "Ford F-150", year: 2004, image: '/images/cars/ford_f150.jpg' },
  { name: "Nissan Primera SX", year: 2005, image: '/images/cars/nissan_primera.jpg' },
  { name: "Mercedes-Benz E55 AMG", year: 2004, image: '/images/cars/mercedes_e55.jpg' }
];

const CarGame = () => {
  const [currentRound, setCurrentRound] = useState(1);
  const [currentGuess, setCurrentGuess] = useState('');
  const [score, setScore] = useState(0);
  const [results, setResults] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [guessSubmitted, setGuessSubmitted] = useState(false);

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

  return (
    <div className="car-game-container car-game-background">
      {!gameStarted ? (
        <div className="start-screen">
          <h1>Car Guessing Game</h1>
          <p><b>Guess the year of the car to score points. The closer you are, the more points you get!</b></p>
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
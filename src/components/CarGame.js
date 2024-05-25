import React, { useState } from 'react';
import './CarGame.css';

const carData = [
    { src: '/images/cars/car1.jpeg', year: 1994 },
    { src: '/images/cars/car2.webp', year: 1975 },
    { src: '/images/cars/car3.jpg', year: 1979 },
    { src: '/images/cars/car4.jpg', year: 2014 },
    { src: '/images/cars/car5.jpg', year: 1996 },
    { src: '/images/cars/car6.jpg', year: 2009 },
    { src: '/images/cars/car7.jpg', year: 1998 },
    { src: '/images/cars/car8.jpg', year: 2004 },
    { src: '/images/cars/car9.jpg', year: 2005 },
    { src: '/images/cars/car10.jpg', year: 2004 }
];

const CarGame = () => {
    const [currentCarIndex, setCurrentCarIndex] = useState(0);
    const [guess, setGuess] = useState('');
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);

    const handleGuessChange = (e) => setGuess(e.target.value);

    const handleSubmitGuess = () => {
        if (parseInt(guess) === carData[currentCarIndex].year) {
            setScore(score + 1);
        }
        setCurrentCarIndex(currentCarIndex + 1);
        setGuess('');
        if (currentCarIndex === carData.length - 1) {
            setShowResult(true);
        }
    };

    const handleStartGame = () => {
        setGameStarted(true);
        setCurrentCarIndex(0);
        setScore(0);
        setShowResult(false);
    };

    return (
        <div className="car-game-container">
            {!gameStarted ? (
                <div className="intro">
                    <h1>Car Guessing Game</h1>
                    <p>Try to guess the manufacturing year of the car shown in the picture.</p>
                    <button className="start-button" onClick={handleStartGame}>Start Game</button>
                </div>
            ) : showResult ? (
                <div className="result">
                    <h1>Good Try</h1>
                    <p>You guessed correctly {score} out of {carData.length} cars.</p>
                    <p>Your success rate is {(score / carData.length) * 100}%</p>
                    <button className="try-again-button" onClick={handleStartGame}>Try Again</button>
                </div>
            ) : (
                <div className="game">
                    <img className="car-image" src={carData[currentCarIndex].src} alt="car" />
                    <input
                        type="number"
                        value={guess}
                        onChange={handleGuessChange}
                        placeholder="Guess the year"
                    />
                    <button className="submit-button" onClick={handleSubmitGuess}>Submit Guess</button>
                </div>
            )}
        </div>
    );
};

export default CarGame;

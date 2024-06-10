import React, { useState, useEffect } from 'react';
import './MemoryGame.css';

const NumberMemory = () => {
  const [number, setNumber] = useState('');
  const [userInput, setUserInput] = useState('');
  const [round, setRound] = useState(1);
  const [isGameOver, setIsGameOver] = useState(false);
  const [timer, setTimer] = useState(3);
  const [showInput, setShowInput] = useState(false);
  const [lastInput, setLastInput] = useState('');
  const [initialTimer, setInitialTimer] = useState(3);

  useEffect(() => {
    if (timer > 0) {
      const timeout = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(timeout);
    } else {
      setShowInput(true);
    }
  }, [timer]);

  useEffect(() => {
    generateNumber(round);
  }, [round]);

  const generateNumber = (round) => {
    let newNumber;
    do {
      newNumber = Math.floor(Math.random() * Math.pow(10, round)).toString();
    } while (newNumber.length < round);
    setNumber(newNumber);
    const newTimer = 3 + round;
    setTimer(newTimer);
    setInitialTimer(newTimer);
    setShowInput(false);
  };

  const handleSubmit = () => {
    setLastInput(userInput);
    if (number === userInput) {
      setRound(round + 1);
    } else {
      setIsGameOver(true);
    }
    setUserInput('');
  };

  const renderInputWithStrikethrough = (input, correct) => {
    let result = '';
    for (let i = 0; i < input.length; i++) {
      if (input[i] === correct[i]) {
        result += `<span>${input[i]}</span>`;
      } else {
        result += `<span style="text-decoration: line-through;">${input[i]}</span>`;
      }
    }
    return result;
  };

  if (isGameOver) {
    return (
      <div className="number-memory-container">
        <h1 className="number-memory-round">Round {round - 1}</h1>
        <p className="number-memory-feedback">Number</p>
        <p className="number-memory-info">{number}</p>
        <p className="number-memory-feedback">Your answer</p>
        <p className="number-memory-info">
          <span dangerouslySetInnerHTML={{ __html: renderInputWithStrikethrough(lastInput, number) }} />
        </p>
        <button className="number-memory-submit-button" onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="number-memory-container">
      <h1 className="number-memory-round">Round {round}</h1>
      {showInput ? (
        <>
          <p className="number-memory-feedback">What was the number?</p>
          <input
            type="text"
            className="number-memory-input"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
          />
          <button className="number-memory-submit-button" onClick={handleSubmit}>Submit</button>
        </>
      ) : (
        <>
          <p className="number-memory-feedback">Number</p>
          <p className="number-memory-info">{number}</p>
          <div className="number-memory-timer">
            <div className="progress-bar">
              <div className="progress" style={{ width: `${(timer / initialTimer) * 100}%` }}></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NumberMemory;
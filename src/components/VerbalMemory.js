import React, { useState, useEffect, useCallback } from 'react';
import './MemoryGame.css';

const VerbalMemory = () => {
  const [lives, setLives] = useState(3);
  const [round, setRound] = useState(1);
  const [wordsSeen, setWordsSeen] = useState(new Set());
  const [currentWord, setCurrentWord] = useState('');
  const [isGameOver, setIsGameOver] = useState(false);
  const [words, setWords] = useState([]);

  const getRandomWords = useCallback((wordsArray, count) => {
    const shuffled = wordsArray.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }, []);

  const generateWord = useCallback(() => {
    const repeatedWords = Array.from(wordsSeen);
    const allWords = [...words, ...repeatedWords, ...repeatedWords, ...repeatedWords, ...repeatedWords, ...repeatedWords];
    const word = allWords[Math.floor(Math.random() * allWords.length)];
    setCurrentWord(word);
  }, [words, wordsSeen]);

  useEffect(() => {
    fetch('/english-nouns.txt')
      .then(response => response.text())
      .then(text => {
        const wordsArray = text.split('\n').map(word => word.trim());
        const randomWords = getRandomWords(wordsArray, 50);
        setWords(randomWords);
      });
  }, [getRandomWords]);

  useEffect(() => {
    if (lives <= 0) {
      setIsGameOver(true);
    } else if (words.length > 0) {
      generateWord();
    }
  }, [lives, words, generateWord]);

  const handleGuess = (isSeen) => {
    const wordIsSeen = wordsSeen.has(currentWord);
    if ((isSeen && wordIsSeen) || (!isSeen && !wordIsSeen)) {
      setWordsSeen(new Set(wordsSeen).add(currentWord));
      setRound(round + 1);
    } else {
      setLives(lives - 1);
    }
    generateWord();
  };

  if (isGameOver) {
    return (
      <div className="verbal-memory-container">
        <h1 className="verbal-memory-round">Game Over</h1>
        <p className="verbal-memory-lives">Total Rounds: {round - 1}</p>
        <button className="verbal-memory-button" onClick={() => window.location.reload()}>Play Again</button>
      </div>
    );
  }

  return (
    <div className="verbal-memory-container">
      <h1 className="verbal-memory-round">Round {round}</h1>
      <p className="verbal-memory-lives">Lives: {lives}</p>
      <p className="verbal-memory-info">{currentWord}</p>
      <button className="verbal-memory-button" onClick={() => handleGuess(true)}>Seen</button>
      <button className="verbal-memory-button" onClick={() => handleGuess(false)}>New</button>
    </div>
  );
};

export default VerbalMemory;
import React, { useState, useEffect } from 'react';
import './FillominoGame.css';

const initialPuzzle = [
    [5, 0, 0, 1, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 4, 1, 0, 6, 5, 0],
    [0, 1, 0, 0, 0, 1, 0, 0],
    [0, 4, 1, 0, 0, 0, 0, 6],
    [1, 0, 0, 5, 0, 0, 0, 1],
    [3, 0, 1, 0, 0, 7, 5, 0],
    [0, 0, 1, 0, 0, 1, 0, 4]
];

const solution = [
    [5, 5, 5, 1, 6, 6, 1, 1],
    [1, 5, 5, 6, 6, 6, 1, 5],
    [3, 3, 4, 1, 6, 6, 5, 5],
    [3, 1, 4, 4, 4, 1, 5, 6],
    [4, 4, 1, 7, 7, 7, 7, 6],
    [1, 7, 7, 5, 7, 7, 7, 1],
    [3, 7, 1, 5, 7, 7, 5, 4],
    [3, 3, 1, 7, 7, 1, 4, 4]
];

const generatePuzzle = () => {
    return initialPuzzle.map(row => [...row]);
};

const FillominoGame = () => {
    const [grid, setGrid] = useState(generatePuzzle());
    const [selectedNumber, setSelectedNumber] = useState('1');

    useEffect(() => {
        setGrid(generatePuzzle());
    }, []);

    const handleCellClick = (row, col) => {
        const newGrid = grid.map(arr => [...arr]);
        if (initialPuzzle[row][col] === 0) {
            if (newGrid[row][col] === 0 || newGrid[row][col] !== parseInt(selectedNumber)) {
                newGrid[row][col] = parseInt(selectedNumber);
            } else {
                newGrid[row][col] = 0;
            }
            setGrid(newGrid);
        }
    };

    const showAnswer = () => {
        setGrid(solution.map(row => [...row]));
    };

    const restartPuzzle = () => {
        setGrid(generatePuzzle());
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (!isNaN(e.key) && e.key !== '0') {
                setSelectedNumber(e.key);
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <div className="fillomino-body">
            <div id="fillomino-game-container">
                <div id="fillomino-number-panel">
                    {[...'123456789'].map(num => (
                        <button
                            key={num}
                            className={`fillomino-number-button ${selectedNumber === num ? 'selected' : ''}`}
                            onClick={() => setSelectedNumber(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
                <div className="fillomino-grid">
                    {grid.map((row, rowIndex) => row.map((cell, colIndex) => (
                        <div
                            key={`${rowIndex}-${colIndex}`}
                            className={`fillomino-grid-cell ${initialPuzzle[rowIndex][colIndex] !== 0 ? 'given' : ''}`}
                            onClick={() => handleCellClick(rowIndex, colIndex)}
                        >
                            {cell !== 0 ? cell : ''}
                        </div>
                    )))}
                </div>
                <div id="fillomino-control-buttons">
                    <button onClick={showAnswer}>Answer</button>
                    <button onClick={restartPuzzle}>Restart</button>
                </div>
            </div>
        </div>
    );
};

export default FillominoGame;
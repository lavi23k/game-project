import React, { useState, useEffect } from 'react';
import './FillominoGame.css';

const generatePuzzle = () => {
    // Example logic to generate a new puzzle
    const puzzle = [
        [1, 1, 1, 1, 8, 0, 0, 0],
        [5, 5, 0, 1, 4, 0, 0, 0],
        [2, 0, 0, 6, 6, 5, 0, 0],
        [1, 0, 6, 0, 0, 5, 0, 8],
        [0, 6, 0, 0, 5, 4, 0, 1],
        [7, 0, 7, 0, 3, 0, 4, 0],
        [0, 7, 0, 3, 0, 0, 0, 0],
        [0, 1, 0, 7, 0, 0, 0, 0]
    ];
    // You can replace this with a more complex generation logic
    return puzzle;
};

const FillominoGame = () => {
    const [grid, setGrid] = useState(generatePuzzle());
    const [selectedNumber, setSelectedNumber] = useState('1');

    useEffect(() => {
        setGrid(generatePuzzle());
    }, []);

    const handleCellClick = (row, col) => {
        const newGrid = grid.map(arr => [...arr]);
        if (newGrid[row][col] === 0 || newGrid[row][col] !== parseInt(selectedNumber)) {
            newGrid[row][col] = parseInt(selectedNumber);
        } else {
            newGrid[row][col] = 0;
        }
        setGrid(newGrid);
    };

    const showAnswer = () => {
        setGrid(generatePuzzle());
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
                            className={`fillomino-grid-cell ${cell !== 0 ? 'given' : ''}`}
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
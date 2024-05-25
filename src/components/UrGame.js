import React, { useState } from 'react';
import './UrGame.css';

const UrGame = () => {
    const initialBoard = [
        null, null, null, null,
        null, null, null, null,
        null, null, null, null,
        null, null,
        null, null,
        null, null,
        null, null,
    ];

    const rosettePositions = [4, 8, 14]; // Indices of the rosettes
    const playerColors = ['lightblue', 'lightcoral'];

    const [board, setBoard] = useState(initialBoard);
    const [playerTurn, setPlayerTurn] = useState(1);
    const [diceRoll, setDiceRoll] = useState(0);
    const [player1Pieces, setPlayer1Pieces] = useState(7);
    const [player2Pieces, setPlayer2Pieces] = useState(7);
    const [player1OnBoard, setPlayer1OnBoard] = useState([]);
    const [player2OnBoard, setPlayer2OnBoard] = useState([]);

    const rollDice = () => {
        const roll = Math.floor(Math.random() * 4) + 1;
        setDiceRoll(roll);
    };

    const handleMove = (index) => {
        if (diceRoll === 0 || board[index] !== playerTurn) return;

        let newIndex = index + diceRoll;
        if (newIndex >= 20) {
            newIndex = 20 - (newIndex - 20) - 1;
        }

        const newBoard = [...board];

        if (newBoard[newIndex] !== null && newBoard[newIndex] !== playerTurn) {
            // Capture the opponent's piece
            if (playerTurn === 1) {
                setPlayer2OnBoard(player2OnBoard.filter(pos => pos !== newIndex));
                setPlayer2Pieces(player2Pieces + 1);
            } else {
                setPlayer1OnBoard(player1OnBoard.filter(pos => pos !== newIndex));
                setPlayer1Pieces(player1Pieces + 1);
            }
        }

        newBoard[index] = null;
        newBoard[newIndex] = playerTurn;
        setBoard(newBoard);

        if (playerTurn === 1) {
            setPlayer1OnBoard(player1OnBoard.map(pos => (pos === index ? newIndex : pos)));
        } else {
            setPlayer2OnBoard(player2OnBoard.map(pos => (pos === index ? newIndex : pos)));
        }

        if (!rosettePositions.includes(newIndex)) {
            setPlayerTurn(playerTurn === 1 ? 2 : 1);
        }

        setDiceRoll(0);
    };

    const addPiece = () => {
        if (diceRoll === 0) return;

        const newBoard = [...board];
        const startPosition = 0;

        if (newBoard[startPosition] !== null) return;

        newBoard[startPosition] = playerTurn;
        setBoard(newBoard);

        if (playerTurn === 1) {
            setPlayer1Pieces(player1Pieces - 1);
            setPlayer1OnBoard([...player1OnBoard, startPosition]);
        } else {
            setPlayer2Pieces(player2Pieces - 1);
            setPlayer2OnBoard([...player2OnBoard, startPosition]);
        }

        setPlayerTurn(playerTurn === 1 ? 2 : 1);
        setDiceRoll(0);
    };

    const renderSquare = (i) => {
        const player = board[i];
        return (
            <div className={`square ${playerColors[player - 1]}`} onClick={() => handleMove(i)}>
                {player !== null && (
                    <span className={`piece player${player}`}></span>
                )}
            </div>
        );
    };

    return (
        <div className="ur-game-container">
            <h2>The Royal Game of Ur</h2>
            <button className="roll-dice-button" onClick={rollDice}>Roll Dice</button>
            <p>Dice Roll: {diceRoll}</p>
            <p>Player {playerTurn}'s Turn</p>
            <div className="board">
                {initialBoard.map((_, i) => renderSquare(i))}
            </div>
            <button className="add-piece-button" onClick={addPiece}>Add Piece</button>
            <p>Player 1 Pieces Left: {player1Pieces}</p>
            <p>Player 2 Pieces Left: {player2Pieces}</p>
        </div>
    );
};

export default UrGame;

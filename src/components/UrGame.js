import React, { useState } from 'react';
import './UrGame.css';

const UrGame = () => {
  const initialBoard = Array(21).fill(null);
  const rosettePositions = [0, 2, 10, 18, 20];
  const safeZones = [10];
  const playerColors = ['orange', 'purple'];

  const [board, setBoard] = useState(initialBoard);
  const [playerTurn, setPlayerTurn] = useState(1);
  const [diceRoll, setDiceRoll] = useState(0);
  const [player1Pieces, setPlayer1Pieces] = useState(Array(7).fill(false));
  const [player2Pieces, setPlayer2Pieces] = useState(Array(7).fill(false));
  const [player1OffBoard, setPlayer1OffBoard] = useState(0);
  const [player2OffBoard, setPlayer2OffBoard] = useState(0);
  const [selectedPiece, setSelectedPiece] = useState(null);

  const paths = [
    [9, 6, 3, 0, 1, 4, 7, 10, 11, 12, 15, 18, 19, 16], 
    [11, 8, 5, 2, 1, 4, 7, 10, 13, 14, 17, 20, 19, 16] 
  ];

  const rollDice = () => {
    if (diceRoll === 0) {
      const roll = Math.floor(Math.random() * 5);
      setDiceRoll(roll);
      if (roll === 0) {
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
      }
    }
  };

  const handlePieceClick = (pieceIndex) => {
    const player = parseInt(pieceIndex.split('-')[0], 10);
    if (diceRoll > 0 && player === playerTurn) {
      setSelectedPiece(pieceIndex);
    }
  };

  const handleAddPiece = () => {
    if (selectedPiece === null || diceRoll === 0) return;

    const path = paths[playerTurn - 1];
    let newPos = diceRoll - 1;
    const newBoard = [...board];
    const newPosition = path[newPos];

    if (newBoard[newPosition] === null) {
      if ((playerTurn === 1 && player1Pieces[selectedPiece.split('-')[1]]) || 
          (playerTurn === 2 && player2Pieces[selectedPiece.split('-')[1]])) {
        return;
      }

      newBoard[newPosition] = `${playerTurn}-${selectedPiece.split('-')[1]}`;

      if (playerTurn === 1) {
        const newPlayer1Pieces = [...player1Pieces];
        newPlayer1Pieces[selectedPiece.split('-')[1]] = true;
        setPlayer1Pieces(newPlayer1Pieces);
      } else {
        const newPlayer2Pieces = [...player2Pieces];
        newPlayer2Pieces[selectedPiece.split('-')[1]] = true;
        setPlayer2Pieces(newPlayer2Pieces);
      }

      setBoard(newBoard);
      setSelectedPiece(null);
      setDiceRoll(0);

      if (!rosettePositions.includes(newPosition) && newPosition !== 10) {
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
      }
    }
  };

  const handleMovePiece = () => {
    if (selectedPiece === null || diceRoll === 0) return;

    const path = paths[playerTurn - 1];
    const piecePosition = board.indexOf(selectedPiece);
    let currentPos = path.indexOf(piecePosition);
    let newPos = currentPos + diceRoll;

    if (currentPos === -1 || newPos >= path.length) return;

    const newBoard = [...board];
    const newPosition = path[newPos];
    const isRosette = rosettePositions.includes(newPosition);
    const isSafeZone = safeZones.includes(newPosition);

    if (newBoard[newPosition] && newBoard[newPosition].split('-')[0] === String(playerTurn)) {
      return;
    }

    if (newBoard[newPosition] && newBoard[newPosition].split('-')[0] !== String(playerTurn) && !isSafeZone) {
      const opponentOnBoard = playerTurn === 1 ? player2Pieces : player1Pieces;
      const setOpponentOnBoard = playerTurn === 1 ? setPlayer2Pieces : setPlayer1Pieces;

      const opponentPieceIndex = parseInt(newBoard[newPosition].split('-')[1], 10);
      const newOpponentOnBoard = [...opponentOnBoard];
      newOpponentOnBoard[opponentPieceIndex] = false;
      setOpponentOnBoard(newOpponentOnBoard);

      newBoard[newPosition] = null;
    }

    newBoard[piecePosition] = null;
    newBoard[newPosition] = selectedPiece;
    setBoard(newBoard);

    if (newPosition === path[path.length - 1] && diceRoll === 1) {
      if (playerTurn === 1) {
        setPlayer1OffBoard(player1OffBoard + 1);
        const newPlayer1Pieces = [...player1Pieces];
        newPlayer1Pieces[selectedPiece.split('-')[1]] = false;
        setPlayer1Pieces(newPlayer1Pieces);
      } else {
        setPlayer2OffBoard(player2OffBoard + 1);
        const newPlayer2Pieces = [...player2Pieces];
        newPlayer2Pieces[selectedPiece.split('-')[1]] = false;
        setPlayer2Pieces(newPlayer2Pieces);
      }
      newBoard[newPosition] = null;
      setBoard(newBoard);
    } else {
      if (!isRosette && newPosition !== 10) {
        setPlayerTurn(playerTurn === 1 ? 2 : 1);
      }
    }

    if (newPosition === 10 || isRosette) {
      setDiceRoll(0);
      if (newPosition === 10) {
        setDiceRoll(rollDice());
      }
    }

    setSelectedPiece(null);
    setDiceRoll(0);
  };

  const renderSquare = (i, area) => {
    const playerInfo = board[i];
    const isRosette = rosettePositions.includes(i);
    const isSafeZone = safeZones.includes(i);
    return (
      <div className={`square ${playerInfo ? playerColors[Number(playerInfo.split('-')[0]) - 1] : ''}`} style={{ gridArea: area }}>
        {isRosette && <div className="rosette"></div>}
        {isSafeZone && <div className="safe-zone"></div>}
        {playerInfo && (
          <span className={`piece player${playerInfo.split('-')[0]}`}>{parseInt(playerInfo.split('-')[1]) + 1}</span>
        )}
      </div>
    );
  };

  const boardAreas = [
    "a1", "a2", "a3",
    "b1", "b2", "b3",
    "c1", "c2", "c3",
    "d1", "d2", "d3",
    null, "e2", null,
    null, "f2", null,
    "g1", "g2", "g3",
    "h1", "h2", "h3"
  ];

  const renderPieces = (player) => {
    const pieces = player === 1 ? player1Pieces : player2Pieces;
    const offBoard = player === 1 ? player1OffBoard : player2OffBoard;
    return Array.from({ length: 7 }, (_, i) => (
      <div
        key={i}
        className={`piece-item ${pieces[i] ? 'on-board' : ''} ${offBoard > i ? 'off-board' : ''} ${selectedPiece === `${player}-${i}` ? 'selected' : ''}`}
        onClick={() => handlePieceClick(`${player}-${i}`)}
      >{i + 1}</div>
    ));
  };

  return (
    <div className="ur-game-container">
      <h2>The Royal Game of Ur</h2>
      <div className="board-container">
        <div className="board">
          {boardAreas.map((area, i) => area ? renderSquare(i, area) : <div key={i}></div>)}
        </div>
      </div>
      <div className="info-container">
        <div className="info-box">
          <p>Dice Roll: {diceRoll}</p>
          <p>Player {playerTurn}'s Turn</p>
        </div>
        <div className="info-box">
          <p>Player 1 Score: {player1OffBoard}</p>
          <div className="player-box">
            <h3>Player 1 Pieces</h3>
            <div className="piece-list">
              {renderPieces(1)}
            </div>
          </div>
        </div>
        <div className="info-box">
          <p>Player 2 Score: {player2OffBoard}</p>
          <div className="player-box">
            <h3>Player 2 Pieces</h3>
            <div className="piece-list">
              {renderPieces(2)}
            </div>
          </div>
        </div>
      </div>
      <div className="button-container">
        <button className="roll-dice-button" onClick={rollDice}>Roll Dice</button>
        <button className="add-piece-button" onClick={handleAddPiece}>Add Piece</button>
        <button className="move-piece-button" onClick={handleMovePiece}>Move Piece</button>
      </div>
    </div>
  );
};

export default UrGame;
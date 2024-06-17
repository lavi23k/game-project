import React from 'react';
import './UrGame.css';

const RuleModal = ({ closeModal }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={closeModal}>X</button>
        <h2>UR Game Rules</h2>
        <p><b>The Royal Game of Ur is a two-player strategy game. The objective is to move all your pieces along a specific path and off the board.</b></p>
        <ul>
          <li>Each player has 7 pieces.</li>
          <li>Dice rolls can result in 0, 1, 2, 3. A roll of 0 skips the player's turn.</li>
          <li>If there are no available moves, the player's turn is skipped.</li>
          <li>Player 1 Path: d1-c1-b1-a1-a2-b2-c2-d2-e2-f2-g2-h2-h1-g1</li>
          <li>Player 2 Path: d3-c3-b3-a3-a2-b2-c2-d2-e2-f2-g2-h2-h3-g3</li>
          <li>Rosette squares (marked in yellow) grant an extra dice roll. Players roll the dice at the start of their turn.</li>    
          <li>Squares a2, b2, c2, e2, f2, g2, h2 are the battle zone. Landing on an opponent's piece in the battle zone sends it back to the start. Outside the battle zone, all squares are safe zones where pieces cannot be captured.</li>
          <li>Square d2 is both a rosette (extra roll) and a safe zone. Pieces on safe zones cannot be captured.</li>
          <li>Exact dice rolls are needed to exit a piece.</li>
          <li>If any player moves all their pieces off the board, the game ends immediately. The player with the most pieces off the board wins. </li>
        </ul>
      </div>
    </div>
  );
};

export default RuleModal;
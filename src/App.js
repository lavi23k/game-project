import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import CarGame from './components/CarGame';
import UrGame from './components/UrGame';
import MemoryGame from './components/MemoryGame';
import VerbalMemory from './components/VerbalMemory';
import NumberMemory from './components/NumberMemory';
import './components/styles.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Game Selection</h1>
      <div className="game-selection">
        <div className="game-box">
          <Link to="/car-game">
            <img src="/images/cargame.jpg" alt="Car Game Thumbnail" />
          </Link>
        </div>
        <div className="game-box">
          <Link to="/ur-game">
            <img src="/images/urgame.png" alt="Ur Game Thumbnail" />
          </Link>
        </div>
        <div className="game-box">
          <Link to="/memory-game">
            <img src="/images/memorygame.png" alt="Memory Game Thumbnail" />
          </Link>
        </div>
        {[...Array(6)].map((_, i) => (
          <div className="game-box" key={i}>
            <img src="/images/background1.jpg" alt="Placeholder Thumbnail" />
          </div>
        ))}
      </div>
      <footer>
        <a href="https://www.buymeacoffee.com/yourprofile" target="_blank" rel="noopener noreferrer">
          <button className="buy-coffee-button">Buy Me a Coffee</button>
        </a>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-game" element={<CarGame />} />
        <Route path="/ur-game" element={<UrGame />} />
        <Route path="/memory-game" element={<MemoryGame />} />
        <Route path="/verbal-memory" element={<VerbalMemory />} />
        <Route path="/number-memory" element={<NumberMemory />} />
      </Routes>
    </Router>
  );
};

export default App;
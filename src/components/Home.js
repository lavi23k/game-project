import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <h1>Welcome to the Game Site</h1>
            <div id="games">
                <Link to="/car-game">Car Guessing Game</Link>
                <Link to="/ur-game">The Royal Game of Ur</Link>
                {/* Diğer oyun bağlantıları buraya eklenebilir */}
            </div>
        </div>
    );
};

export default Home;
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import CarGame from './components/CarGame';
import UrGame from './components/UrGame';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/car-game" element={<CarGame />} />
                <Route path="/ur-game" element={<UrGame />} />
            </Routes>
        </Router>
    );
};

export default App;

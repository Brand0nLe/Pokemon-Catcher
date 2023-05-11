import React, { useState } from 'react';
import PokemonCard from './components/PokemonCard';
import { Pokemon } from './interfaces';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import routes from './routes';
import './styles/style.css';

function App() {
  return (
    <Router>
      <div>
        <div className="container mt-4">
          <Routes>
            {routes.map((route, index) => (
              <Route key={index} path={route.path} element={<route.component />} />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

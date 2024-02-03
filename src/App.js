// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import AccueilBackOffice from './pages/AccueilBackOffice';
import InsertCulture from './pages/InsertCulture';
import InsertTerrain from './pages/InsertTerrain';
import ValiderTerrain from './pages/ValiderTerrain';
import FicheProfil from './pages/FicheProfil';
import Statistiques from './pages/Statistiques';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={< Connexion />} />
        <Route path="/inscription" element={< Inscription />} />
        <Route path="/accueilBack" element={< AccueilBackOffice />} />
        <Route path="/insertCulture" element={< InsertCulture />} />
        <Route path="/insertTerrain" element={< InsertTerrain />} />
        <Route path="/validerTerrain" element={< ValiderTerrain />} />
        <Route path="/ficheProfil" element={< FicheProfil />} />
        <Route path="/stats" element={< Statistiques />} />
      </Routes>
    </Router>
  );
}

export default App;

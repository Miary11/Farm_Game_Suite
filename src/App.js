// import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route,Routes } from 'react-router-dom';

import Connexion from './pages/Connexion';
import Inscription from './pages/Inscription';
import Accueil from './pages/Accueil';
import AccueilFrontOffice from './pages/AccueilFrontOffice';
import FicheProfil from './pages/FicheProfil';
import Statistiques from './pages/Statistiques';
import DemandeSimulation from './pages/DemandeSimulation';
import InsertSimulation from './pages/InsertSimulation';
import InsertParcelleCulture from './pages/InsertParcelleCulture';
import DemandeParcelle from './pages/DemandeParcelle';
import Historique from './pages/Historique';
import Discussion from './pages/Discussion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/connexion" element={< Connexion />} />
        <Route path="/inscription" element={< Inscription />} />
        <Route path="/" element={< Accueil />} />
        <Route path="/accueilFront" element={< AccueilFrontOffice />} />
        <Route path="/ficheProfil" element={< FicheProfil />} />
        <Route path="/stats" element={< Statistiques />} />
        <Route path="/demandeSimulation" element={< DemandeSimulation />} />
        <Route path="/demandeParcelle" element={< DemandeParcelle />} />
        <Route path="/insertSimulation" element={< InsertSimulation />} />
        <Route path="/insertPlantation" element={< InsertParcelleCulture />} />
        <Route path="/historique" element={< Historique />} />
        <Route path="/discussion" element={< Discussion />} />
      </Routes>
    </Router>
  );
}

export default App;

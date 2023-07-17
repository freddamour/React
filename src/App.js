// Importation des dépendances nécessaires
import React from 'react';

import ProjetFlutter from './Projets/ProjetFlutter/ProjetFlutter';
import ProjetJPO from './Projets/ProjetJPO/ProjetJPO';

// Création de la fonction principale de l'application
function App() {
  
  return (
    <div className="app">
      <div><h1>ProjetJPO</h1></div>
      <ProjetJPO></ProjetJPO>
      
      <div><h1>ProjetFlutter</h1></div>
      <ProjetFlutter></ProjetFlutter>
      
    </div>
  );
}

// Exportation de la fonction App comme module par défaut
export default App;

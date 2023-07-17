// Importation des dépendances nécessaires
import React, { useState, useEffect, useRef } from 'react';
import './ProjetFlutter.css';  // Importation du fichier CSS

// Création de la fonction principale de l'application
function ProjetFlutter() {
  // Déclaration des variables d'état pour les données, le chargement et les erreurs
  const [donnees, setDonnees] = useState(null);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState(null);
  const refCartes = useRef([]);

  // Utilisation de useEffect pour charger les données à partir d'un lien externe lors du montage du composant
  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/10M2wjchky-Vq7Ivl70dbODdfavX97q5ukuk65-UnvFM/gviz/tq?tqx=out:json&sheet=0')
      .then(reponse => reponse.text())
      .then(donnees => {
        // Suppression du préambule et de la virgule finale
        const json = JSON.parse(donnees.substr(47).slice(0, -2));
        // Mise à jour des données
        setDonnees(json.table.rows.map(ligne => {
          const enregistrement = {};
          ligne.c.forEach((cellule, i) => {
            enregistrement[json.table.cols[i].label] = cellule ? cellule.v : null;
          });
          return enregistrement;
        }));
        // Arrêt du chargement
        setChargement(false);
      })
      .catch(erreur => {
        // Affichage de l'erreur
        console.error('Erreur:', erreur);
        setErreur(erreur);
        setChargement(false);
      });
  }, []);

  // Utilisation de useEffect pour gérer l'animation de défilement
  useEffect(() => {
    const gererDefilement = () => {
      refCartes.current.forEach((carte, i) => {
        const rect = carte.getBoundingClientRect();
        if (rect.top <= window.innerHeight - rect.height / 2) {
          carte.classList.add('animation-defilement');
        }
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
          carte.classList.remove('animation-defilement');
        }
      });
    };
    window.addEventListener('scroll', gererDefilement);
    return () => window.removeEventListener('scroll', gererDefilement);
  }, []);

  // Affichage du chargement ou de l'erreur si nécessaire
  if (chargement) return 'Chargement en cours...';
  if (erreur) return 'Erreur lors du chargement des données';

  // Affichage des données récupérées
  return (
    <div className="ProjetFlutter">
      
      {donnees.map((enregistrement, index) => (
        <div key={index} className="carte" ref={el => refCartes.current[index] = el}>
          <img src={enregistrement['Image 1']} alt={enregistrement.Nom} />
          <h2>{enregistrement.Nom}</h2>
          <p>{enregistrement.Description}</p>
          <p><span>Lieu :</span> {enregistrement.Lieu}</p>
          <p><span>Bâtiment :</span> {enregistrement['Bâtiment']}</p>
          <p><span>Horaire :</span> {enregistrement.Horaire}</p>
          <a href={enregistrement.Ressources}>Plus d'infos</a>
        </div>
      ))}
    </div>
  );
}

// Exportation de la fonction App comme module par défaut
export default ProjetFlutter;

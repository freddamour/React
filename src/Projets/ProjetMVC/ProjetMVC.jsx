import React from 'react';
import { useQuery } from 'react-query';
import { fetchDonnees } from './DataService';
import Carte from './Carte';
import 'bootstrap/dist/css/bootstrap.min.css';
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';

function ProjetMVC() {
  const { data, error, isLoading } = useQuery('fetchDonnees', fetchDonnees);

  if (isLoading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">Erreur lors du chargement des données</Alert>;

  return (
    <div className="ProjetFlutter">
      {data.map((enregistrement, index) => (
        <Carte key={index} enregistrement={enregistrement} />
      ))}
    </div>
  );
}

export default ProjetMVC;

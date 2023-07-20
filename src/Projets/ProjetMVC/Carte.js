import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const Carte = ({enregistrement}) => (
  <Card style={{ width: '18rem' }}>
    <Card.Img variant="top" src={enregistrement['Image 1']} alt={enregistrement.Nom} />
    <Card.Body>
      <Card.Title>{enregistrement.Nom}</Card.Title>
      <Card.Text>
        {enregistrement.Description}
        <br/>
        <strong>Lieu :</strong> {enregistrement.Lieu}
        <br/>
        <strong>Bâtiment :</strong> {enregistrement['Bâtiment']}
        <br/>
        <strong>Horaire :</strong> {enregistrement.Horaire}
      </Card.Text>
      <Button variant="primary" href={enregistrement.Ressources}>Plus d'infos</Button>
    </Card.Body>
  </Card>
);

export default Carte;

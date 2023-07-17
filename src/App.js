import React, { useState, useEffect, useRef } from 'react';
import './App.css';  // Import the CSS file

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    fetch('https://docs.google.com/spreadsheets/d/10M2wjchky-Vq7Ivl70dbODdfavX97q5ukuk65-UnvFM/gviz/tq?tqx=out:json&sheet=0')
      .then(response => response.text())
      .then(data => {
        // Strip prelude and trailing ','
        const json = JSON.parse(data.substr(47).slice(0, -2));
        setData(json.table.rows.map(row => {
          const record = {};
          row.c.forEach((cell, i) => {
            record[json.table.cols[i].label] = cell ? cell.v : null;
          });
          return record;
        }));
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      cardsRef.current.forEach((card, i) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= window.innerHeight - rect.height / 2) {
          card.classList.add('scroll-animation');
        }
        if (rect.bottom <= 0 || rect.top >= window.innerHeight) {
          card.classList.remove('scroll-animation');
        }
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) return 'Loading...';
  if (error) return 'Error loading data';

  return (
    <div className="app">
      {data.map((record, index) => (
        <div key={index} className="card" ref={el => cardsRef.current[index] = el}>
          <img src={record['Image 1']} alt={record.Nom} />
          <h2>{record.Nom}</h2>
          <p>{record.Description}</p>
          <p><span>Lieu:</span> {record.Lieu}</p>
          <p><span>Bâtiment:</span> {record['Bâtiment']}</p>
          <p><span>Horaire:</span> {record.Horaire}</p>
          <a href={record.Ressources}>Plus d'infos</a>
        </div>
      ))}
    </div>
  );
}

export default App;

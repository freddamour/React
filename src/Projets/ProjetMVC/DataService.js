import axios from 'axios';

export const fetchDonnees = async () => {
  const response = await axios.get('https://docs.google.com/spreadsheets/d/10M2wjchky-Vq7Ivl70dbODdfavX97q5ukuk65-UnvFM/gviz/tq?tqx=out:json&sheet=0');
  const donnees = response.data;
  const json = JSON.parse(donnees.substr(47).slice(0, -2));

  return json.table.rows.map(ligne => {
    const enregistrement = {};
    ligne.c.forEach((cellule, i) => {
      enregistrement[json.table.cols[i].label] = cellule ? cellule.v : null;
    });
    return enregistrement;
  });
};

  
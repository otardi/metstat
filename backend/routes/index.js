const mysql = require('mysql2/promise');

var express = require('express');
var router = express.Router();

/* Infos de connexion */
const pool = mysql.createPool({
    host: 'localhost',
    user: 'adminer',
    password: 'abcd-1234',
    database: 'metro'
});

function connect() {
  
}

/* Page principale */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



/* Composant Top5Stations */
router.get('/top5stations', async function (req, res, next) {

  const query = `select station.id,station.nom, count(*) as nb
from station join incident
on station.id = incident.idstation
group by station.nom
order by nb desc limit 5;`

    try {
        // Se connecter
        const connection = await pool.getConnection();

        // Lancer la requête
        const [rows, fields] = await connection.execute(query);

        // Se déconnecter
        connection.release();

        // Passer les résultats à l'objet de réponse
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
});



/* Composant PieCauses */
router.get('/piecauses', async function (req, res, next) {

  const query = `select typeCause.type as type, 
count(*) as nb from incident join cause on incident.idcause = cause.id
join typeCause on cause.idTypeCause = typeCause.id
group by type
order by nb desc;`;

  try {
      // Se connecter
      const connection = await pool.getConnection();

      // Lancer la requête
      const [rows, fields] = await connection.execute(query);

      // Se déconnecter
      connection.release();

      // Passer les résultats à l'objet de réponse
      res.json(rows);
  } catch (error) {
      console.error(error);
      res.status(500).send('Server error');
  }
});

module.exports = router;

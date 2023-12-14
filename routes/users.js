var express = require('express');
const db = require('../src/mysqlconnection');
var router = express.Router();

const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended: true}));

/* GET users listing. */
router.get('/', function(req, res, next) {

  db.query('SELECT * FROM contacto', (err, results) => {
    if(err) {
      console.log('NO SE HA PODIDO CARGAR LA BASE DE DATOS');
      throw err;
    }

    res.render('usuarios', {
      title: 'Aplicacion de Contactos',
      datos: results,
    });
  })
});


module.exports = router;

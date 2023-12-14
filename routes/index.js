var express = require('express');
const db = require('../src/mysqlconnection');
var router = express.Router();

const bodyparser = require('body-parser');
router.use(bodyparser.urlencoded({extended: true}));

/* GET home page. */
router.get('/', function(req, res, next) {

  db.query('SELECT * FROM contacto', (err, results) => {
    if(err) {
      console.log('NO SE HA PODIDO CARGAR LA BASE DE DATOS');
      throw err;
    }

    res.render('index', {
      title: 'Aplicacion de Contactos',
      datos: results,
    });
  })
});

// Solicitud POST
router.post('/agregar', function(req, res, next) {
  const {nombre, apellido, correo, numero} = req.body;

  if(!nombre || !apellido || !correo || !numero) {
    console.error('Ambos campos son obligatorios');
    res.status(400).send('Ambos campos son obligatorios');
    return;
  }

  db.query('INSERT INTO contacto (nombre, apellido, correo, numero) VALUES (?,?,?,?)', [nombre, apellido, correo, numero], (err, result) => {
    if(err) throw err;

    console.log('Se han agregado a los usuarios correctamente');
    res.redirect('/');
  })

});

router.get('/eliminar/:id', function(req, res, next) {
  const idusuario = req.params.id;
  parseInt(idusuario);

  if(isNaN(idusuario)) {
    console.error('Este ip no es un numero');
    return;
  };

  db.query('DELETE FROM contacto WHERE id = ?', [idusuario], (err, result) => {
    if(err) throw err;

    console.log('SE HA ELIMINADO EL USUARIO CORRECTAMENTE');
    res.redirect('/');
  })
});

router.get('/editar/:id', function(req, res, next) {

  const iduser = req.params.id;
  db.query('SELECT * FROM contacto WHERE id = ?', [iduser], (err, results) => {
    if(err) {
      console.log('NO SE HA PODIDO CARGAR LA BASE DE DATOS');
      throw err;
    }

    res.render('editar', {
      title: 'Aplicacion de Contactos',
      datos: results[0],
    });
  })
});

router.post('/editar/:id/edit', function(req, res, next) {
  const iduser = req.params.id;

  const {nombre, apellido, correo, numero} = req.body;

  db.query('UPDATE contacto SET nombre=?, apellido=?, correo=?, numero=? WHERE id=?', [nombre, apellido, correo, numero, iduser], (err, results) => {
    if(err) throw err;

    console.log('SE HAN APLICADO LOS CAMBIOS');
    res.redirect('/');

  })
})


module.exports = router;

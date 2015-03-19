var express = require('express');
var router = express.Router();

router.get('/cliente', function(req, res) {
  res.render('cliente/buscar', { title: 'aqui vemos las salas disponibles' });
});

router.get('/cliente:sala', function(req, res) {
  res.render('cliente/juego', { title: 'esto es un juego' });
});

module.exports = router;

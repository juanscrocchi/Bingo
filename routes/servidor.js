var express = require('express');
var router = express.Router();

router.get('/servidor', function(req, res) {
  res.render('servidor/crear', { title: 'aqui creamos una sala' });
});

router.get('/servidor:sala', function(req, res) {
  res.render('servidor/juego', { title: 'esto es un juego' });
});

module.exports = router;

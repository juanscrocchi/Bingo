var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('cliente/buscar', { title: 'aqui vemos las salas disponibles' });
});

router.get('/:sala', function(req, res) {
	var salaid = req.params.sala;
  	res.render('cliente/juego', { title: salaid });
});

module.exports = router;

var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.render('servidor/crear', { title: 'aqui creamos una sala' });
});

router.get('/:sala', function(req, res) {
	var salaid = req.params.sala;
  	res.render('servidor/juego', { title: salaid });
});

module.exports = router;

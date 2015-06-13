var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');			// importa el enrutador quiz_controller.js para control de la ruta

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });								// cuando renderice la vista index le pasa el objeto title: 'Quiz'
});

router.get('/quizes/question', quizController.question);				// controla las peticiones GET a /quizes/question segun el enrutador quiz_controller.js
router.get('/quizes/answer', quizController.answer);					// controla las peticiones GET a /quizes/answer segun el enrutador quiz_controller.js
																		// question y answer son las variables analizdas en quiz_controller.js

router.get('/profile/author', function(req, res) {
	res.render('profile/author', { title: 'Autor' });					// visualiza el autor
});

module.exports = router;
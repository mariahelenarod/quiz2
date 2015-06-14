var express = require('express');
var router = express.Router();
var quizController = require('../controllers/quiz_controller');			// importa el enrutador quiz_controller.js para control de la ruta

/* GET home page. */
router.get('/', function(req, res) {
	res.render('index', { title: 'Quiz' });								// cuando renderice la vista index le pasa el objeto title: 'Quiz'
});

// router.get('/quizes/question', quizController.question);				// controla las peticiones GET a /quizes/question segun el enrutador quiz_controller.js
// router.get('/quizes/answer', quizController.answer);					// controla las peticiones GET a /quizes/answer segun el enrutador quiz_controller.js

router.get('/quizes',			 				quizController.index);			// accede a la lista completa de preguntas
router.get('/quizes/:quizId(\\d+)',				quizController.show);			// accede a una pregunta en concreto. envia al quizController la peticion GET con el parametro quizId (indice)
router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);			// se dispara cuando submit del form question.ejs hacia la ruta /quizes/answer. le pasa el id en la peticion GET req




router.get('/profile/author', function(req, res) {
	res.render('profile/author', { title: 'Autor' });					// visualiza el autor
});

module.exports = router;
	
	var express = require('express');
	var router = express.Router();
	var quizController = require('../controllers/quiz_controller');			// importa el enrutador quiz_controller.js para control de la ruta

	/* GET home page. */
	router.get('/', function(req, res) {
		res.render('index', {title: 'Quiz', errors: []});								// cuando renderice la vista index.ejs le pasa el objeto title: 'Quiz'
	});

	// autoload de comandos con :quizId
	router.param('quizId', quizController.load);									// peticiones GET con SQL :quizId

	router.get('/quizes',			 				quizController.index);			// accede a la lista completa de preguntas /quizes/index.ejs
	router.get('/quizes/:quizId(\\d+)',				quizController.show);			// accede a una pregunta en concreto. envia al quizController la peticion GET con el parametro quizId (indice)
	router.get('/quizes/:quizId(\\d+)/answer',		quizController.answer);			// se dispara cuando submit del form question.ejs hacia la ruta /quizes/answer. le pasa el id en la peticion GET req

	router.get('/quizes/new',						quizController.new);			// carga el formulario /quizes/new
	router.post('/quizes/create',					quizController.create);			// carga el formulario /quizes/create cuando el boton <salvar> del formulario new

	router.get('/profile/author', function(req, res) {
		res.render('profile/author', {title: 'Autor', errors: []});					// visualiza el autor
	});

	module.exports = router;
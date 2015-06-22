	
	var express = require('express');
	var router = express.Router();
	var quizController = require('../controllers/quiz_controller');						// importa el controlador quiz_controller.js
	var commentController = require('../controllers/comment_controller');				// importa el controlador comment_controller.js
	var sessionController = require('../controllers/session_controller');				// importa el controlador session_controller.js
	
	router.get('/', function(req, res) {												/* GET home page. */
		res.render('index', {title: 'Quiz', errors: []});								// cuando renderice la vista index.ejs le pasa el objeto title: 'Quiz'
	});

	router.param('quizId', 								quizController.load);			// autoload de comandos. peticiones GET con SQL :quizId
																						// Definición de rutas de sesion
	router.get('/login',  								sessionController.new);     	// formulario login
	router.post('/login', 								sessionController.create);  	// crear sesión
	router.get('/logout', 								sessionController.destroy); 	// destruir sesión

	router.get('/quizes',			 					quizController.index);			// accede a la lista completa de preguntas /quizes/index.ejs
	router.get('/quizes/:quizId(\\d+)',					quizController.show);			// accede a una pregunta en concreto. envia al quizController la peticion GET con el parametro quizId (indice)
	router.get('/quizes/:quizId(\\d+)/answer',			quizController.answer);			// se dispara cuando submit del form question.ejs hacia la ruta /quizes/answer. le pasa el id en la peticion GET req

	router.get('/quizes/new',							quizController.new);			// carga el formulario /quizes/new
	router.post('/quizes/create',						quizController.create);			// dispara controlador create cuando el boton <salvar> del formulario new.js

	router.get('/quizes/:quizId(\\d+)/edit',			quizController.edit);			// carga formulario quizes/quizes:Id(\\d+)/edit y dispara el controlador edit de quiz_Controller
	router.put('/quizes/:quizId(\\d+)',					quizController.update);			// dispara controlador update cuando el boton <salvar> del formulario edit.js
	router.delete('/quizes/:quizId(\\d+)',				quizController.destroy);
	
	router.get('/quizes/:quizId(\\d+)/comments/new',	commentController.new);			// carga formulario /quizes/:quizId(\\d+)/comments/new y dispara el controlador new de comment_Controller
	router.post('/quizes/:quizId(\\d+)/comments',		commentController.create);		// dispara controlador create cuando el boton <enviar> del formulario /comments/new.ejs
	
	router.get('/profile/author', function(req, res) {
		res.render('profile/author', {title: 'Autor', errors: []});						// visualiza el autor
	});

	module.exports = router;	

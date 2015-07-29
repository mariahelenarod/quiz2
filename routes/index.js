	
	var express = require('express');
	var multer = require('multer');
	var router = express.Router();
	var quizController = require('../controllers/quiz_controller');						// importa el controlador quiz_controller.js
	var commentController = require('../controllers/comment_controller');				// importa el controlador comment_controller.js
	var sessionController = require('../controllers/session_controller');				// importa el controlador session_controller.js
	var statisticsController = require('../controllers/statistic_controller');
	var dbController = require('../controllers/db_controller');
	
	
	router.get('/', function(req, res) {												/* GET home page. */
		res.render('index', {title: 'Quiz', errors: []});								// cuando renderice la vista index.ejs le pasa el objeto title: 'Quiz'
	});

	router.param('quizId', 								quizController.load);			// autoload de comandos. peticiones GET con SQL :quizId
	router.param('commentId',							commentController.load);
																						// Definición de rutas de sesion
	router.get('/login',  								sessionController.new);     	// formulario login
	router.post('/login', 								sessionController.create);  	// crear sesión
	router.get('/logout', 								sessionController.destroy); 	// destruir sesión

	router.get('/quizes',			 					quizController.index);			// accede a la lista completa de preguntas /quizes/index.ejs
	router.get('/quizes/:quizId(\\d+)',					quizController.show);			// accede a una pregunta en concreto. envia al quizController la peticion GET con el parametro quizId (indice)
	router.get('/quizes/:quizId(\\d+)/answer',			quizController.answer);			// se dispara cuando submit del form question.ejs hacia la ruta /quizes/answer. le pasa el id en la peticion GET req

	router.get('/quizes/new',							sessionController.loginRequired, quizController.new);							// carga el formulario /quizes/new si sessionController.loginRequired()
	router.post('/quizes/create',						sessionController.loginRequired, 
														// multer({ dest: './public/media/'}), 
														quizController.create);	// dispara controlador create cuando el boton <salvar> del formulario new.js

	router.get('/quizes/:quizId(\\d+)/edit',			sessionController.loginRequired, quizController.edit);							// carga formulario quizes/quizes:Id(\\d+)/edit y dispara el controlador edit de quiz_Controller
	router.put('/quizes/:quizId(\\d+)',					sessionController.loginRequired, 
														// multer({ dest: './public/media/'}), 
														quizController.update);	// dispara controlador update cuando el boton <salvar> del formulario edit.js
	router.delete('/quizes/:quizId(\\d+)',				sessionController.loginRequired, quizController.destroy);
	
	router.get('/quizes/:quizId(\\d+)/comments/new',						commentController.new);											// carga formulario /quizes/:quizId(\\d+)/comments/new y dispara el controlador new de comment_Controller
	router.post('/quizes/:quizId(\\d+)/comments',							commentController.create);										// dispara controlador create cuando el boton <enviar> del formulario /comments/new.ejs
	router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish',   sessionController.loginRequired, commentController.publish);	//   
	
	router.get('/temas',			 					quizController.showtemas);
	router.get('/temas/:tema', 							quizController.showbytema);
	
	router.get('/profile/author', function(req, res) {
		res.render('profile/author', {title: 'Autor', errors: []});						// visualiza el autor
	});
	
	router.get('/quizes/statistics',					statisticsController.calculate, statisticsController.show);

//	router.get('/db/index',								dbController.show);

	module.exports = router;	
	
	
	
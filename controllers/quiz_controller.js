
var models = require('../models/models.js');

exports.question = function(req, res) {									// GET /quizes/question
//	res.render('quizes/question', {pregunta: 'Capital de Italia'});		// renderiza /views/question.ejs con el objeto pregunta
	models.Quiz.findAll().then(function(quiz) {							
		res.render('quizes/question', {pregunta: quiz[0].pregunta})
	})
};

exports.index = function(req, res) {	
	models.Quiz.findAll().then(function(quizes) {
		res.render('quizes/index.ejs', {quizes: quizes});				// findAll() renderiza toda la lista de preguntas que se genera en /quizes/index.ejs
	})
};

exports.show = function(req, res) {										// GET /quizes/:id
	models.Quiz.find(req.params.quizId).then(function(quiz) {			// find() seleciona en la tabla Quiz req.params.quizId y lo pasa como argumento quiz a la funcion
		res.render('quizes/show', {quiz: quiz});						// renderiza la vista /quizes/show del quizId selecionado con find()
	})									          						// req.quiz: instancia de quiz cargada con autoload
};
	
exports.answer = function(req, res) {									// GET /quizes/answer/:id
	models.Quiz.find(req.params.quizId).then(function(quiz) {			
		if (req.query.respuesta === quiz.respuesta) {					// comprueba la variable respuesta de la peticion GET req recibida del form question.ejs vs quiz.respuesta, que es la respuesta que devuelve find()
			res.render('quizes/answer', 
				{quiz: quiz, respuesta: 'Correcto'}						// renderiza /views/answer.ejs con el objeto quiz y respuesta
			);		
		} else {
			res.render('quizes/answer', 
				{quiz: quiz, respuesta: 'Incorrecto'}
			);
		};

	})
};



var models = require('../models/models.js');

exports.question = function(req, res) {										// GET /quizes/question
//	res.render('quizes/question', {pregunta: 'Capital de Italia'});			// renderiza /views/question.ejs con el objeto pregunta
	models.Quiz.findAll().then(function(quiz) {							// findAll()
		res.render('quizes/question', {pregunta: quiz[0].pregunta})
	})
};

exports.answer = function(req, res) {	
	models.Quiz.findAll().then(function(quiz) {							// GET /quizes/answer
		if (req.query.respuesta === quiz[0].respuesta) {					// comprueba la variable respuesta de la peticion GET req en el form question.ejs
			res.render('quizes/answer', {respuesta: 'Correcto'});			// renderiza /views/answer.ejs con el objeto respuesta
		} else {
			res.render('quizes/answer', {respuesta: 'Incorrecto'});
		};

	})
};
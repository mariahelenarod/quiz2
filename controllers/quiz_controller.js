
var models = require('../models/models.js');

// autoload. solo se ejecuta si en la peticion GET existe un :quizId. ayuda a factorizar el codigo del resto de controladores 
exports.load = function(req, res, next, quizId) {
	models.Quiz.find(quizId).then(						//si find() tiene exito
		function(quiz) {
			if (quiz) {
				req.quiz = quiz;
				next();
			} else {
				next(new Error('No existe quizId=' + quiz[id]));
			}
		}
	).catch(function(error) {next(error);});
};


/* exports.question = function(req, res) {									// GET /quizes/question
//	res.render('quizes/question', {pregunta: 'Capital de Italia'});		// renderiza /views/question.ejs con el objeto pregunta
	models.Quiz.findAll().then(function(quiz) {							
		res.render('quizes/question', {pregunta: quiz[0].pregunta})
	})
}; */

exports.index = function(req, res) {					// GET /quizes	
	var search = '%' + (req.query.search || '').replace(/ /g,'%') + '%';    // con req de la peticion GET monta la ruta + el valor introducido de req.query.search
	if (req.query.search) {
		models.Quiz.findAll({where: ["pregunta like ?", search], order:'pregunta'}).then(
			function(quizes) {
				res.render('quizes/index.ejs', {quizes: quizes});			// findAll() renderiza toda la lista de preguntas que se genera en /quizes/index.ejs
			}
		)
	} else {
		models.Quiz.findAll().then(
			function(quizes) {
				res.render('quizes/index.ejs', {quizes: quizes});			// findAll() renderiza toda la lista de preguntas que se genera en /quizes/index.ejs
			}
		).catch(function(error) {next(error);});
	};
};

exports.show = function(req, res) {										// GET /quizes/:id
//	models.Quiz.find(req.params.quizId).then(function(quiz) {			// find() seleciona en la tabla Quiz req.params.quizId y lo pasa como argumento quiz a la funcion
		res.render('quizes/show', {quiz: req.quiz});					// renderiza la vista /quizes/show del quizId selecionado con load find()
};									          							// req.quiz: instancia de quiz cargada con autoload

	
exports.answer = function(req, res) {									// GET /quizes/answer/:id
	var resultado = 'Incorrecto';			
	if (req.query.respuesta === req.quiz.respuesta) {					// comprueba la variable respuesta de la peticion GET req recibida del form question.ejs vs req.quiz.respuesta, que es la respuesta que devuelve find() del autoload
		resultado = 'Correcto';											// renderiza /views/answer.ejs con el objeto quiz y respuesta
	};
	res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};


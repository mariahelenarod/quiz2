
exports.question = function(req, res) {									// renderiza /views/question.ejs con el objeto pregunta
	res.render('quizes/question', {pregunta: 'Capital de Italia'});
};

exports.answer = function(req, res) {
	if (req.query.respuesta.toLowerCase() === 'roma') {					// comprueba la variable respuesta de la peticion GET req en el form question.ejs
		res.render('quizes/answer', {respuesta: 'Correcto'});			// renderiza /views/answer.ejs con el objeto respuesta
	} else {
		res.render('quizes/answer', {respuesta: 'Incorrecto'});
	};
};
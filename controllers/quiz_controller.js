
	var models = require('../models/models.js');

	exports.load = function(req, res, next, quizId) {			// autoload. solo se ejecuta si en la peticion GET existe un :quizId. ayuda a factorizar el codigo del resto de controladores 
		models.Quiz.find(quizId).then(							//si find() tiene exito
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

	exports.index = function(req, res) {										// GET /quizes	
		var search = '%' + (req.query.search || '').replace(/ /g,'%') + '%';    // con req de la peticion GET monta la ruta + el valor introducido de req.query.search
		if (req.query.search) {
			models.Quiz.findAll({where: ["pregunta like ?", search], order:'pregunta ASC'}).then(    		// findAll() selecciona con sql
				function(quizes) {
					res.render('quizes/index.ejs', {quizes: quizes, errors: []});			
				}
			)
		} else {
			models.Quiz.findAll().then(
				function(quizes) {
					res.render('quizes/index.ejs', {quizes: quizes, errors: []});		// findAll() renderiza toda la lista de preguntas que se genera en /quizes/index.ejs
				}
			).catch(function(error) {next(error);});
		};
	};

	exports.show = function(req, res) {										// GET /quizes/:id
	//	models.Quiz.find(req.params.quizId).then(function(quiz) {			// find() seleciona en la tabla Quiz req.params.quizId y lo pasa como argumento quiz a la funcion
			res.render('quizes/show', {quiz: req.quiz, errors: []});					// renderiza la vista /quizes/show del quizId selecionado con load find()
	};									          							// req.quiz: instancia de quiz cargada con autoload

	exports.answer = function(req, res) {									// GET /quizes/answer/:id
		var resultado = 'Incorrecto';			
		if (req.query.respuesta === req.quiz.respuesta) {					// comprueba la variable respuesta de la peticion GET req recibida del form question.ejs vs req.quiz.respuesta, que es la respuesta que devuelve find() del autoload
			resultado = 'Correcto';											
		};
		res.render('quizes/answer', {
			quiz: req.quiz, 
			respuesta: resultado,
			errors: []
		});																	// renderiza /views/answer.ejs con el objeto quiz y respuesta
	};

	exports.new = function(req, res) {										// GET /quizes/new, baja el formulario
		var quiz = models.Quiz.build( 										// crea el objeto quiz, lo construye con buid() metodo de sequilize
			{pregunta: "Pregunta", respuesta: "Respuesta"}					// asigna literales a los campos pregunta y respuestas para que se vea el texto en el <input> cuando creemos el formulario
		);
		res.render('quizes/new', {quiz: quiz, errors: []});					// renderiza la vista quizes/new
	};

/*	exports.create = function(req, res) {									// POST /quizes/create. cuando submit del formulario new.ejs
		var quiz = models.Quiz.build( req.body.quiz );
		quiz.validate().then(												// validacion del campo
			function(err) {
				if (err) {
					res.render('quizes/new', {quiz: quiz, errors: err.errors});
				} else {
					quiz.save({fields: ["pregunta", "respuesta"]}).then(				// save: guarda en DB campos pregunta y respuesta de quiz
						function() {res.redirect('/quizes')}
					)
				}
			}
		);
	}; */
	
		// POST /quizes/create ----->>>> alternativo         
	exports.create = function(req, res) {
		var quiz = models.Quiz.build( req.body.quiz );
		var errors = quiz.validate();											// objeto errors no tiene then(
		if (errors) {
			var i = 0; 
			var errores = new Array();											// se convierte en [] con la propiedad message por compatibilidad con layout
			for (var prop in errors) errores[i++] = {message: errors[prop]};        
			res.render('quizes/new', {quiz: quiz, errors: errores});
		} else {
			quiz 																// save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta", "tema"]})
			.then(function() {res.redirect('/quizes')});
		}
	};
	
	exports.edit = function(req, res) {											// carga formulario edit.ejs
		var quiz = req.quiz;													// req.quiz viene del autoload
		res.render('quizes/edit', {quiz: quiz, errors: []});
	};
	
	exports.update = function(req, res) {										// modifica un quiz
		req.quiz.pregunta = req.body.quiz.pregunta;
		req.quiz.respuesta = req.body.quiz.respuesta;
		req.quiz.respuesta = req.body.quiz.tema;
		var errors = req.quiz.validate();											
		if (errors) {
			var i = 0; 
			var errores = new Array();												// se convierte en [] con la propiedad message por compatibilidad con layout
			for (var prop in errors) errores[i++] = {message: errors[prop]};        
			res.render('quizes/edit', {quiz: req.quiz, errors: errores});
		} else {
			req.quiz 																// save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta", "tema"]})
			.then(function() {res.redirect('/quizes')});
		}
	};
	
	exports.destroy = function(req, res) {
		req.quiz.destroy().then(function() {
			res.redirect('/quizes');
		}).catch(function(error) {next(error)});
	};
		
	
	
	
	
	
	
	
	
	
	
	
	
	
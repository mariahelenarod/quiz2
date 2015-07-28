
	var models = require('../models/models.js');

	exports.load = function(req, res, next, quizId) {			// autoload. solo se ejecuta si en la peticion GET existe un :quizId. ayuda a factorizar el codigo del resto de controladores 
		models.Quiz.find({										// carga de registro quiz
			where: 		{id: Number(quizId)},					// where indice principal id <-- quizId recibido del GET
			include: 	[{model: models.Comment}]				// incluye la tabla Comment como hijo
			}).then(function(quiz) {
				if (quiz) {
					req.quiz = quiz;
					next();
				} else {
					next(new Error('No existe quizId=' + quiz[id]));
				}
			}
		).catch(function(error) {next(error);});
	};

	exports.index = function(req, res) {																	// GET /quizes	
		var search = '%' + (req.query.search || '').replace(/ /g,'%') + '%';    							// con req de la peticion GET monta la ruta + el valor introducido de req.query.search
		if (req.query.search) {
			models.Quiz.findAll({where: ["pregunta like ?", search], order:'pregunta ASC'}).then(    		// findAll() selecciona con sql
				function(quizes) {
					res.render('quizes/index.ejs', {quizes: quizes, errors: []});			
				}
			)
		} else {
			models.Quiz.findAll().then(
				function(quizes) {
					res.render('quizes/index.ejs', {quizes: quizes, errors: []});			// findAll() renderiza toda la lista de preguntas que se genera en /quizes/index.ejs
				}
			).catch(function(error) {next(error);});
		};
	};

	exports.show = function(req, res) {											// GET /quizes/:id
		res.render('quizes/show', {quiz: req.quiz, errors: []});				// renderiza la vista /quizes/show del quizId selecionado con load find()
	};									          								// req.quiz: instancia de quiz cargada con autoload
	
	exports.answer = function(req, res) {										// GET /quizes/answer/:id
		var resultado = 'Incorrecto';			
		if (req.query.respuesta === req.quiz.respuesta) {						// comprueba la variable respuesta de la peticion GET req recibida del form question.ejs vs req.quiz.respuesta, que es la respuesta que devuelve find() del autoload
			resultado = 'Correcto';											
		};
		res.render('quizes/answer', {
			quiz: req.quiz, 
			respuesta: resultado,
			errors: []
		});																		// renderiza /views/answer.ejs con el objeto quiz y respuesta
	};

	exports.new = function(req, res) {											// GET /quizes/new, baja el formulario
		var quiz = models.Quiz.build( 											// crea el objeto quiz, lo construye con buid() metodo de sequilize
			{pregunta: "Pregunta", respuesta: "Respuesta"}						// asigna literales a los campos pregunta y respuestas para que se vea el texto en el <input> cuando creemos el formulario
		);
		res.render('quizes/new', {quiz: quiz, errors: []});						// renderiza la vista quizes/new
	};

		        
	exports.create = function(req, res) {										// POST /quizes/create ----->>>> alternativo 	
/*		if (req.files.image) {
			req.body.quiz.image = req.files.image.name;
		}; */
		var quiz = models.Quiz.build( req.body.quiz );							// construccion de objeto quiz para luego introducir en la tabla
		var errors = quiz.validate();											// objeto errors no tiene then(
		if (errors) {
			var i = 0; 
			var errores = new Array();											// se convierte en [] con la propiedad message por compatibilidad con layout
			for (var prop in errors) errores[i++] = {message: errors[prop]};        
			res.render('quizes/new', {quiz: quiz, errors: errores});
		} else {
			quiz 																// save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta", "tema", "image"]})
			.then(function() {res.redirect('/quizes')});
		};
	};
	
	exports.edit = function(req, res) {											// carga formulario edit.ejs
		var quiz = req.quiz;													// req.quiz viene del autoload
		res.render('quizes/edit', {quiz: quiz, errors: []});
	};
	
	exports.update = function(req, res) {										// modifica un quiz
		req.quiz.pregunta = req.body.quiz.pregunta;
		req.quiz.respuesta = req.body.quiz.respuesta;
		req.quiz.tema = req.body.quiz.tema;
/*		if (req.files.image) {
			req.body.quiz.image = req.files.image.name;
		}; */
		var errors = req.quiz.validate();											
		if (errors) {
			var i = 0; 
			var errores = new Array();											// se convierte en [] con la propiedad message por compatibilidad con layout
			for (var prop in errors) errores[i++] = {message: errors[prop]};        
			res.render('quizes/edit', {quiz: req.quiz, errors: errores});
		} else {
			req.quiz 															// save: guarda en DB campos pregunta y respuesta de quiz
			.save({fields: ["pregunta", "respuesta", "tema", "image"]})
			.then(function() {res.redirect('/quizes')});
		};
	};
	
	exports.destroy = function(req, res) {
		req.quiz.destroy().then(function() {
			res.redirect('/quizes');
		}).catch(function(error) {next(error)});
	};
	
	exports.showtemas = function(req, res, next){
		models.Quiz.findAll(
			{
				attributes:['tema'],
				group: ['tema']	
			}
		).then(
			function(quizes) {
				res.render('temas/index', { quizes: quizes, errors: []});
			}
		).catch(function(error) { next(error)});
	};		

	exports.showbytema = function(req,res){
		tema = req.params.tema;
		console.log(req.params.tema);
		models.Quiz.findAll({
			where: {tema: req.params.tema}
		}).then(
			function(quizes) {
				res.render('temas/showbytema.ejs', { quizes: quizes, errors: []});
			}
		).catch(function(error) {next(error)});
	};
	
	
	
	
	
	
	
	
	
	
	
	
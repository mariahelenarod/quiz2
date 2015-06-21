
	////////////////////////////////////////////////////////////////////////////
	//  --> controlador de comentarios
	////////////////////////////////////////////////////////////////////////////

	var models = require('../models/models.js');

	exports.new = function(req, res) {														// GET /quizes/:quizId/comments/new, baja el formulario /views/comment.ejs
		res.render('comments/new.ejs', {quizid: req.params.quizId, errors: []});			// renderiza la vista comments/new del quiz -->> quizid: req.params.quizId
	};
	
	exports.create = function(req, res) {													// POST /quizes/:quizId/comments
		var comment = models.Comment.build({												// construccion objeto comment para lugego introducir en la tabla
			texto: req.body.comment.texto,													// texto que llega del formulario
			QuizId: req.params.quizId														// al comment se le pasa el quizId del quiz para establecer la integridad referencial entre Quiz y Comment. indice secundario de Comment
		});
		
		//comment.validate();											
		if (errors) {
			var i = 0; 
			var errores = new Array();												// se convierte en [] con la propiedad message por compatibilidad con layout
			for (var prop in errors) errores[i++] = {message: errors[prop]};        
			res.render('comments/new', {comment: comment, quizId: req.params.quizId, errors: errores});
		} else {
			comment 																// save: guarda en DB campos pregunta y respuesta de quiz
			.save()
			.then(function() {res.redirect('/quizes/' + req.params.quizId)});		
		};
	};

	exports.new = function(req, res) {																// Get /login   -- Formulario de login
		var errors = req.session.errors || {};
		req.session.errors = {};
		res.render('sessions/new', {errors: errors});
	};

	exports.create = function(req, res) {															// POST /login   -- Crear la sesion si usuario se autentica
		var login     = req.body.login;																// obtiene login de la solicitud
		var password  = req.body.password;
		var userController = require('./user_controller');
		userController.autenticar(login, password, function(error, user) {							// llamada al callback userController.autenticar().
			if (error) {  																			// si hay error retornamos mensajes de error de sesión
				req.session.errors = [{"message": 'Se ha producido un error: ' + error}];
				res.redirect("/login");        
				return;
			}
			req.session.user = {id:user.id, username:user.username, isAdmin:user.isAdmin};			// Crear req.session.user y guardar campos id y username. La sesión se define por la existencia de req.session.user
			res.redirect(req.session.redir.toString());												// redirección a path anterior a login
		});
	};
	
	exports.destroy = function(req, res) {															// DELETE /logout   -- Destruir sesion 
		delete req.session.user;
		res.redirect(req.session.redir.toString()); 												// redirect a path anterior a login
	};
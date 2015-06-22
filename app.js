	
	var express = require('express');
	var path = require('path');
	var favicon = require('serve-favicon');
	var logger = require('morgan');
	var cookieParser = require('cookie-parser');
	var bodyParser = require('body-parser');
	var partials = require('express-partials');             // paquete para manejar vistas parciales del layout.ejs
	var methodOverride = require('method-override');
	var session = require('express-session');

	var routes = require('./routes/index');
	// var users = require('./routes/users');

	var app = express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views'));
	app.set('view engine', 'ejs');

	app.use(partials());                                    	// instala el middleware que da soporte a vistas parciales

	app.use(favicon(__dirname + '/public/favicon.ico'));
	app.use(logger('dev'));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(cookieParser('Quiz2'));								// semilla que llevara la cookie
	app.use(session());
	app.use(methodOverride('_method'));							// para utilizar en edit.ejs y encapsular el post como put
	app.use(express.static(path.join(__dirname, 'public')));
	
	// Helpers dinamicos:
	app.use(function(req, res, next) {
		if (!req.session.redir) {								// si no existe lo inicializa
			req.session.redir = '/';
		}
		if (!req.path.match(/\/login|\/logout|\/user/)) { 		// guardar path en session.redir para despues de logout volver a la misma vista del login
			req.session.redir = req.path;						// req.path es le path de donde se hizo el login
		}
		res.locals.session = req.session;						// Hacer visible req.session en las vistas
		next();
	});

	app.use('/', routes);
	//app.use('/users', users);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});

	// error handlers

	// development error handler
	// will print stacktrace
	if (app.get('env') === 'development') {
		app.use(function(err, req, res, next) {
			res.status(err.status || 500);
			res.render('error', {
				message: err.message,
				error: err,
				errors: []
			});
		});
	};

	// production error handler
	// no stacktraces leaked to user
	app.use(function(err, req, res, next) {
		res.status(err.status || 500);
		res.render('error', {
			message: err.message,
			error: {},
			errors: []
		});
	});

	module.exports = app;
	// app.listen(3000);
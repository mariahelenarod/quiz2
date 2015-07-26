	
	// construye la DB y el modelo importando las estructuras de las tablas

	var path = require('path');

	// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
	// SQLite   DATABASE_URL = sqlite://:@:/
	var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
	var DB_name  = (url[6]||null);
	var user     = (url[2]||null);
	var pwd      = (url[3]||null);
	var protocol = (url[1]||null);
	var dialect  = (url[1]||null);
	var port     = (url[5]||null);
	var host     = (url[4]||null);
	var storage  = process.env.DATABASE_STORAGE;

	var Sequelize = require('sequelize');								// crea objeto de la clase modelo ORM
	
	var sequelize = new Sequelize(DB_name, user, pwd, 					// Usar BBDD SQLite o Postgres. Constructor de la DB
	  { dialect:  protocol,
		protocol: protocol,
		port:     port,
		host:     host,
		storage:  storage,  											// solo SQLite (.env)
		omitNull: true      											// solo Postgres
	  }      
	);
	
	var Quiz = sequelize.import(path.join(__dirname, 'quiz'));			// importar estructura y definicion de la tabla Quiz
	var Comment = sequelize.import(path.join(__dirname, 'comment'));	// importar estructura y definicion de la tabla Comment
	
	Comment.belongsTo(Quiz);											// integridad referncial. Cada Comment es hijo de Quiz
	Quiz.hasMany(Comment);												// el padre puede tener varios hijos

	exports.Quiz = Quiz;												// exportar tablas
	exports.Comment = Comment;

	sequelize.sync().then(function() {									// sequelize.sync() inicializa tabla de preguntas en DB 
		Quiz.count().then(function(count) {								// success ejecuta el manejador cuando crea la tabla. Quiz.count().success() devuelve el numero de filas
			if (count === 0) {											// se inicializa solo si esta vacia
				Quiz.create({
					pregunta: 'Capital de Italia',
					respuesta: 'Roma',
					tema: 'Geografía',
					image: 'jota.jpg'
				});
				Quiz.create({
					pregunta: 'Capital de Portugal',
					respuesta: 'Lisboa',
					tema: 'Geografía',
					image: 'jota.jpg'
				})
				.then(function() {console.log('Base creada')});
			};
		});
	});
	
	
	
	
	
	
	
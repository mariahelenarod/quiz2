// construye la DB y el modelo importando la estructura desde quiz.js

var path = require('path');

var Sequelize = require('sequelize');								// crea objeto de la clase modelo ORM

var sequelize = new Sequelize(null, null, null, 					// Usar BBDD SQLite o Postgres. constructor del obejto tabla sequelize
	{ dialect:  'sqlite',
      storage:  'quiz.sqlite'  											// solo SQLite (.env)
  	}     
);

var Quiz = sequelize.import(path.join(__dirname, 'quiz'));			// importar estructura y definicion de la tabla Quiz

exports.Quiz = Quiz;												// exportar tablas

sequelize.sync().then(function() {									// sequelize.sync() inicializa tabla de preguntas en DB
	Quiz.count().then(function(count) {							// success ejecuta el manejador cuando crea la tabla. Quiz.count().success() devuelve el numero de filas
		if (count === 0) {											// se inicializa solo si esta vacia
			Quiz.create({
				pregunta: DataTypes.STRING,
		  		respuesta: DataTypes.STRING
			}).then(function() {console.log('Base creada')});
		};
	});
});
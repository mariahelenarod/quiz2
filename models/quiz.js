// Definicion de modelo

module.exports = function(sequelize, DataTypes) {			// crea la estructura de la tabla
	return sequelize.define('Quiz',
		{ pregunta: DataTypes.STRING,
		  respuesta: DataTypes.STRING
		}
	);
};

	// Definicion de modelo

	module.exports = function(sequelize, DataTypes) {			// crea la estructura de la tabla
		return sequelize.define('Comment', { 
			comment: {
				type: DataTypes.STRING,
				validate: {notEmpty: {msg: "--> Falta Comentario"}}
			}
		})
	};
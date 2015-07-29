
	var models = require('../models/models.js');

	exports.show = function(req, res, next) {
		Promise.all([
			models.Quiz.count(),
			models.Comment.count()
/*			models.Quiz.findAll({
				include: [{
					model: models.Comment
				}]
			}) */
		]).then(function(results) {
			res.render('db/index', {results: results, errors: []});

		});
	};
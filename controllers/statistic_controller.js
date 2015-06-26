
	var models = require('../models/models.js');
	
	// var errors = [];
	
	
	
	exports.calculate = function(req, res, next) {
		var statistic = {
			questions: 0,
			comments: 0,
			average_comments: 0,
			no_commented: 0,
			commented_questions: 0
		};
		models.Quiz.count()
		.then(function(questions) {
			statistic.questions = questions;
			return models.Quiz.count();
		}).catch(function(error) {next(error)});
	};
	
	exports.show = function(req, res) {
		res.render('statistics/show', {statistics: statistics, errors: []});
	};
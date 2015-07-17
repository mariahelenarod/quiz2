
	var models = require('../models/models.js');
	
	var statistics = {
		questions: 0,
		comments: 0,
		average_comments: 0,
		no_commented: 0,
		commented_questions: 0
	};
	
	exports.calculate = function(req, res, next) {
		models.Quiz.count()
		.then(function(questions) {
			statistics.questions = questions;
			return statistics.questions;})
		.then(function(comments) {
			statistics.comments = comments;
			return statistics.comments;})
		.catch(function(error) {next(error)})
		.finally(function() {next()});		
	};
	
	exports.show = function(req, res) {
		res.render('quizes/statistics', {statistics: statistics, errors: []});
	};
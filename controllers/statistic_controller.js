
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
		.then(function(average_comments) {
			statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);
			return statistics.average_comments;})
		.then(function(no_commented) {
			if (!models.Comment.length) {
				no_commented++;
			}
			return statistics.no_commented;})
		.then(function(commented_questions) {
			if (models.Comment.length) {
				commented_questions++;
			}
			return statistics.commented_questions;})
		.catch(function(error) {next(error)})
		.finally(function() {next()});		
	};
	
	exports.show = function(req, res) {
		res.render('quizes/statistics', {statistics: statistics, errors: []});
	};
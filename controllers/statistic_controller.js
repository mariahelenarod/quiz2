
	var models = require('../models/models.js');
	
/*	var statistics = {
		questions: 0,
		comments: 0,
		average_comments: 0,
		no_commented: 0,
		commented_questions: 0
	}; */
	
/*	exports.calculate = function(req, res, next) {
		models.Quiz.count()
		.then(function(questions) {
			statistics.questions = questions;
			return statistics.questions;})
		.then(function(comments) {
			statistics.comments = models.Comment.count();
			return statistics.comments;})
		.then(function(average_comments) {
			statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);
			return statistics.average_comments;})
		.then(function(no_commented) {
			if (!models.Comment.length) {
				no_commented++;
				console.log('sin');
			};
			return statistics.no_commented;})
		.then(function(commented_questions) {
			if (models.Comment.length) {
				commented_questions++;
				console.log('con');
			};
			return statistics.commented_questions;})
		.catch(function(error) {next(error)})
		.finally(function() {next()});		
	}; */
	
	
/*	exports.calculate = function(req, res, next) {
		models.Quiz.count()
		.then(function(questions) {
			statistics.questions = questions;
			models.Comment.count().then(function(comments) {
				statistics.comments = comments;
				statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);})
		})
		.catch(function(error) {next(error)})
		.finally(function() {next()});		
	}; */
			
			
/*			statistics.questions = questions;
			return statistics.questions;})
		.then(function(comments) {
			statistics.comments = models.Comment.count();
			return statistics.comments;})
		.then(function(average_comments) {
			statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);
			return statistics.average_comments;})
		.then(function(no_commented) {
			if (!models.Comment.length) {
				no_commented++;
				console.log('sin');
			};
			return statistics.no_commented;})
		.then(function(commented_questions) {
			if (models.Comment.length) {
				commented_questions++;
				console.log('con');
			};
			return statistics.commented_questions;})
		.catch(function(error) {next(error)})
		.finally(function() {next()});		
	}; */
	
	
	
	
/*	exports.show = function(req, res) {
		res.render('quizes/statistics', {statistics: statistics, errors: []});
	}; */
	
	
/*
    El número de preguntas
    El número de comentarios totales
    El número medio de comentarios por pregunta
    El número de preguntas sin comentarios
    El número de preguntas con comentarios
*/
exports.show = function(req,res){
  models.Quiz.count().then(function (questions){

  models.Comment.count().then(function (comments){

  var average_comments = comments / questions;

  models.Quiz.findAll({
    include:[{model: models.Comment}]
    }).then(function (questions){

        var commented_questions = 0;
        for (i in questions){
        if (questions[i].Comments.length)
       commented_questions++;
    }

    var no_commented = questions - commented_questions;

    res.render('quizes/statistics', {questions: questions,
                                      comments: comments,
                                      average_comments: average_comments,
                                      commented_questions: commented_questions,
                                      no_commented: no_commented,
                                      errors: []
    });

  })

  })
});
};

	
	
	
	
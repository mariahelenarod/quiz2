
	var models = require('../models/models.js');
	
	var statistics = {
		questions: 0,
		comments: 0,
		average_comments: 0,
		no_commented: 0,
		commented_questions: 0
	};
	
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
	
	
	exports.calculate = function(req, res, next) {
		models.Quiz.count()
		.then(function(questions) {
			statistics.questions = questions;
			models.Comment.count().then(function(comments) {
				statistics.comments = comments;
				statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);
			})
			return statistics;
		})
		.catch(function(error) {next(error)})
		.finally(function() {next()});		
	};
			
			
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
	

	exports.show = function(req, res) {
		res.render('quizes/statistics', {statistics: statistics, errors: []});
	}; 
	
	
/*
    El número de preguntas
    El número de comentarios totales
    El número medio de comentarios por pregunta
    El número de preguntas sin comentarios
    El número de preguntas con comentarios
*/


/* exports.show = function(req,res){
  models.Quiz.count().then(function (_quizes){

  models.Comment.count().then(function (_comments){

  var _midComments= _comments / _quizes;

  models.Quiz.findAll({
    include:[{model: models.Comment}]
    }).then(function (quizes){

        var _quesWithCom = 0;
        for (i in quizes){
        if (quizes[i].Comments.length)
        _quesWithCom++;
    }

    var _quesWithoutCom = _quizes - _quesWithCom;

    res.render('quizes/stats', {quizes: _quizes,
                                      comments: _comments,
                                      midComments: _midComments,
                                      quesWithCom: _quesWithCom,
                                      quesWithoutCom: _quesWithoutCom,
                                      errors: []
    });

  })

  })
});
}; */

	
	
	
	
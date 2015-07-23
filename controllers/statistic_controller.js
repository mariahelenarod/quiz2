
	var models = require('../models/models.js');
	
	var statistics = {
		quizes: 0,
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
	
	
/*	exports.calculate = function(req, res, next) {
		models.Quiz.count().then(function(questions) {
			statistics.questions = questions;

			return models.Comment.count();
		}).then(function(comments) {
			statistics.comments = comments;
			statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);

			return models.Quiz.findAll({
				include: [{
					model: models.Comment
				}]
			});
		}).then(function(quizes) {
			for (index in quizes) {
				if (quizes[index].Comment.length) {
					statistics.commented_questions++;
				} else {
					statistics.no_commented++;
				}
			}
		}).catch(function(error) {
			next(error)
		}).finally(function() {
			next()
		});
	}; */
	
	
	exports.calculate = function(req, res, next) {
		statistics.commented_questions = 0;
		statistics.no_commented = 0;
		Promise.all([
			models.Quiz.count(),
			models.Comment.count(),
			models.Quiz.findAll({
				include: [{
					model: models.Comment
				}]
			})
		]).then(function(results) { 								// `results` is an array of [quizes, comments, all]
			statistics.quizes 				= results[0];
			statistics.comments 			= results[1];
			statistics.average_comments 	= (statistics.comments / statistics.quizes).toFixed(2);
			for (index in results[2]) {
				if (results[2][index].Comment.length) {
					statistics.commented_questions++;
				} else {
					statistics.no_commented++;
				}
			}
		}).then(next, next);
	};
	
/*	exports.calculate = function(req, res, next) {
		models.Quiz.count()
		.then(function(questions) {
			statistics.questions = questions;
			models.Comment.count().then(function(comments) {
				statistics.comments = comments;
				statistics.average_comments = (statistics.comments / statistics.questions).toFixed(2);
				return models.Quiz.findAll({
					include:	[{model: models.Comment}]
				}).then(function(quizes) {
					console.log('entra .then()');
					for (index in quizes) {
						console.log('entra');
						if (quizes[index].Comment.length) {
							console.log('con');
							statistics.commented_questions++;
						} else {console.log('sin'); statistics.no_commented++;}
					};
				})
			})
		})
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

	
	
	
	
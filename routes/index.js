
/*
 * GET home page.
 */

var Usuario = require('../schemas.js').Usuario;
var Util=require('util');
exports.index = function(req, res){

	res.render('index',
		{
			title: 'Foro Desarrollo',
			usuario:req.session.user,
			iniciado:req.session.iniciada
		}
	);

};

/*
 * GET users listing.
 */
 
 var Usuario = require('../schemas.js').Usuario;

exports.list = function(req, res){
  res.send("respond with a resource");
};

exports.usuario=function(a,b){
	
	var usuario=a.params.usuario;
	Usuario.find(
		{
			name:usuario
		},
		{
			name:'',
			mail:'',
			'posts._id':'',
			'posts.title':'',
			'posts.date':''
		},
		function(err,res){
			console.log(err);
			if (res.length==1){
				res[0].posts.sort(
					function(a,b){
						if (a.date<=b.date){
							if(a.date==b.date)
								return 0;
							return 1;
						}
						else{
							return -1;
						}
					}
				);
				b.render('usuario',
					{
						title: usuario+'en ',
                        usuario:a.session.user,
                        iniciado:a.session.iniciada,
						data:res[0]
					}
				);
			}
			else{
				b.render('usuario',
					{
						title: 'Foro Desarrollo',
                        usuario:a.session.user,
                        iniciado:a.session.iniciada,
						mensaje:"El usuario no existe"
					}
				);
			}
		}
	);
}
/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 24/03/13
 * Time: 15:47
 * To change this template use File | Settings | File Templates.
 */

var Usuario = require('../schemas.js').Usuario;
var Util = require('util');
exports.nuevo=function(a,b){
    if (a.session.iniciada)
        b.render('nuevoPost',{
            title:'Nuevo post',
            usuario:a.session.user,
            iniciado:a.session.iniciada
        });
    else{
        b.render('index',{title:'Foro Desarrollo',mensaje:'No puede crear un nuevo post sin iniciar sesión'});
    }

};

exports.guardar=function(a,b){

    Usuario.update(
        {name: a.session.user}, //find
        {
            $push:{
                posts:{
                    title:a.body.title,
                    post:a.body.contenido,
                    date:new Date().getTime()
                }
            }
        }, //update
        function(err,numAffRows){
            if (err) console.log(err);
            if (numAffRows==1){
                b.render('index',
                    {
                        title: 'Foro Desarrollo',
                        usuario:a.session.user,
                        iniciado:a.session.iniciada,
                        mensaje:'Post creado'
                    }
                );
            }
        }
    );

}

exports.lastPost = function(a,b){
    Usuario.find({},
        {
            name:'',
            _id:0,
            "posts.title":'',
            "posts.date":'',
            "posts._id":''
        }

        ,function(err,result){
            var postsCol=[];
            for (i in result){
                var posts=result[i].posts;
                for (j =0; j<posts.length;j++){
                    var p={
                        date:posts[j].date,
                        title:posts[j].title,
                        _id:posts[j]._id

                    };
                    p.name = result[i].name;
                    postsCol.push(p);
                }
            }
            postsCol.sort(function(a,b){
                if (a.date<= b.date){
                    if (a.date == b.date)
                        return 0;
                    return 1;
                }
                else
                    return -1;
            });
            b.write(Util.format('%j',postsCol));
            b.end();
        });
}

exports.mostrar=function(a,b){
    console.log(a.params.idpost);
    Usuario.find({
            "posts._id": {$in:[ a.params.idpost]}
        },{

            name:'',
                _id:0,
            "posts.title":'',
            "posts.date":'',
            "posts._id":'',
            "posts.visitas":'',
            "posts.post":'',
            //"posts":{$elemMatch :{"_id":a.params.idpost}},
            //"posts.$.":{$elemMatch :{"_id":a.params.idpost}},
            "posts.comentarios":[]

        },
        function(err,res){
            
            if (res){
                var post={};
				var i=0;
				while (res[0].posts[i]._id!=a.params.idpost){
					i++;
				}
				console.log(res)
                post=res[0].posts[i];
                post.name=res[0].name;

                console.log(post);
                b.render('post',
                    {title:post.title,post:post,
                        usuario:a.session.user,
                        iniciado:a.session.iniciada
                    }
                );
                Usuario.update(
                    {"posts._id": {$in:[ a.params.idpost]}},
                    {$inc:{"posts.$.visitas":1}},function(err,naf){
                        //console.log(naf);
                    }
                );
            }
            else{
                //b.redirect('/');
				console.log(res);
				console.log(err);
				b.end();
            }
        });
};

exports.guardarComentario=function(a,b){
    //console.log(a);
    console.log("push antes!")
    if (a.session.iniciada){
        console.log("push comment")
        var comentario=a.body.comentario;
        var idpost= a.params.idpost;

        Usuario.update(
            {"posts._id": {$in:[ idpost]}},
            {
                $push:{
                    'posts.$.comentarios':{
                        name:a.session.user,
                        coment:comentario,
                        date:new Date().getTime()
                    }
                }
            },
            function(err,affRows){
                console.log(err);
                console.log(affRows);

                b.redirect(a.url);
            }
        )

    }
    else{
        b.redirect(a.url);
    }
};
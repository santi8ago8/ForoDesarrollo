/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 24/03/13
 * Time: 15:29
 * To change this template use File | Settings | File Templates.
 */

var Usuario = require('../schemas.js').Usuario;


exports.ingreso=function(a,b){
    Usuario.find(
        {
            name: a.body.usuario.toLowerCase(),
            password: a.body.password
        },
        function(err,data){
            if (err) b.render('index',{title:'Foro Desarrollo',mensaje:'Error: '+err});

            if (data.length==1){
                a.session.iniciada=true;
                a.session.user= a.body.usuario.toLowerCase();
                b.redirect(a.headers.referer);
                //console.log(a.headers.referer);
            }
            else{
                b.render('index',{title:'Foro Desarrollo',mensaje:'El usuario o la contraseña es incorrecta'});
            }


        }
    );
}

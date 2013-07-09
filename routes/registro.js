var mongoose = require('mongoose');
var db = mongoose.connection;
var Usuario = require('../schemas.js').Usuario;
var util=require('util');

exports.registroPage=function(a,b){
    b.render("registro",{title:"Registro"});

}

exports.registroSave=function(a,b){
    //TODO: sale bien el registro redirect iniciada la sesión
    //TODO:      sino render registro con {mensaje:'string'}
    Usuario.find(
        {$or:[
            {name: a.body.usuario.toLowerCase()},
            {mail:a.body.email.toLowerCase()}
        ]},
        function(err,res){
            console.log(res);
            if (res.length==0){
                var nuser=new Usuario({
                    name: a.body.usuario,
                    mail:a.body.email,
                    password: a.body.password
                });
                nuser.save();
                a.session.iniciada=true;
                a.session.user=nuser.name;
                b.redirect('/');
            }
            else{
                var mens="El %s ya esta registrado";
                var text='mail'
                if (res[0].name==a.body.usuario.toLowerCase())
                    text='usuario';
                mens=util.format(mens,text);
                b.render('registro',{title:'Registro',mensaje:mens});
            }
    });

}
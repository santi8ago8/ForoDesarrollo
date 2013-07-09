
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
    , registro= require('./routes/registro.js');
var mongoose=require('mongoose');
var ingreso = require('./routes/ingreso.js');
var post = require('./routes/post.js');

mongoose.connect('localhost','forodesarrollo');

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('your secret here'));
  app.use(express.session());
  app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', routes.index);
app.post('/ingresar',ingreso.ingreso);
app.get('/registrar',registro.registroPage);
app.post('/registrar',registro.registroSave);
app.get('/post/:idpost/:title',post.mostrar);
app.get('/user/:usuario',user.usuario);
app.post('/post/:idpost/:title',post.guardarComentario);
app.get('/nuevoPost',post.nuevo);
app.post('/lastPost',post.lastPost);
app.post('/nuevoPost',post.guardar);
app.get('/salir',function(a,b){
    //console.log(app);
    //console.log(this);
    delete a.session.iniciada;
    delete a.session.user;
    b.redirect('/');
});
String.replace

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});

var appfog = JSON.parse(process.env.VMC_APP_INSTANCE);
require('nodefly').profile(
    '291e86d5dfaecd2de4205cfcb1e7b0d2',
     'forodesarrollo',
     appfog.name,
     appfog.instance_index
);

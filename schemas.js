/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 24/03/13
 * Time: 12:37
 * To change this template use File | Settings | File Templates.
 */


var mongoose = require("mongoose");

var schema=mongoose.Schema(
    {
        name:{type:String, lowercase:true},
        mail:{type:String, lowercase:true},
        password:{type:String},
        posts:[
            {
                title:{type:String,lowercase:true},
                post:{type:String},
                visitas:{type:Number,default:0},
                date:{type:Number, default:0},
                comentarios:[
                    {
                        name:{type:String,lowercase:true},
                        coment:{type:String,lowercase:true},
                        date:{type:Number,default: 0}
                    }
                ]
            }
        ]
    }
);


var Usuario=mongoose.model("usuario",schema);

exports.Usuario=Usuario;
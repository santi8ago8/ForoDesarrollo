/**
 * Created with JetBrains WebStorm.
 * User: SantiagoPC
 * Date: 24/03/13
 * Time: 13:16
 * To change this template use File | Settings | File Templates.
 */


$(document).ready(init);

function init(){
    $('<p></p>').load("/lastPost",{},function(text){
        var posts=eval(text);

        $(".lastPost").append("<ul class='paginar'></ul>");
        var ul=$(".lastPost ul");

        jQuery.each(posts,function(i,post){
            //console.log(post);
            var li=$("<li></li>");
            li.append($("<A href='/user/"+post.name+"'>"+post.name+": </A>"));

            li.append($("<a href='/post/"+post._id+"/"+encodeURIComponent(post.title)+"'>"+post.title+" </a>"));
            dat=new Date();
            dat.setTime(post.date);
            var time=$("<time class='timeago' datetime='"+dat.toISOString()+"' title='"+dat.toISOString()+"'></time>");

            li.append(time);
            ul.append(li);
        });
        jQuery("time.timeago").timeago();
        $('.paginar').quickPagination();
    });
};
var express=require("express");
var app=express();
var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost/url");
//mongoose.connect("mongodb://Ankit:ankit456@ds129010.mlab.com:29010/url");
//mongodb://Ankit:ankit456@ds129010.mlab.com:29010/url
// Schema setup
var url=mongoose.Schema({
    url_long: String,
    url_short: String
    
});

var URL_Db=mongoose.model("URL_Db", url);

app.set("view engine","ejs");
var bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.get("/",function(req,res){
    res.render("new");
});

app.post("/",function(req,res){
    var url_name=req.body.url;
    var url_code=key_value();
    console.log(url_name);
    var newURL={url_long: url_name, url_short: url_code};
    URL_Db.create(newURL, function(err, newlycreated){
        if(err){
            console.log(err);
        }
        else{
                var s_url="https://app-ankit5sh.c9users.io/"+url_code;
           res.send(s_url); 
        }
    });
    
})
app.get("/:id",function(req,res){
    var name=req.params.id;
    URL_Db.findOne({url_short: name}, function(err, url){
        if(err){
            console.log(err);
        }
        else{
            console.log(url);
            res.redirect(url.url_long);
        }
    });
    
})
  function key_value(){
      var keys="012345679abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXY";
      var value="";
      for(var i=0;i<6;i++){
          var temp = Math.floor(Math.random()*62);
          value=value+keys[temp];
      }
      return value;
  }
 
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("server has started ");
});
//jshint esversion: 6
const express=require("express");
const bodyParser=require("body-parser");

const app=express();
var itemList=['Buy Food','Cook Food','Eat Food'];

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use("/CSS",express.static(__dirname+"/CSS"));


app.listen(3000,function(){
    console.log("Server is Running");
});

app.get("/",function(req,res){

var today=new Date();
var options={
    weekday:'long',
    day:'numeric',
    month:'long',
   };
var day=today.toLocaleDateString("en-US",options);
res.render('days',{dayName:day, newItemList:itemList});
});

app.post('/',function(req,res){
    itemList.push(req.body.TaskName);
    res.redirect('/');
});
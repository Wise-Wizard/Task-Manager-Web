//jshint esversion: 8
const express=require("express");
const bodyParser=require("body-parser");
const mongoose=require("mongoose");

const app=express();


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

TaskList.find({},function(err,foundItems){
    if(foundItems.length===0)
    {
        TaskList.insertMany(itemList,function(err){
            if(err){console.log(err);}
            else{console.log("Updated Successfully");}
        });
        res.redirect("/");
    }
    else{
        res.render('days',{dayName:day, newItemList:foundItems});
    }
});
});

app.post('/',function(req,res){
    const newTask=new TaskList({
        taskName: req.body.TaskName,
    });
    newTask.save();
    itemList.push(newTask);
    res.redirect('/');
});

app.post('/delete',function(req,res){
    TaskList.findByIdAndRemove(req.body.checkbox.trim(),function(err){
        console.log(err);
    });
    res.redirect('/');
});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/TaskManagerDB');
}

const ToDOSchema=new mongoose.Schema({
    taskName: String,
});

const TaskList=mongoose.model("TaskList",ToDOSchema);
const task1= new TaskList({
    taskName:"Welcome to Task Manager"
});
const task2= new TaskList({
    taskName:"Tap the + icon to add a Task"
});
const task3= new TaskList({
    taskName:"Tap on Checkbox to delete a Task"
});

var itemList=[task1,task2,task3];


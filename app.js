var express = require("express");
app = express(),
mongoose = require("mongoose"),
ToDo = require("./models/todo.js"),
bodyParser = require("body-parser"),
expressSanitizer = require("express-sanitizer"),
methodOverride = require("method-override");

mongoose.connect('mongodb://localhost:27017/todo_list', {useNewUrlParser: true, useUnifiedTopology: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

app.get("/", function(req, res)
{
   res.redirect("/todos"); 
});

app.get("/todos", function(req, res)
{
    ToDo.find({}, function(err, tasks)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            res.render("index", {tasks : tasks});    
        }
    });
});

app.post("/todos", function(req, res)
{
    req.body.todo = req.sanitize(req.body.todo);
    ToDo.create({name : req.body.todo}, function(err, newTodo)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.redirect("/todos");
        }
    }); 
});

/*app.put("/todos/:id", function(req, res)
{
    ToDo.findOneAndUpdate(req.params.id, req.body.todo, function(err, todo)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.redirect("/todos");
        }
    }); 
});*/

app.delete("/todos/:id", function(req, res)
{
    ToDo.findOneAndDelete(req.params.id, function(err, todo)
    {
        if(err)
        {
            res.send(err);
        }
        else
        {
            res.redirect("/todos");
        }
    }); 
});

app.listen(process.env.PORT, process.env.IP, function()
{
    console.log("Server started!");    
});
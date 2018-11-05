var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
    next();
    });
    
app.post('/name', function(req, res){
    res.send("Hello you sent " +
    req.body.firstname + " " +
    req.body.lastname);
})

app.get('/', function (req, res) {
   res.send('Hello from Express');
})

app.post('/api/posts', function(req, res){
    console.log("post successful");
    console.log(req.body.title);
    console.log(req.body.content);

    PostModel.create({
        title: req.body.title,
        content: req.body.content
    });


})

app.get('/api/posts', function(req, res){


    PostModel.find(function(err, data){
        res.json(data);
    })
})

app.delete('/api/posts/:id', function(req,res) {
    console.log("Deleting item"+ req.params.id)
    PostModel.deleteOne({_id: req.params.id},
        function(err){});
})




var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

var mongoDB = 'mongodb://admin:hello123@ds137863.mlab.com:37863/datarepdatabase';
mongoose.connect(mongoDB);

var Schema = mongoose.Schema;
//define schema

var postSchema = new Schema({
title: String,
content: String
})
var PostModel = mongoose.model('Post', postSchema);
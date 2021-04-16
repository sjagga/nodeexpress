var express = require('express');
var http = require('http');
var fs = require('fs');

/**
 * What did we do?
 * 1. We went for express to build server side code
 * 2. Registered express to http, you could listen directly through express also but...
 * 3. Read JSON file and displayed JSON list using JSON parser and response in JSON
 * 
 */
// Create server in express
var app = express();
// Register express app to server
var server = http.createServer(app);

app.get('/', function(req,res){
    res.send('<h1>Express works!!</h1>')
});

app.get('/tasks', function(req,res){
    fs.readFile('./db.json', function(err,data){
        var tasks = JSON.parse(data.toString()).tasks;
        res.json(tasks);
    })
    //res.send('<h1>Tasks work!!</h1>');
});

server.listen(3000, function() {
    console.log('Server is running on 3000');
});
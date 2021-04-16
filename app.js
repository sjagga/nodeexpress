var express = require('express');
// search for routes folder in root dir
var routes = require('./routes'); 
var http = require('http');
var path = require('path');
var urlencoded = require('url');
var bodyParser = require('body-parser');
var json = require('json');
var logger = require('logger');
var methodOverride = require('method-override');
const { response } = require('express');

// Library to connect to the database
var nano = require('nano')('http://localhost:5948');
var db = nano.use('address');

// Using express framework
var app = express();

//set env
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// specify all the modules we are using
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', routes.index);

app.post('/createdb', function(req,res) {
    nano.db.create(req.body.dbname, function(err) {
        if(err) {
            response.send("Error creating database" + req.body.dbname);
            return;
        }

        res.send('Database '+ req.body.dbname+' created successfully');

    })
});

app.post('/new_contact', function(req,res){
    var name = req.body.name;
    var phone = req.body.phone;
    
    db.insert({name: name, phone: phone, crazy: true}, phone, function(err, body,header) {
        if(err) {
            res.send("Error creating contact");
            return;
        }
        res.send("Contact created successfully");
    })
});

app.post('/view_contact', function(req,res){
    var alldoc = "Following are the contacts";
    db.get(req.body.phone, {revs_info:true}, function(err, body){
        if(!err) {
            console.log(body);
        }

        if(body){
            alldoc += "Name: " + body.name + "<br/> Phone Number: " + body.phone;
        }
        else {
            alldoc = "No records found";
        }
        res.send(alldoc);
    });
    
});

app.post('/delete_contact', function(req,res){
    db.get(req.body.phone, {revs_info: true}, function(err, body){
        if(!err) {
            db.destroy(req.body.phone, body._rev, function(err, body) {
                if(err) {
                    res.send("error deleting contact");
                }

                res.send('Contacts deleted successfully');
            });
        }
    });    
});

http.createServer(app).listen(app.get('port'), function() {
    console.log('Express server listening on port '+ app.get('port'));
});



var express = require('express');
var MobileDetect = require('mobile-detect');
var app = express();
var bodyParser = require('body-parser');
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({
    extended: true
})); 
var satelize = require('satelize');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

/********** severs caracters *********************/
var ipaddress = '127.0.0.1';
var port = 3001;

// default to a 'localhost' configuration:
var connectionString = 'localhost/survey';

mongoose.connect('mongodb://' + connectionString);

var metrixSchema = new Schema({
    date: { type: Date, default: Date.now },
    spy: Object,
    browser: String        
});
var surveySchema = new Schema({
    date: { type: Date, default: Date.now },
    name: String,
    age: String,
    job: String,
    email: String,
    city: String,
    romanticism: Number,
    culture: Number,
    life: Number
});

var ip = function(req, cb){
    var ip_address = req.headers['x-forwarded-for'] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;
    cb(ip_address);
};

var Metrix = mongoose.model('Metrix', metrixSchema, 'metrixSchema');
var Survey = mongoose.model('Survey', surveySchema, 'surveySchema');

app.get('/', function(req, res) {
    var md = new MobileDetect(req.headers['user-agent']);     
    ip(req, function(ip_address){
        satelize.satelize({ip: ip_address}, function(err, geoData) {
            var newMetrix = new Metrix();
            // newMetrix.spy = JSON.parse(geoData);
            newMetrix.browser = req.headers['user-agent'];
            newMetrix.save(); 
        });      
    });   
    if(md.phone())
        res.sendFile(__dirname + '/views/index_sm.html');
    else if(md.tablet()) 
        res.sendFile(__dirname + '/views/index_tb.html');
    else res.sendFile(__dirname + '/views/index_pc.html');
});
app.post('/main', function(req, res) {
    var md = new MobileDetect(req.headers['user-agent']);    
    var newSurvey = new Survey();
    newSurvey.name = req.body.name;
    newSurvey.age = req.body.age;
    newSurvey.job = req.body.job;
    newSurvey.email = req.body.email;
    newSurvey.save();
    res.cookie("email", req.body.email);
    res.cookie("slideN", 0);
    res.cookie("che", 0);
    if(md.phone())
        res.sendFile(__dirname + '/views/main_sm.html');
    else if(md.tablet()) 
        res.sendFile(__dirname + '/views/main_tb.html');
    else res.sendFile(__dirname + '/views/main_pc.html');
});

app.post('/sendi', function(req, res) {
    var newSurvey = new Survey();
    newSurvey.city = req.body.city;
    newSurvey.email = req.body.email;        
    newSurvey.romanticism = req.body.radiosR;
    newSurvey.culture = req.body.radiosC;
    newSurvey.life = req.body.radiosN;
    newSurvey.save();
});

app.use(express.static(__dirname + '/static'));

app.listen(port, ipaddress, function() {
    console.log('%s: Node server started on %s:%d ...',
                Date(Date.now()), ipaddress, port);
});

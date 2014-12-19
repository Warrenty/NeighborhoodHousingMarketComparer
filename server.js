var cors = require('cors')
var bodyParser = require('body-parser');
var express = require('express');

var reloader = require('connect-livereload')
var app = express();


app.use(cors());

app.use(reloader());
app.use(express.static('./client'));

app.use(bodyParser.json());

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", '*');
	res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
	res.header("Access-Control-Allow-Headers",  'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

app.listen(9000, function(){
  console.log('App Listening on localhost:9000');
});

var module = module || {};

module.exports = app
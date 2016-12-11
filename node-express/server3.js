var express = require('express'),
	morgan = require('morgan'),
	bodyParser = require('body-parser'),
	hostname = 'localhost',
	port = 3000,
	path = require('path');
	app = express();

app.use(morgan('dev'));
app.use(bodyParser.json());


app.all('/dishes', function(req, res, next){                                                                                                                                                                                                                                                                                   
	res.writeHead(200, {'Content-Type':'text/plain'});
	next();
});

app.get('/', function(req, res, next){
	res.sendFile(path.join(__dirname + '/public/index.html'));
});

app.get('/dishes', function(req, res, next){
	res.end('Will send all the Dishes to you! #hustle');
});

app.post('/dishes', function(req, res, next){
	res.end('Will add the dish: ' + req.body.name + ' with details ' + req.body.description);
});

app.delete('/dishes', function(req, res, next){
	res.end('Deleting all dishes');
});

app.get('/dishes:dishId', function(req, res, next){
	res.end('Will send the details of Dish: ' + req.params.dishId + ' to you!');
});

app.put('/dishes', function(req, res, next){
	res.write('Updating the dish for ' + req.params.dishId + '\n');
	res.end('Will update the dish: ' + req.body.name + ' With deails: ' + req.body.description )
});

app.delete('/dishes/:dishId', function(req, res, next){
	res.end('Deleting dish: ' + req.params.dishId);
});

app.use(express.static(__dirname + './public'));

app.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
});
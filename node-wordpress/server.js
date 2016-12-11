var express = require('express');
var WPAPI = require('wpapi');
var bodyParser = require('body-parser');
var wp = new WPAPI({ endpoint: 'http://quest2code.com/wp-json' });
var hostname = 'localhost';
var path = require('path');
var port = 3000;
var http = require('http');
var cheerio = require('cheerio');
var app = express();

app.use(bodyParser.json());

app.all(function(req, res, next) {

    console.log(req.headers);
    res.writeHead(200, { 'Content-Type': 'text/html' });
    next(); 
});

// GET HOME PAGE
app.get('/', function(req, res, next) {

	res.sendFile(path.join(__dirname + '/public/index.html'));
    
});

// GET WP POSTS
app.get('/posts', function(req, res, next) {

    wp.posts().get(function(err, data) {
        if (err) {
            // handle err
        }
        res.send(data);
    });
});

app.use(express.static('public'));
app.listen(port, hostname, function() {

    console.log(`Server running at http://${hostname}:${port}`);

});


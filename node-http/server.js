var http = require('http');
var path = require('path');
var fs = require('fs');
var hostname = 'localhost';
var port = 3000;


// create a server and assign to var server
var server = http.createServer(function(req, res){
	
	console.log('Request for ' + req.url + ' by method ' + req.method);

	// if the client is sending a GET request, then proceed
	if(req.method == 'GET'){
		var fileUrl;


		//if the request url is the root, display index.html
		if(req.url == '/'){

			//assign fileUrl to /index.html
			fileUrl = '/index.html';
		} else {
			//else assign it to requested url
			fileUrl = req.url; 
		}

		// make root for public = ./public
		var filePath = path.resolve('./public' + fileUrl); 
		//target file requested by extension
		var fileExt = path.extname(filePath);

		if(fileExt == '.html'){
			fs.exists(filePath, function(exists){
				// if file does not exists = 404
				if(!exists){
					res.writeHead(404, {'Content-type':'text/html'});
					res.end('<h1>Error 404: ' + filePath + ' not found</h1>');
					return;
				}

				// if it exists = 200
				res.writeHead(200, {'Content-type':'text/html'});
				fs.createReadStream(filePath).pipe(res);
			});
		} else {
			res.writeHead(404, {'Content-type':'text/html'});
			res.end('<h1 style="text-align:center">Error 404: '+ fileUrl + ' not found');
		}
	}

});

server.listen(port, hostname, function(){
	console.log(`Server running at http://${hostname}:${port}`);
})
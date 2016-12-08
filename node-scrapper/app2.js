//Step 2
var express = require("express"); // NodeJS framework
var fs = require("fs"); // Simple server request
var request = require("request"); // Access to the file system
var cheerio = require("cheerio"); // Server-side jQuery
var app = express();

var url = 'http://alistapart.com/' //Website for the web scrape

var port = '8080'; // Server port for the listen function

//Step 3
var titles = []; //Empty array for storing scraped data


//Web Scraping Logic accessed at localhost:8080/
app.get('/', function(req, res){

//Step 4 

  //Request a URL, Then check to see if there is an error accessing the website. If there is no error accessing the website, then log the HTML body of the page
  request(url, function(err, res, body){
    if(err){
      console.log(err);
    } else {

//Step 5

      //Provide Cheerio with access to the URL's HTML
      var $ = cheerio.load(body);

      //Traverse the HTML for the h4 tags used for the article titles
      $('h4.summary-title').each(function(i, elem){
        titles[i] = $(this).text();
      });

      console.log(titles);

//Step 6

      fs.writeFile('web-scrape-results.csv', JSON.stringify(titles, null, " "), function(err){
        if(err){
          console.log(err);
        } else {
          console.log("Data written successfully!");
        }
      });

    }
  })
  res.send(url + " was successfully scraped!");


});

app.listen(port);

console.log('Listening on port' + port);
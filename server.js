// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var accepts = require('accepts')//this is for the languages 
var browser = require('detect-browser');//this is to detect browser
var useragent = require('useragent');//to detect computer, OS, and version of OS

// we've started you off with Express, 
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

function getOS(headerUserAgent){
  //input looks like - user-agent: "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36",
  var result = headerUserAgent.split("(");
  result = result[1].split(")")[0];
  return result;
  // we want "Windows NT 6.1; Win64; x64" output
}
function getIP(reqIP) {
  return /:/.test(reqIP) ? reqIP.split(":").reverse()[0] : reqIP; // in case it's ipV6 formatted with ::ffff:127.0.0.0
}

app.get("/api/whoami", function (req, res) {
  // res.status(200).send('Hello World');
  var j = {};
  var accept = accepts(req)
  j.ipaddress = getIP(req.ip);
  j.language = accept.languages()[0];
  j.software = getOS(req.headers["user-agent"])
  res.end(JSON.stringify(j));
});

app.get("/dreams", function (request, response) {
  response.send(dreams);
});

// could also use the POST body instead of query string: http://expressjs.com/en/api.html#req.body
app.post("/dreams", function (request, response) {
  dreams.push(request.query.dream);
  response.sendStatus(200);
});

// Simple in-memory store for now
var dreams = [
  "Find and count some sheep",
  "Climb a really tall mountain",
  "Wash the dishes"
];

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

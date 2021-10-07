// import package requirements
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
console.log("Hello World");

// Root-Level Request logger Middleware
app.use(function(req, res, next) {
  console.log(`${req.method} ${req.path} - ${req.ip}`);
  next();
});

app.use(bodyParser.urlencoded({extended: false}));


app.use('/public', express.static(__dirname + '/public'));


app.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


app.get('/json', function(req, res) {
  let response = "Hello json"
  if( process.env.MESSAGE_STYLE ==  'uppercase') {
    response = response.toUpperCase();
  }
  res.json({"message": response});
});

// Chained Middleware Time Server
app.get('/now', function(req, res, next) {
  req.time = new Date().toString();
  next();
}, function(req, res) {
  res.json({"time": req.time});
});

// Example of accepting and echoing back input from a client
// test by going to applink/somewordhere/echo
// will show the somewordhere echo'd back in the returned json object
app.get('/:word/echo', function(req, res) {
  res.json({echo: req.params.word})
})


// Get method focus on query paramater of the request sent
app.get('/name', function(req, res) {
  const firstname = req.query.first;
  const lastname = req.query.last;
  res.json({name: firstname + lastname});
})

// Post method takes from the body paramater of the request sent
app.post('/name', function(req, res) {
  const firstname = req.body.first;
  const lastname = req.body.last;
  res.json({name: firstname + " " + lastname});
})






module.exports = app;

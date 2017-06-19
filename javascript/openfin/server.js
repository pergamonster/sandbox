var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();

app.set('title','OpenFin appseed test');
app.use(express.static(path.join(__dirname, 'src')));

/*serves main page */
app.get('/', function (req, res){
  res.sendFile("src/index.html", {"root": __dirname});
});

/* process.env.PORT is used in case you want ot push to Heroku etc */
var port = process.env.PORT || 9070;

http.createServer(app).listen(port, function(){
  console.log('Express server lostening on port ' + port);
});

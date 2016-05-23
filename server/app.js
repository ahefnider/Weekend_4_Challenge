var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var ToDo = require('./routes/ToDo');



app.set('port', 5000);

app.use(bodyParser.urlencoded( {extended: true} ));

app.use('/ToDo', ToDo);

app.get('/*', function(req, res) {
  console.log('request params', req.params);
  var file = req.params[0] || 'views/index.html';
  res.sendFile(path.join(__dirname, "./public", file));
});

app.listen(app.get('port'), function() {
  console.log('Server is ready on port:' + app.get('port'));
});

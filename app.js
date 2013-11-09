var express = require('express'),
    mongoose = require('mongoose');

var db = mongoose.connect('mongodb://localhost/prsr');

//Bring in models.  If adding more, need to write a method to do this.
require('./app/models/testplans');

var app = express();

app.configure(function() {
  app.set('port', process.env.PORT || 8080);
  app.engine('.html', require('ejs').__express);
  app.set('views', __dirname + '/app/views');
  app.set('view engine', 'html');
  app.use(express.static(__dirname + '/public'));
  app.use(express.bodyParser());
  app.use(app.router);
});

//bootstrap routes
require('./config/routes.js')(app);

app.listen(app.get('port'));
console.log('Express app started on port ' + app.get('port'));


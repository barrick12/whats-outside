var config = require('./config/config.json')
var express = require('express');
var app = express();
var apiController = require('./controllers/apiController');

process.env.NODE_ENV = config.nodeEnv;

var port = process.env.PORT || 5000;
console.log(`Listening on port ${port}`);

console.log('Environment: ', process.env.NODE_ENV);

if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "build") {
  app.use(express.static("../react/dist"));
}

apiController(app);

app.use(function (req, res, next) {
  res.status(404).redirect('/index.html')
})

app.listen(port);
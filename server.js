require('rootpath')();
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const Mongoose = require("mongoose");
const errorHandler = require('_helpers/error-handler');
const userController = require('users/users.controller');
const policieController = require('policies/policies.controller');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

Mongoose.connect("mongodb://localhost/assessment", { useNewUrlParser: true });

var db = Mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('Connected to DB!')
});

// use our middleware
app.use('/users', userController);
app.use('/policies', policieController);
app.use(errorHandler);

// start server
const port = process.env.NODE_ENV === 'production' ? 80 : 4000;
const server = app.listen(port, function () {
    console.log('Server listening on port ' + port);
});
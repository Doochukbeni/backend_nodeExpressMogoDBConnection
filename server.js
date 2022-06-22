// import express and assign it as a variable//
const express = require('express');

// import cors for cross origin resource sharing
const cors = require('cors');

// import mongoose to connect to our mongoDB
const mongoose = require('mongoose');
const userRoutes = require('./routes/User_Routes.js');

// import UserModel to connect with the mongoDb
const UserModel = require('./models/UserModel.js');

//import body parser to read post request
const bodyParser = require('body-parser');

// create a server by calling the express
const server = express();
// Configure express for reading body for POST requests
server.use(bodyParser.urlencoded({ extended: false }));

// Configure express for JSON as well
server.use(bodyParser.json());

// configure express to use cors
server.use(cors());

// Connect to MongoDB
const connectionString =
  'mongodb+srv://admin02:mrchurch2017@cluster0.vlhx2.mongodb.net/roidoo-backend?retryWrites=true&w=majority';

const connectionConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose
  .connect(connectionString, connectionConfig)
  .then(function () {
    console.log('DB is connected');
  })
  .catch(function (dbError) {
    console.log('DB error', dbError);
  });

// this is the API get request route setup
server.get('/', function (req, res) {
  res.send('welcome Doo!');
});

server.use('/user', userRoutes);

// my server is listening on port 3005
server.listen(3005, function () {
  console.log('server is connected on http://localhost:3005 !');
});

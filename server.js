const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
// const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');


// Connect To database
mongoose.Promise = require('bluebird');
mongoose.connect(config.database, { useMongoClient: true });
const db = mongoose.connection;

// On Error
db.on('error', console.error.bind(console, 'connection error:'));

// On Connection
db.once('open', function() {
  console.log('Connected to database ' + config.database);
});

// On disconnect
db.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', function() {
  db.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});

const app = express();


// var delay = require('express-delay');
// app.use(delay(1000));

// Port Number
const port = process.env.PORT || 3000;

// CORS Middleware
// app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'dist')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// Routes
const users = require('./routes/users');
app.use('/api/users', users);
const hospitals = require('./routes/hospitals');
app.use('/api/hospitals', hospitals);
const blogs = require('./routes/blogs');
app.use('/api/blog', blogs);
const rescue = require('./routes/rescue');
app.use('/api/rescue', rescue);
const legal = require('./routes/legal');
app.use('/api/legal', legal);

// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// Start Server
app.listen(port, () => {
  console.log('Server started on port ' + port);
});

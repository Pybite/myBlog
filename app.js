const path = require('path');
require('dotenv').config({
    override: true,
    path: path.join(__dirname, '.env')
})
const PORT = process.env.SPORT || 5000;
const express = require('express');
const morgan  = require('morgan');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const expressLayout = require('express-ejs-layouts');
const app = express();

// Middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

//Templating Engine

app.set('view engine', 'ejs');

// Routes
app.use('', require('./router/userRoute.js'));
app.use('/', require('./router/authRoute.js'));

// Connecting to DB first then starts the server
mongoose.connect(process.env.MONGO_URI, {dbName: process.env.DATABASE}).then(() => {
  app.listen(PORT, ()=> {
    console.log(` :: Connected to the DB ::`)
    console.log(`server booted up on port: ${PORT}`)
  })
})

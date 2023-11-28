// load environment variables
const dotenv = require('dotenv');
dotenv.config();

// import required modules
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

// import mongoose
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_CONN)
  .then(() => { console.log("Connected") })
  .catch(err => console.log(err));

// import routers
const indexRouter = require('./routes/index');
const apiRouter = require('./routes/api');

const app = express();

// view engine setup
// set the path of the views, set the templating engine to jade
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

if (process.env.NODE_ENV !== 'production') {
  // only allow requests from environment origin
  const corsOptions = {
    origin: process.env.APP_ORIGIN,
    credentials: true
  }
  app.use(cors(corsOptions));
}

// middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'client/dist')));

// use routers. the path information is NOT passed on to the router
app.use('/', indexRouter);
app.use('/api', apiRouter);
app.get('/*', (req, res) => {
  res.status(404).send('The endpoint you are trying to access does not exist.');
});

// custom solution for sending back a json response for malformed json request body
// source: https://stackoverflow.com/questions/58134287/catch-error-for-bad-json-format-thrown-by-express-json-middleware
app.use((err, req, res, next) => {
  // if the error is a syntax error, originating from a user-submitted body
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {

      // log the error and send the user a json error message
      console.error(err);
      return res.status(400).send({ status: 400, message: err.message });
  }
  next();
});

// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// error handler
// app.use(function(err, req, res, next) {
  
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });

module.exports = app;
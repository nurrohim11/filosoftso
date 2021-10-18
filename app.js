var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// set url in locals and variable other
app.use ((req, res, next) => {
  // res.locals.typemethod = req.method
  res.print_json = (status, message, response)=> {
    // Do whatever you want, you have access to req and res in this closure
    res.json({
      metadata: {
        status:status,
        message:message
      },
      response : response,
    })
  }
  next()
});

app.use('/', indexRouter);

module.exports = app;

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const adsRouter = require('./routes/ads');
const adRouter = require('./routes/ad');
const uploadRouter = require('./routes/upload');
const graphqlRouter = require('./routes/graphql');

const app = express();

// allow server to parse body data. increase limit for larger image sizes
app.use(express.json({ limit: '50mb' }));
// allow server to accept data from forms
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(logger('dev'));
app.use(cookieParser());
app.use(cors());

// Serve static assets if in production

const apiPrefix = '/api';
app.use(apiPrefix + '/ads', adsRouter);
app.use(apiPrefix + '/ad', adRouter);
app.use(apiPrefix + '/upload', uploadRouter);
app.use(apiPrefix + '/graphql', graphqlRouter);

if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('../client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve('../client', 'build', 'index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500).json({ msg: err.message });
});

module.exports = app;

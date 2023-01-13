const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

app.use(morgan('dev'));

//this is a middleware function
app.use(express.json());

//we can create our own middleware functions
app.use((req, res, next) => {
  console.log('Hello from the middleware');
  //we need to call next function to move to the next middleware, otherwise the request will be stuck here
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

//routers
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;

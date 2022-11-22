const express = require('express');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

//1)midllewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static(`${__dirname}/public`));
const logger = function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
};
app.use(logger);

//3)Routes
/*
NOTE after define route we use it in our app like middleware
NOTE and we dont need next fun caues
NOTE we are in res.send
NOTE and called sub application */
app.use('/api/v1/tours', tourRouter); // for route(URL) /api/v1/tours we use tourRouter (tour niddlware in url /api/v1/tours)
app.use('/api/v1/users', userRouter); //it means for route(URL) /api/v1/users we use userRouter
//and the ohter middlware like morgan used in the  all routes
//4)Start the server
module.exports = app;

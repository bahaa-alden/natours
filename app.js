const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');
const app = express();

//1)midllewares
app.use(morgan('dev'));
app.use(express.json());
const logger = function (req, res, next) {
  req.requestTime = new Date().toISOString();
  next();
};
app.use(logger);

//3)Routes


/* NOTE after define route we use it in our app like middleware and we dont need next fun caues
NOTE we are in res.send
NOTE and called sub application */
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
//4)Start the server
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

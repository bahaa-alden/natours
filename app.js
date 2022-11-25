import express, { json } from 'express';
import morgan from 'morgan';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();

//1)middleware
app.use(morgan('dev'));
app.use(json());
app.use(express.static(`./public`));
// const logger = function (req, res, next) {
//   req.requestTime = new Date().toISOString();
//   next();
// };
// app.use(logger);

//3)Routes
/*
NOTE after define route we use it in our app like middleware
NOTE and we don't need next fun cause
NOTE we are in res.send
NOTE and called sub application */
app.use('/api/v1/tours', tourRouter); // for route(URL) /api/v1/tours we use tourRouter (tour middleware in url /api/v1/tours)
app.use('/api/v1/users', userRouter); //it means for route(URL) /api/v1/users we use userRouter
//and the other middleware like morgan used in the  all routes
//4)Start the server

export default app;

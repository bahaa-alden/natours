import express from 'express';
import morgan from 'morgan';
import { config } from 'dotenv';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';

config();
const app = express();
//1)middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
app.use(express.json());
app.use(express.static(`./public`));

//3)Routes
/*
NOTE after define route we use it in our app like middleware
NOTE and we don't need next fun cause
NOTE we are in res.send
NOTE and called sub application */
app.use('/api/v1/tours', tourRouter); // for route(URL) /api/v1/tours we use tourRouter (tour middleware in url /api/v1/tours)
app.use('/api/v1/users', userRouter); //it means for route(URL) /api/v1/users we use userRouter
//for other routes
app.all('*', (req, res, next) => {
  //req.originalURl mean the route was sent
  next(new AppError(404, `Can't find ${req.originalUrl} on this server`)); //skip all middleware and go to the errors handler
});
app.use(globalErrorHandler);
//and the other middleware like morgan used in the  all routes

export default app;

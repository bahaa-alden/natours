import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import morgan from 'morgan';
import { rateLimit } from 'express-rate-limit';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
import tourRouter from './routes/tourRoutes.js';
import userRouter from './routes/userRoutes.js';
import reviewRouter from './routes/reviewRoutes.js';
import viewRouter from './routes/viewRoutes.js';
import globalErrorHandler from './controllers/errorController.js';
import AppError from './utils/appError.js';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

//1) Global middlewares
//Serving static files
app.use(express.static(path.join(__dirname, 'public')));
//Set security headers
app.use(helmet());

//for logging in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//Avoid exploit Node.js security weaknesses
app.disable('x-powered-by');

//Limit the requests for the same IP
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

//Read the data from the body
app.use(express.json({ limit: '10kb' }));

//Data sanitization against NoSql query injection like email:{$gt:""}
app.use(mongoSanitize());

//Data sanitization against XSS like send html with some js in any param or...
app.use(xss());

//Prevent http params pollution
app.use(
  hpp({
    whitelist: [
      'duration',
      'difficulty',
      'ratingsAverage',
      'ratingsQuantity',
      'price',
      'maxGroupSize',
    ],
  })
);

//2)Routes

app.use('/', viewRouter);
app.use('/api/v1/tours', tourRouter); // for route(URL) /api/v1/tours we use tourRouter (tour middleware in url /api/v1/tours)
app.use('/api/v1/users', userRouter); //it means for route(URL) /api/v1/users we use userRouter
app.use('/api/v1/reviews', reviewRouter);

//for other routes
app.all('*', (req, res, next) => {
  //req.originalURl mean the route was sent
  next(new AppError(404, `Can't find ${req.originalUrl} on this server`)); //skip all middleware and go to the errors handler
});

app.use(globalErrorHandler);
//and the other middleware like morgan used in the  all routes
export default app;

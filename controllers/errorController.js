import AppError from '../utils/appError.js';

const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`;
  return new AppError(400, message);
};

const handleDuplicateErrorDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  const message = `Duplicate field value: ${value}. please use another value!`;
  return new AppError(400, message);
};

const handleValidatorErrorDB = (err) => {
  const message = `Invalid input data. ${Object.values(err.errors)
    .map((el) => el.message)
    .join('. ')}`;
  return new AppError(400, message);
};

const sendErrorDev = (err, res) => {
  //development error
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  //Operational, trusted errors:send message to the client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } //Programming or other unknown error:don't leak details
  else {
    //1) log error
    console.error('Error');

    //2) send generic message :don't leak error details
    res
      .status(500)
      .json({ status: 'error', message: 'Something went very wrong' });
  }
};
export default (err, req, res, next) => {
  //if there is not a statusCode that mean internalServerError 500 and status "error"
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = err;
    if (error.name === 'CastError') error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateErrorDB(error);
    if (error.name === 'ValidationError') error = handleValidatorErrorDB(error);
    sendErrorProd(error, res);
  }
};

import Stripe from 'stripe';
import Booking from '../models/bookingModel.js';
import Tour from '../models/tourModel.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import {
  createOne,
  deleteOne,
  getAll,
  getOne,
  updateOne,
} from './handlerFactory.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const getCheckoutSession = catchAsync(async (req, res, next) => {
  //1) Get the currently booked tour
  const tour = await Tour.findById(req.params.tourId);

  //2)Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    success_url: `${req.protocol}://${req.get('host')}/?tour=${tour.id}&&user=${
      req.user.id
    }&&price=${tour.price}`,
    cancel_url: `${req.protocol}://${req.get('host')}/${tour.slug}`,
    customer_email: req.user.email,
    client_reference_id: tour.id,
    line_items: [
      {
        price_data: {
          product_data: {
            name: `${tour.name} Tour`,
            description: tour.summary,
            images: [`https://www.natours.dev/img/tours/${tour.imageCover}`],
          },
          unit_amount: tour.price * 100,
          currency: 'usd',
        },
        quantity: 1,
      },
    ],
    custom_text: {
      submit: {
        message: "We'll email you instructions on how to get started.",
      },
    },
    invoice_creation: { enabled: true },
    mode: 'payment',
  });

  //3) Create session as response
  res.status(200).json({ status: 'success', session });
});
export const createBookingCheckout = catchAsync(async (req, res, next) => {
  const { tour, user, price } = req.query;
  if (!tour || !user || !price) return next();
  await Booking.create({ tour, user, price });
  res.redirect(req.originalUrl.split('?')[0]);
});

export const getMyBookings = catchAsync(async (req, res, next) => {
  //1) Get user's bookings
  const booking = await Booking.find({ user: req.user.id });

  //2) Get the tour that the user had booked
  const tourIds = booking.map((el) => el.tour);

  const tours = await Tour.find({ _id: { $in: tourIds } });
  res
    .status(200)
    .json({ status: 'success', result: tours.length, data: { tours } });
});

export const isBooked = catchAsync(async (req, res, next) => {
  const { tour, user } = req.body;
  const booking = await Booking.findOne({ tour, user });
  if (!booking) {
    return next(
      new AppError(400, 'Only users who had booked can make a review')
    );
  }
  next();
});

export const getAllBookings = getAll(Booking);
export const getBooking = getOne(Booking);
export const createBooking = createOne(Booking);
export const updateBooking = updateOne(Booking);
export const deleteBooking = deleteOne(Booking);

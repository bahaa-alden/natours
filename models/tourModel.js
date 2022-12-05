import mongoose from 'mongoose';
import slugify from 'slugify';
// import validator from 'validator';

const { Schema, model } = mongoose;
//Document
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      minLength: [10, 'A tour name must have at least 10 characters'],
      maxLength: [40, 'A tour name must have at most 40 characters'],
      // validate: [validator.isAlpha, 'A tour name must contain only letters '],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either easy,medium,difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'A tour rating must be above 1'],
      max: [5, 'A tour rating must be below 5'],
    }, //NOTE rating not required because its value came from reviews
    ratingsQuantity: {
      type: Number,
      default: 0, //NOTE because there is no reviews when the tours new
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      //custom validator
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'The priceDiscount {VALUE} must be below the price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(), //default does not have a required
    },
    startDates: [Date],
    secretTour: { type: Boolean, default: false },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//virtual properties do not store at database and
//we don't add them to schema because it is a business role
//and we cant use them in a query
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});
// tourSchema.virtual('payInDay').get(function () {
//   return this.price / this.duration;
// });

//Document Middleware
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true, trim: true });
  next();
});
//we can add another pre middleware
// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

//Query Middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  next();
});
// tourSchema.post(/^find/, function (docs, next) {
//   next();
// });

//aggregation MiddleWare
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});
//Collection
const Tour = model('Tour', tourSchema);

export default Tour;

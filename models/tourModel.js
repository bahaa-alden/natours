import mongoose from 'mongoose';
import slugify from 'slugify';

const { Schema, model } = mongoose;
//Document
const tourSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
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
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
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
//Collection
const Tour = model('Tour', tourSchema);

export default Tour;

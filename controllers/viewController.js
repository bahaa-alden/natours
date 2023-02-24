import Tour from '../models/tourModel.js';
import catchAsync from '../utils/catchAsync.js';

export const getOverview = catchAsync(async (req, res) => {
  //1)Get tour data from Tour collection
  const tours = await Tour.find();
  //2)Build the overview page
  //3)Render overview page using the tour data
  res.status(200).render('overview', { title: 'All tours', tours });
});

export const getTour = (req, res) =>
  res.status(200).render('tour', { title: 'The Forest Hiker' });

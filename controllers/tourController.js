import Tour from '../models/tourModel.js';

//NOTE these funcs do not have to worry about any error they just do what they made for it
export async function getAllTours(req, res) {
  try {
    //Building query

    //Filtering
    const queryObj = { ...req.query };
    const excludedFields = ['limit', 'sort', 'page', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    //Advance Filtering
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gt|gte|lt|lte)\b/gi,
      (match) => `$${match}`
    );
    let query = Tour.find(JSON.parse(queryString));
    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' ');
      query = query.sort(sortBy);
    }
    const tours = await query;
    res.json({
      status: 200,
      result: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

export async function getTour(req, res) {
  try {
    const tour = await Tour.findById(req.params.id);

    if (tour !== null) {
      res.status(200).send({
        status: 'success',
        data: {
          tour,
        },
      });
    } else {
      res.status(404).json({
        status: 'fail',
        message: 'Invalid id',
      });
    }
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}
export async function createTour(req, res) {
  //newTour=new Tour({})
  //newTour.save()
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).send({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
}
//NOTE update user
export async function updateTour(req, res) {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.status(200).send({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

//NOTE delete user
export async function deleteTour(req, res) {
  try {
    // eslint-disable-next-line no-unused-vars
    await Tour.findByIdAndRemove(req.params.id);
    res.status(204).send({ status: 'success', data: null });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
}

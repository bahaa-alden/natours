/* eslint-disable node/no-unsupported-features/es-syntax */
const Tour = require('../models/tourModel');

//NOTE these funcs do not have to worry about any error they just do what they made for it
exports.getAllTours = async (req, res) => {
  try {
    const tours = await Tour.find();
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
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
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
};
exports.createTour = async (req, res) => {
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
};
//NOTE update user
exports.updateTour = async (req, res) => {
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
};

//NOTE delete user
exports.deleteTour = async (req, res) => {
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
};

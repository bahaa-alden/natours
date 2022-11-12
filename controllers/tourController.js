const fs = require('fs');
const { dirname } = require('path');
const tours = require('../dev-data/data/tours-simple.json');

exports.getAllTours = (req, res) => {
  res.json({
    status: 200,
    requestedAt: req.requestTime,
    result: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  const rId = req.params.id * 1;
  const tour = tours.find((e) => e.id === rId);
  if (!tour) {
    return res.status(404).send({
      status: 'fail',
      message: 'Invalid id number',
    });
  }
  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
};

//NOTE update user
exports.updateTour = (req, res) => {
  const { name, duration } = req.body;
  const id = req.params.id * 1;
  const updatedTour = tours.find((e) => e.id === id);
  if (!updatedTour) {
    return res.status(404).send({ status: 'fail', message: 'Invalid Id' });
  }
  updatedTour.name = name;
  updatedTour.duration = duration;
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      res.status(200).send({
        status: 'success',
        data: {
          updatedTour,
        },
      });
    }
  );
};

//NOTE delete user
exports.deleteTour = (req, res) => {
  const id = req.params.id * 1;
  if (id > tours.length - 1)
    return res.status(404).send({ status: 'fail', message: 'Invalid Id' });
  const newTours = tours.filter((e) => {
    return e.id !== id;
  });
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(newTours),
    (err) => {
      res.status(204).send({ status: 'success', data: null });
    }
  );
};

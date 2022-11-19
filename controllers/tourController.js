/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs');
const tours = require('../dev-data/data/tours-simple.json');

exports.cheackId = (req, res, next, val) => {
  if (val * 1 > tours.length - 1)
    return res.status(404).send({ status: 'fail', message: 'Invalid Id' });
  next();
};

exports.cheakBody = (req, res, next) => {
  if (!req.body.name || !req.body.price) {
    return res
      .status(400)
      .send({ status: 'failed', message: 'missing name or price' });
  }
  next();
};
//NOTE these funcs do not have to worry about any error they just do what they made for it
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

  res.status(200).send({
    status: 'success',
    data: {
      tour,
    },
  });
};
exports.createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1;
  const newTour = { id, ...req.body };
  tours.push(newTour);
  fs.writeFile(
    `./dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      console.log(err);
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

  updatedTour.name = name;
  updatedTour.duration = duration;
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    () => {
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
  const newTours = tours.filter((e) => e.id !== id);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(newTours),
    () => {
      res.status(204).send({ status: 'success', data: null });
    }
  );
};

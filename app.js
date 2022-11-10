const express = require('express');
const fs = require('fs');
const tours = require('./dev-data/data/tours-simple.json');
const app = express();
app.use(express.json());
const port = 3000;

//NOTE get all tours
app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 200,
    result: tours.length,
    data: {
      tours,
    },
  });
});
// NOTE get a specifice tour by Id
app.get('/api/v1/tours/:id', (req, res) => {
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
});
//NOTE create a new tour
app.post('/api/v1/tours', function (req, res) {
  const id = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
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
});
//NOTE update user

app.patch('/api/v1/tours/:id', (req, res) => {
  const { name, duration } = req.body;
  const id = req.params.id * 1;
  const updatedTour = tours.find((e) => e.id === id);
  if (!updatedTour) {
    return res.status(404).send('Invalid Id');
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
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

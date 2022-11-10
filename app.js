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
// NOTE get a specifice tour
app.get('/api/v1/tours/:id', (req, res) => {
  const rId = req.params.id;
  const tour = tours.find((e) => e.id === +rId);

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
  const newTour = Object.assign({ id: id }, req.body);
  tours.push(newTour);
  fs.writeFile(
    './dev-data/data/tours-simple.json',
    JSON.stringify(tours),
    (err) => {
      console.log('done');
      res.status(201).send({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

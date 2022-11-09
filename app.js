const express = require('express');
const fs = require('fs');
const tours = require('./dev-data/data/tours-simple.json');
const app = express();
const port = 3000;

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 200,
    result: tours.length,
    data: {
      tours,
    },
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const fs = require('fs');

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`, 'utf-8')
);

exports.getAllTours = (req, res) => {
  console.log(req.requestTime);
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    results: tours.length,
    data: {
      tours,
    },
  });
};

exports.getTour = (req, res) => {
  console.log(req.params);

  const id = req.params.id * 1; //a trick to convert string to number
  const tour = tours.find((tour) => tour.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found',
    });
  }

  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    id: req.params.id,
    data: {
      tour: tour,
    },
  });
};

exports.createTour = (req, res) => {
  //console.log(req.body);
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
      if (err) {
        console.log(err);
      }
    }
  );
};

exports.updateTour = (req, res) => {
  const id = req.params.id * 1; //a trick to convert string to number

  if (!tours.find((tour) => tour.id === id)) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found',
    });
  }
  //this is showcase implementation we are nopt changing anything on the file
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  const id = req.params.id * 1; //a trick to convert string to number

  if (!tours.find((tour) => tour.id === id)) {
    return res.status(404).json({
      status: 'error',
      message: 'Tour not found',
    });
  }
  //this is showcase implementation we are not changing anything on the file
  //usually we will return 204 status code with null data
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

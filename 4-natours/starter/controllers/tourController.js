const Tour = require('../models/tourModel');

exports.getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    /*
    results: tours.length,
    data: {
      tours,
    },
    */
  });
};

exports.getTour = (req, res) => {
  res.status(200).json({
    status: 'success',
    requestedAt: req.requestTime,
    id: req.params.id,
    /*
    data: {
      tour: tour,
    },
    */
  });
};

exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error,
    });
  }
};

exports.updateTour = (req, res) => {
  //this is showcase implementation we are nopt changing anything on the file
  res.status(200).json({
    status: 'success',
    data: {
      tour: 'updated tour',
    },
  });
};

exports.deleteTour = (req, res) => {
  //this is showcase implementation we are not changing anything on the file
  //usually we will return 204 status code with null data
  res.status(204).json({
    status: 'success',
    data: null,
  });
};

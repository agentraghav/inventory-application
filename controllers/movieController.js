const { validationResult, body } = require('express-validator');
const async = require('async');
const fs = require('fs');
const Movie = require('../models/movie');
const Genre = require('../models/genre');

exports.movieList = (req, res, next) => {
  Movie.find().exec((err, movie) => {
    if (err) {
      return next(err);
    }
    res.render('movie_list', {
      movie,
    });
  });
};

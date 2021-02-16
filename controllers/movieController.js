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

exports.movieCreateGet = (req, res, next) => {
  Genre.find({}, 'name').exec((error, genre) => {
    if (error) {
      return next(error);
    }
    res.render('movie_form', {
      genre,
    });
  });
};

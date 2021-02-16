const { body, validationResult } = require('express-validator');
const async = require('async');

const Genre = require('../models/genre');
const Movie = require('../models/movie');

exports.index = (req, res, next) => {
  res.redirect('/genres');
};

exports.genreList = (req, res, next) => {
  Genre.find().exec((err, genre) => {
    if (err) {
      return next(err);
    }
    res.render('genre_list', {
      genre,
    });
  });
};

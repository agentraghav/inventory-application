const { body, validationResult } = require('express-validator');
const async = require('async');
const fs = require('fs');
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

exports.genreCreateGet = (req, res, next) => {
  res.render('genre_form');
};

exports.genreCreatePost = (req, res, next) => {
  const errors = validationResult(req);
  const { name } = req.body;
  const { image } = req.file.path;
  if (!errors.isEmpty()) {
    fs.unlink(image, (err) => {
      if (err) {
        return next(err);
      }
    });
    res.render('genre_form', {
      genre: req.body,
      errors: errors.array(),
    });
  } else {
    const genre = new Genre({
      name: name,
      image: image,
    });
    genre.save((error) => {
      if (error) {
        return next(error);
      }
      res.redirect(genre.url);
    });
  }
};

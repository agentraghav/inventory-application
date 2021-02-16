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

exports.genreDeleteGet = (req, res, next) => {
  const { id } = req.params;
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(id).exec(callback);
      },
      movie: (callback) => {
        Movie.findById({ genre: id }).exec(callback);
      },
    },
    (error, results) => {
      if (error) {
        return next(error);
      }

      if (results.genre === null) {
        const err = new Error('Not Found');
        err.status = 404;
        return next(error);
      }
      res.render('genre_delete', {
        genre: results.genre,
        movie: results.movie,
      });
    }
  );
};

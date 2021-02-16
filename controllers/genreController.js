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
        Movie.find({ genre: id }).exec(callback);
      },
    },
    (error, results) => {
      if (error) {
        return next(error);
      }

      if (results.genre === null) {
        const err = new Error('Not Found');
        err.status = 404;
        return next(err);
      }
      res.render('genre_delete', {
        genre: results.genre,
        movie: results.movie,
      });
    }
  );
};

exports.genreDeletePost = (req, res, next) => {
  const { id } = req.params;
  const { genreId } = req.body;
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(id).exec(callback);
      },
      movie: (callback) => {
        Movie.find({ genre: id }).exec(callback);
      },
    },
    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.genre === null) {
        const err = new Error('Not Found');
        err.status = 404;
        return next(err);
      }
      if (results.movie.length > 0) {
        res.render('genre_delete', {
          genre: results.genre,
          movie: results.movie,
        });
      } else {
        Genre.findByIdAndRemove(genreId, {}, (err) => {
          if (err) {
            return next(err);
          }
          res.redirect('/genres');
        });
      }
    }
  );
};

exports.genreUpdateGet = (req, res, next) => {
  const { id } = req.params;
  Genre.findById(id).exec((error, genre) => {
    if (error) {
      return next(error);
    }
    res.render('genre_form', {
      genre,
    });
  });
};

exports.genreUpdatePost = (req, res, next) => {
  const errors = validationResult(req);

  const { name } = req.body;
  const { id } = req.params;
  const { path } = req.file;
  const genre = new Genre({
    name: name,
    _id: id,
  });

  if (req.file) {
    Genre.image = path;
  }

  if (!errors.isEmpty()) {
    fs.unlink(path, (err) => {
      if (err) {
        return next(err);
      }
    });
    res.render('genre_form', {
      genre,
      errors: errors.array(),
    });
  } else {
    Genre.findByIdAndUpdate(id, genre, {}, (error, thegenre) => {
      if (error) {
        return next(error);
      }
      res.redirect(thegenre.url);
    });
  }
};

exports.genreMovie = (req, res, next) => {
  const { id } = req.params;
  async.parallel(
    {
      genre: (callback) => {
        Genre.findById(id).exec(callback);
      },
      movie: (callback) => {
        Movie.find({ genre: id }).exec(callback);
      },
    },
    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.genre === null) {
        const err = new Error('Not Found');
        err.status = 404;
        return next(err);
      }

      res.render('genre_movie', {
        genre: results.genre,
        movie: results.movie,
      });
    }
  );
};

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

exports.movieCreatePost = (req, res, next) => {
  const errors = validationResult(req);
  const { name, description, price, number_stock, genre } = req.body;
  const { image } = req.file.path;
  if (!errors.isEmpty()) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return next(err);
      }
    });
    Genre.find({}, 'name').exec((error, genre) => {
      res.render('movie_form', {
        movie: req.body,
        genre,
        errors: errors.array(),
      });
    });
  } else {
    const movie = new Movie({
      name: name,
      description: description,
      price: price,
      inStock: number_stock,
      genre: genre,
      image: image,
    });
    movie.save((error) => {
      if (error) {
        return next(error);
      }
      res.redirect(movie.url);
    });
  }
};

exports.movieDeleteGet = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id).exec((error, movie) => {
    if (error) {
      return next(error);
    }
    res.render('movie_delete', {
      movie,
    });
  });
};

exports.movieDeletePost = (req, res, next) => {
  const { movieId } = req.body;
  Movie.findByIdAndRemove(movieId, {}, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/movie');
  });
};

exports.movieUpdateGet = (req, res, next) => {
  const { id } = req.params;

  async.parallel(
    {
      movie: (callback) => {
        Movie.findById(id).exec(callback);
      },
      genre: (callback) => {
        Genre.find({}, 'name').exec(callback);
      },
    },
    (error, results) => {
      if (error) {
        return next(error);
      }
      if (results.movie === null) {
        const err = new Error('Movie not found');
        err.status = 404;
        return next(err);
      }
      res.render('movie_form', {
        movie: results.movie,
        genre: results.genre,
      });
    }
  );
};

exports.movieUpdatePost = (req, res, next) => {
  const errors = validationResult(req);
  const { name, description, price, number_stock, genre } = req.body;
  const { id } = req.params;
  const movie = new Movie({
    name: name,
    description: description,
    price: price,
    inStock: number_stock,
    genre: genre,
    _id: id,
  });

  if (req.file) {
    movie.image = req.file.path;
  }

  if (!errors.isEmpty()) {
    fs.unlink(req.file.path, (err) => {
      if (err) {
        return next(err);
      }
    });
    Genre.find({}, 'name').exec((error, genre) => {
      if (error) {
        return next(error);
      }
      res.render('movie_form', {
        movie,
        genre,
        errors: errors.array(),
      });
    });
  } else {
    Movie.findByIdAndUpdate(id, movie, {}, (error, themovie) => {
      if (error) {
        return next(error);
      }
      res.redirect(themovie.url);
    });
  }
};

exports.movieDetail = (req, res, next) => {
  const { id } = req.params;
  Movie.findById(id).exec((error, movie) => {
    if (error) {
      return next(error);
    }
    if (movie === null) {
      const err = new Error('Movie not found');
      err.status = 404;
      return next(err);
    }
    res.render('movie_details', {
      movie,
    });
  });
};

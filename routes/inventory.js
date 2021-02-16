const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const genre_controller = require('../controllers/genreController');
const movie_controller = require('../controllers/movieController');
const genre_validation = require('../validators/genreValidation');
const movie_validation = require('../validators/movieValidation');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/images');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

/* GET home page. */

router.get('/', genre_controller.index);

router.get('/genres', genre_controller.genreList);

router.get('/genres/create', genre_controller.genreCreateGet);

router.post(
  '/genres/create',
  upload.single('image'),
  genre_validation.genre_form_validation,
  genre_controller.genreCreatePost
);

router.get('/genres/:id/delete', genre_controller.genreDeleteGet);

router.post('/genres/:id/delete', genre_controller.genreDeletePost);

router.get('/genres/:id/update', genre_controller.genreUpdateGet);

router.post(
  '/genres/:id/update',
  upload.single('image'),
  genre_validation.genre_form_validation,
  genre_controller.genreUpdatePost
);

router.get('/genres/:id/movie', genre_controller.genreMovie);

router.get('/movie', movie_controller.movieList);

router.get('/movie/create', movie_controller.movieCreateGet);

router.post(
  '/movie/create',
  upload.single('image'),
  movie_validation.movie_form_validation,
  movie_controller.movieCreatePost
);

router.get('/movie/:id/delete', movie_controller.movieDeleteGet);
router.post('/movie/:id/delete', movie_controller.movieDeletePost);
router.get('/movie/:id/update', movie_controller.movieUpdateGet);
router.post(
  '/movie/:id/update',
  upload.single('image'),
  movie_validation.movie_form_validation,
  movie_controller.movieUpdatePost
);

router.get('/movie/:id', movie_controller.movieDetail);

module.exports = router;

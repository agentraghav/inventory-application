const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const genre_controller = require('../controllers/genreController');
const genre_validation = require('../validators/genreValidation');

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

module.exports = router;

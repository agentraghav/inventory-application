const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const genre_controller = require('../models/genre');
const movie_controller = require('../models/movie');

/* GET home page. */

router.get('/', genre_controller.index);

router.get('/genres', genreController.genreList);

module.exports = router;

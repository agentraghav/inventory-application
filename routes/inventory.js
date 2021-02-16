const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

const genre_controller = require('../controllers/genreController');

/* GET home page. */

router.get('/', genre_controller.index);

router.get('/genres', genre_controller.genreList);

router.get('/genres/create', genre_controller.genreCreateGet);
module.exports = router;

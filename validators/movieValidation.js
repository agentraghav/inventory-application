const { body } = require('express-validator');

exports.movie_form_validation = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Name must be specified.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Description must be specified.'),
  body('price')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Price must be specified.'),
  body('number_stock')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Number stock must be specified.'),
];

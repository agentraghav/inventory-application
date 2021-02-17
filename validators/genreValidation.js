const { body } = require('express-validator');

exports.genre_form_validation = [
  body('name')
    .trim()
    .isLength({ min: 1, max: 30 })
    .escape()
    .withMessage('Name must be specified.')
    .isAlphanumeric()
    .withMessage('Name has non-alphanumeric characters.'),
];

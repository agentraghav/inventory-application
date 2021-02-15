const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  title: { type: String, required: true, maxlength: 30 },
});

GenreSchema.virtual('url').get(function () {
  return '/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, maxlength: 30 },
  image: { type: String, required: true },
});

GenreSchema.virtual('url').get(function () {
  return '/genre/' + this._id;
});

module.exports = mongoose.model('Genre', GenreSchema);

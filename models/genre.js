const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GenreSchema = new Schema({
  name: { type: String, required: true, maxlength: 30 },
  image: { type: String, required: true },
});

GenreSchema.virtual('url').get(function () {
  return '/genres/' + this._id + '/movies';
});

module.exports = mongoose.model('Genre', GenreSchema);

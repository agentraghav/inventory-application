const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, required: true, maxlength: 5000 },
  inStock: { type: Number, required: true, max: 999, min: 0 },
  price: { type: Number, max: 999999, min: 0, required: true },
  genre: { type: Schema.Types.ObjectId, ref: 'Genre', required: true },
  fileName: { type: String },
});

MovieSchema.virtual('url').get(function () {
  return '/movie/' + this._id;
});

module.exports = mongoose.model('Movie', MovieSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DirectorSchema = new Schema({
  name: { type: String, required: true, maxlength: 100 },
  description: { type: String, maxlength: 500 },
});

DirectorSchema.virtual('url').get(function () {
  return '/director/' + this._id;
});

module.exports = mongoose.model('Director', DirectorSchema);

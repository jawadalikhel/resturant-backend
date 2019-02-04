const mongoose = require('mongoose');

const ResturantSchema = new mongoose.Schema({
  name: String,
  featured_image: String,
  cuisines: String,
  createdBy: String
})

module.exports = mongoose.model('Resturant', ResturantSchema);

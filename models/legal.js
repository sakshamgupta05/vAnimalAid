const mongoose = require('mongoose');

// Hospital Schema
const LegalSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  filename: {
    type: String,
    required: true
  }
});

const Legal = module.exports = mongoose.model('Legal', LegalSchema);

module.exports.getLegal = callback => {
  Legal.find({}, callback);
};

module.exports.addLegal = (legal, callback) => {
  legal.save(callback);
};

module.exports.deleteLegal = (id, callback) => {
  let query = {_id: id};
  Legal.remove(query, callback);
};

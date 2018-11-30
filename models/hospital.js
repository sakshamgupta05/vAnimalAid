const mongoose = require('mongoose');

// Hospital Schema
const HospitalSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  contact: [{
    type : String
  }],
  location: {
    lat: Number,
    lng: Number
  }
});

const Hospital = module.exports = mongoose.model('Hospital', HospitalSchema);

module.exports.getHospitalById = (id, callback) => {
  Hospital.findById(id, callback);
};

module.exports.getAllHostitals = callback => {
  Hospital.find({}, callback);
};

module.exports.addHospital = (hospital, callback) => {
  hospital.save(callback);
};

module.exports.editHospital = (hospital, id, callback) => {
  let query = { _id: id };

  if (!hospital.location) {
    delete hospital.location;

    let unset = {$unset: {location: 1 }};
    Hospital.update(query, unset, (err) => {
      if (err) {
        console.log(err);
      } else {
        Hospital.update(query, hospital, callback);
      }
    });
  } else {
    Hospital.update(query, hospital, callback);
  }
};

module.exports.deleteHospital = (id, callback) => {
  let query = {_id: id};
  Hospital.remove(query, callback);
};

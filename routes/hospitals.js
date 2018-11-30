const express = require('express');
const router = express.Router();
const passport = require('passport');
const Hospital = require('../models/hospital');

// Get all hospitals
router.get('/', (req, res) => {
  Hospital.getAllHostitals((err, hospitals) => {
    if (err) console.log(err);
    else {
      res.json(hospitals);
    }
  });
});

router.get('/hospital/:id', (req, res) => {
  Hospital.getHospitalById(req.params.id, (err, hospital) => {
    if (err) console.log(err);
    else {
      res.json(hospital);
    }
  });
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  let hospital = new Hospital ({
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    location: req.body.location
  });

  Hospital.addHospital(hospital, (err) => {
    if (err) {
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successfully added'});
    }
  });
});

router.post('/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
  let hospital = {
    name: req.body.name,
    address: req.body.address,
    contact: req.body.contact,
    location: req.body.location,
  };

  Hospital.editHospital(hospital, req.body._id, (err) => {
    if (err) {
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successful'});
    }
  });
});

router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  Hospital.deleteHospital(req.body.id, function (err) {
    if (err) {
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successfully Deleted'});
    }
  });
});

module.exports = router;

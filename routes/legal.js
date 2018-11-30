const express = require('express');
const router = express.Router();
const passport = require('passport');
const Legal = require('../models/legal');
const fs = require('fs');
var multer = require('multer');
var crypto = require("crypto");

var DIR = './public/assets/legal/';
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, DIR);
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      cb(null, raw.toString('hex') + Date.now() + '.' + 'pdf');
    });
  }
});
var upload = multer({ storage: storage }).single('photo');

router.get('/', (req, res) => {
  Legal.getLegal((err, legalList) => {
    if (err) console.log(err);
    else {
      res.json(legalList);
    }
  });
});

router.post('/upload', passport.authenticate('jwt', {session: false}), function (req, res, next) {
  var path = '';
  upload(req, res, function (err) {
    if (err) {
      console.log('Error: '+err);
      return res.json({success: false, msg: 'Error'});
    }
    path = req.file.path;
    let lastslashindex = path.lastIndexOf('/');
    path = path.substring(lastslashindex  + 1);
    return res.json({success: true, msg: path});
  });
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  let legal = new Legal ({
    title: req.body.title,
    filename: req.body.filename
  });

  Legal.addLegal(legal, (err) => {
    if (err) {
      console.log('Error: '+err);
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successfully added'});
    }
  });
});

router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  Legal.deleteLegal(req.body.id, function (err) {
    if (err) {
      console.log('Error: '+err);
      res.json({success: false, msg: 'Error'});
    } else {
      fs.unlink('./public/assets/legal/'+req.body.filename, (err) => {
        if (err) {
        console.log('Error: '+err);
          return res.json({success: false, msg: 'Error'});
        } else {
          return res.json({success: true, msg: 'Successfully Deleted'});
        }
      });
    }
  });
});

module.exports = router;

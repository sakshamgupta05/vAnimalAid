const express = require('express');
const router = express.Router();
var multer = require('multer');
const nodemailer = require('nodemailer');
const fs = require('fs');

var DIR = './uploads/';
var upload = multer({dest: DIR}).single('photo');

router.post('/upload', function (req, res, next) {
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

router.post('/submit', function (req, res, next) {
  let details = {
    animal: req.body.animal,
    name: req.body.name,
    mobile: req.body.mobile,
    email: req.body.email,
    location: req.body.location,
    landmark: req.body.landmark,
    message: req.body.message,
    filename: req.body.filename
  };

  var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: process.env.user,
        pass: process.env.pass
    }
  });

  var mailOptions = {
      from: `"Animal Aid " <${process.env.user}>`, // sender address (who sends)
      to: process.env.to, // list of receivers (who receives)
      subject: 'Rescue', // Subject line
      text: 'Rescue', // plaintext body
      html: '<b>Animal:</b> '+details.animal+'<br><b>Name:</b> '+details.name+'<br><b>Mobile:</b> '+details.mobile+'<br><b>Email:</b> '+details.email+'<br><b>Location:</b> '+details.location+'<br><b>Landmark:</b> '+details.landmark+'<br><b>Message:</b> '+details.message,
      attachments: [
  	    {
  	    	filename: 'image.jpg',
          path: './uploads/'+details.filename // stream this file
  	    }
      ]
  };

  transporter.sendMail(mailOptions, function(err, info){
      if(err){
          console.log('Error: '+err);
          return res.json({success: false, msg: 'Error'});
      }

      fs.unlink('./uploads/'+details.filename, (err) => {
        if (err) {
            console.log('Error: '+err);
            return res.json({success: false, msg: 'Error'});
        } else {
            return res.json({success: true, msg: 'success'});
        }
      });

  });
});

module.exports = router;

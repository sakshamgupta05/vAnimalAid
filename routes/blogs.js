const express = require('express');
const router = express.Router();
const passport = require('passport');
const config = require('../config/database');
const Blog = require('../models/blog');

// Get Blogs
router.get('/:skip', (req, res) => {
  Blog.getBlogs(req.params.skip, (err, blogs) => {
    if (err) console.log(err);
    Blog.getTotalNoOfBlogs((err, total) => {
      if (err) console.log(err);
      else {
        res.json({
          total: total,
          blogs: blogs
        });
      }
    });
  });
});

router.get('/post/:id', (req, res) => {
  Blog.getBlogById(req.params.id, (err, blog) => {
    if (err) console.log(err);
    else {
      res.json(blog);
    }
  });
});

router.post('/add', passport.authenticate('jwt', {session: false}), (req, res) => {
  let blog = new Blog ({
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    short: req.body.short,
    date: new Date()
  });

  Blog.addBlog(blog, (err) => {
    if (err) {
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successfully added'});
    }
  });
});

router.post('/edit', passport.authenticate('jwt', {session: false}), (req, res) => {
  let blog = {
    title: req.body.title,
    author: req.body.author,
    body: req.body.body,
    short: req.body.short,
  };

  Blog.editBlog(blog, req.body._id, (err) => {
    if (err) {
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successful'});
    }
  });
});

router.post('/delete', passport.authenticate('jwt', {session: false}), (req, res) => {
  Blog.deleteBlog(req.body.id, function (err) {
    if (err) {
      res.json({success: false, msg: 'Error'});
    } else {
      res.json({success: true, msg: 'Successfully Deleted'});
    }
  });
});

module.exports = router;

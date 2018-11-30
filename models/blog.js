const mongoose = require('mongoose');
const config = require('../config/database');

// Blog Schema
const BlogSchema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  short: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  }
});

const Blog = module.exports = mongoose.model('Blog', BlogSchema);

module.exports.getBlogById = (id, callback) => {
  Blog.findById(id, callback);
};

module.exports.getBlogs = (skip, callback) => {
  Blog.find({}, {body: 0}, callback).sort({date: -1}).skip((parseInt(skip)-1)*5).limit(5);
};

module.exports.getTotalNoOfBlogs = (callback) => {
  Blog.count(callback);
};

module.exports.addBlog = (blog, callback) => {
  blog.save(callback);
};

module.exports.editBlog = (blog, id, callback) => {
  let query = { _id: id };
  Blog.update(query, blog, callback);
};

module.exports.deleteBlog = (id, callback) => {
  let query = {_id: id};
  Blog.remove(query, callback);
};

const mongoose = require('mongoose')
const Schema = require('../schema.js')

const Post = mongoose.model('Post', Schema.PostSchema)

module.exports = Post
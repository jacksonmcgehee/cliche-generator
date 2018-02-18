const mongoose = require('mongoose')
const Schema = require('../schema.js')

const Response = mongoose.model('Response', Schema.ResponseSchema)

module.exports = Response
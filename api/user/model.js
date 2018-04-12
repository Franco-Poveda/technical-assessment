'use strict'

var mongoose = require('mongoose')
require('mongoose-type-url')

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 4
  },
  avatar: {
    type: mongoose.SchemaTypes.Url,
    required: true
  }
})

schema.methods = {
  view () {
    let view = {}
    let fields = ['_id', 'name', 'avatar']
    fields.forEach((field) => { view[field] = this[field] })
    return view
  }
}

module.exports = mongoose.model('user', schema, 'user')

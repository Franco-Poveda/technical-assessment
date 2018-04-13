'use strict'

const mongoose = require('mongoose')
const idvalidator = require('mongoose-id-validator')

const schema = new mongoose.Schema({
  userId: {
    match: /^[a-fA-F0-9]{24}$/,
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'user',
    required: true
  },
  title: { type: String, required: true },
  text: { type: String, required: true },
  tags: { type: [String] }
})

schema.methods = {
  view(full) {
    let view = {}
    let fields = ['title', 'text', 'tags']
    if (full) {
      fields = [...fields, '_id', 'userId']
    }

    fields.forEach((field) => { view[field] = this[field] })

    return view
  }
}
schema.plugin(idvalidator)
module.exports = mongoose.model('article', schema, 'article')

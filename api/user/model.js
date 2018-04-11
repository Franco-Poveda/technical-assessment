var mongoose = require('mongoose');
require('mongoose-type-url');

const schema = new mongoose.Schema({
  name : String,
  avatar: mongoose.SchemaTypes.Url,
});

schema.methods = {
    view (full) {
      let view = {}
      let fields = ['name', 'avatar']

  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
  }

  module.exports = mongoose.model('user', schema, 'user')
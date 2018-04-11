var mongoose = require('mongoose');



const schema = new mongoose.Schema({
  userId : mongoose.Schema.Types.ObjectId,
  title : String,
  text  : String,
  tags: [{ type: String}]
});

schema.methods = {
    view (full) {
      let view = {}
      let fields = ['title', 'text', 'tags']

  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
  }

  module.exports = mongoose.model('article', schema, 'article')


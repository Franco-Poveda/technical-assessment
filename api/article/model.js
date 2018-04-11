var mongoose = require('mongoose');



const schema = new mongoose.Schema({
  userId : {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
  title : String,
  text  : String,
  tags: [{ type: String}]
});

schema.methods = {
    view (full) {
      let view = {}
      let fields = ['title', 'text', 'tags']
      if (full) {
        fields = [...fields, '_id', 'userId']
      }
  
      fields.forEach((field) => { view[field] = this[field] })
  
      return view
    }
  }

  module.exports = mongoose.model('article', schema, 'article')


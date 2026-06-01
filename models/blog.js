const mongoose = require ("mongoose")

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number
})

blogSchema.set("toJSON", {
  transform: function(doc, modifiedDoc){
    modifiedDoc.id = doc._id.toString()
    delete modifiedDoc._id
    delete modifiedDoc.__v
    return modifiedDoc 
  }
})

const Blog = new mongoose.model("Blog", blogSchema)

module.exports = Blog
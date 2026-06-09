const mongoose = require ("mongoose")

const blogSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 }
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
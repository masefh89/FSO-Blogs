const Blog = require ("../models/blog")

const initializBlog = [
  {
    "title": "kuzy&guney",
    "author": "kuzey&cemre",
    "url": "www.mohammmed.com",
    "likes": 2
    
  },
  {
    "title": "deha",
    "author": "sir alex fegusen",
    "url": "www.mohammmed.com",
    "likes": 2
    
  }
]
const nonExistingId = async () => {
  const newBlog =new Blog ({
    "title": "bth",
    "author": "sir alex fegusen",
    "url": "www.mohammmed.com",
    "likes": 2
  })
  await newBlog.save()     
  await newBlog.deleteOne()
  return newBlog._id.toString()
  
}
const blogInDb = async () => {
  const allBlogs = await Blog.find({})
  return allBlogs.map(blog => blog.toJSON())
}

module.exports={ 
  initializBlog, nonExistingId, blogInDb
}
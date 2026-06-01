const blogRouter = require ("express").Router()
const Blog = require ("../models/blog")

blogRouter.get("/", (req, res) => {
  Blog.find({}).then(result => {
    res.json(result)
  })
})

blogRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id).then(resultBlog => {
    if(!resultBlog){ return res.status(404).end()}
    res.json(resultBlog)
  }).catch(next)
})

blogRouter.post("/", (req, res, next) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  blog.save().then( savedBlog => { return res.json(savedBlog)})
    .catch(next)
  
})

blogRouter.put("/:id", (req, res, next) => {
  const { title, author, url, likes } = req.body
  Blog.findById(req.params.id).then( blog => {
    if(!blog){ return res.status(404).end()}
    blog.title = title
    blog.author = author
    blog.url = url
    blog.likes = likes || 0
    blog.save().then(updatedBlog => { res.json(updatedBlog) })
      .catch(next)
  }).catch(next)
})

blogRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id).then( () => {
    res.status(204).end()
  }).catch(next)
})
module.exports= blogRouter
const blogRouter = require ("express").Router()
const Blog = require ("../models/blog")

blogRouter.get("/", async (req, res) => {
  const allBlogsInDb = await Blog.find({})
  res.json(allBlogsInDb)
  
})

blogRouter.get("/:id", async (req, res) => {
  const theBlog = await Blog.findById(req.params.id)
  if(!theBlog){ return  res.status(404).end()}
  res.json(theBlog)
})

blogRouter.post("/", async (req, res) => {
  const body = req.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0
  })
  const savedBlog = await blog.save()
  res.status(201).json(savedBlog)
})

blogRouter.put("/:id", async (req, res) => {
  const { title, author, url, likes } = req.body
  const blogToUpdate = await Blog.findByIdAndUpdate(req.params.id,
    { title, author, url, likes },
    { returnDocument: "after", runValidators: true }
  )
  res.status(200).json(blogToUpdate)
})

blogRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id)
  res.status(204).end()
  
})
module.exports= blogRouter
const { test, beforeEach, after, describe } = require ("node:test")
const  app  = require ("../app")
const  supertest  = require ("supertest")
const  assert  = require ("node:assert")
const helper = require ("./test_helper")
const Blog = require ("../models/blog")
const mongoose = require ("mongoose")
const api = supertest(app)
beforeEach( async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initializBlog)
})

test("count of the blogs and their format", async () => {
  const allBlogsInDb = await api.get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  assert.strictEqual(allBlogsInDb.body.length, helper.initializBlog.length)
})
test("count of the blogs and their format", async () => {
  const allBlogsInDb = await api.get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)
  const firstBlog = allBlogsInDb.body[0]
  assert(firstBlog.id)

})

test("sending a new blog via post method", async () => {
  const newBlog = {
    "title": "GOT",
    "author": "dance of drogons",
    "url": "www.mohammmed.com",
    "likes": 2
  }
  await api.post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const allBlogsInDb = await helper.blogInDb()
  assert.strictEqual(allBlogsInDb.length, helper.initializBlog.length +1)
  const allTitles = allBlogsInDb.map(blog => blog.title)
  assert(allTitles.includes("GOT"))
})

test("if like is missing", async () => {
  const newBlog = {
    "title": "GOT",
    "author": "dance of drogons",
    "url": "www.mohammmed.com"
  }
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/)
  const allBlogsInDb = await helper.blogInDb()
  const blogWithZeroLike = allBlogsInDb.filter(blog => blog.likes === 0)
  assert.strictEqual(blogWithZeroLike[0].likes, 0)
})
describe("if something is missing", () => {
  test("if title is missing", async () => {
    const newBlog = {
      
      "author": "dance of drogons",
      "url": "www.mohammmed.com"
    }
    await api.post("/api/blogs")
      .send(newBlog)
      .expect(400)
    const allBlogsInDb = await helper.blogInDb()
    assert.strictEqual(allBlogsInDb.length, helper.initializBlog.length)
  })
  test("if URL is missing", async () => {
    const newBlog = {
      "title": "GOT",
      "author": "dance of drogons",
      
    }
    await api.post("/api/blogs")
      .send(newBlog)
      .expect(400)

    const allBlogsInDb = await helper.blogInDb()
    assert.strictEqual(allBlogsInDb.length, helper.initializBlog.length)
  })
})

test("deleteing a single blog", async () => {
  const allBlogsInDb = await helper.blogInDb()
  const blogToDelete = allBlogsInDb[0]
  await api.delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  const allBlogsAfterDelete = await helper.blogInDb()
  assert.strictEqual(allBlogsAfterDelete.length, helper.initializBlog.length -1)
  const allId = allBlogsAfterDelete.map(blog => blog.id)
  assert(!allId.includes(blogToDelete.id))
})

test("updating like for specific blog", async () => {
  const allBlogsInDb = await helper.blogInDb()
  let selectedBlog = allBlogsInDb[0]
  selectedBlog.likes = 10
  console.log(selectedBlog)
  
  await api.put(`/api/blogs/${selectedBlog.id}`)
    .send(selectedBlog)
    .expect(200)
  
  const allBlogsAfterUpdate = await helper.blogInDb()
  const theBlog = allBlogsAfterUpdate.find(blog => blog.title === selectedBlog.title)
  assert.strictEqual(theBlog.likes, 10)
})
after( async () => {
  await mongoose.connection.close()
})
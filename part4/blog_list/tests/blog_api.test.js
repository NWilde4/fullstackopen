const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "first blog",
    author: "first author",
    url: "http://first.com",
    likes: 1
  },
  {
    title: "second blog",
    author: "second author",
    url: "http://second.com",
    likes: 2
  },  
  {
  title: "random blog",
  author: "random author",
  url: "http://random.com",
  likes: 3
  },  
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

test('the correct number of blogs is returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialBlogs.length) 
})

test('a blog can be added', async () => {
  const newBlog = {
    title: "test title",
    author: "tester",
    url: "http://abc.com",
    likes: 10
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const titles = response.body.map(r => r.title)

  expect(response.body).toHaveLength(initialBlogs.length + 1)
  expect(titles).toContain(
      'test title'
    )
})

test('id property exists', async () => {
  const blogs = await Blog.find({})
  const firstBlog = await blogs[0].id

  expect(firstBlog).toBeDefined()
})

test('a blog without likes specified will have 0 likes by default', async () => {
  const newBlog = {
    title: 'test blog',
    author: 'test author',
    url: 'http://testurl.com',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')

  const likesArray = response.body.map(r => r.likes)
  expect(likesArray[likesArray.length - 1]).toBe(0)
})

test('a new blog without title or url will respond with 400', async () => {
  const newBlog = {
    author: 'lazy guy',
    likes: 111
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})


const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const api = supertest(app)
const Blog = require('../models/blog')

const initialblogs = [
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
  {
    title: 'cien vidas en soledad',
    author: 'edgar alan poe',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  },
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(initialblogs[0])
  await blogObject.save()
  blogObject = new Blog(initialblogs[1])
  await blogObject.save()
},10000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)


test('devolver todos los blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(initialblogs.length)
})

test('buscar un blog especifico por el titulo', async () => {
  const response = await api.get('/api/blogs')

  const title = response.body.map(r => r.title)
  expect(title).toContain(
    'cien vidas en soledad'
  )
})

test('identificar el id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('validar nuevo blog ', async () => {
  const initialResponse = await api.get('/api/blogs')

  const newBlog = {
      title: "Full Stack",
      author: "StackMaster",
      url: "https://stack.com/",
      likes: 1
  }

  await api
      .post('/api/blogs')
      .send(newBlog)

  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(initialResponse.body.length + 1)
})
 
test('identifying likes', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].likes).toBeDefined()
}) 


test("error 400 si el blog no cuenta con url o titulo", async () => {
  const blog = { 
      author: "StackMaster",
      likes: 1
     };

  await api
    .post("/api/blogs")
    .send(blog)
    .expect(400);
});
 

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'cf255',
      name: 'andrews',
      password: 'crichily',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test('creation fails with proper statuscode and message if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'salainen',
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })

})

afterAll(() => {
  mongoose.connection.close()
})
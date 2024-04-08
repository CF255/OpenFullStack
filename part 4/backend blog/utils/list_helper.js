const User = require('../models/user')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, current) => total + current.likes, 0)
}

const favoriteBlog = (blogs) => {
  let likes = blogs.map(blog => blog.likes)
  let index = likes.indexOf(Math.max(...likes))
  return blogs[index]
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  usersInDb,
}
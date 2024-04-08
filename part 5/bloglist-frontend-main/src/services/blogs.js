import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
import User from '../components/User'

let token;
const config = () => ({
  headers: {
    Authorization: token,
  },
});

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  const response = await axios.post(baseUrl, newObject, config())
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${ baseUrl }/${id}`, newObject)
  return request.then(response => response.data)
}

const likeBlog = (blog) =>{
  const likeBlog = blog
  likeBlog.likes = blog.likes + 1
  return axios.put(`${baseUrl}/${blog.id}`, likeBlog)
}

export default { getAll, create, update, setToken }

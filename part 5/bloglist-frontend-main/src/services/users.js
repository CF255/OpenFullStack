import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'
let token;
const config = () => ({
  headers: {
    Authorization: token,
  },
});

const setToken = (rawToken) => {
  token = `Bearer ${rawToken}`;
};


const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {

  const response  = await axios.post(baseUrl, newObject,config())
  return response.data
}

export default {setToken,  getAll, create }
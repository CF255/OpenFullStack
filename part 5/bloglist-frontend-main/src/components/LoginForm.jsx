
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'

import { useState, useEffect } from 'react'

import Notification from './Notification'
import blogService from '../services/blogs'
import loginService from '../services/login'
import About from './About'
import Footer  from './Footer'
import Home from './Home'
import Menu from './Menu'
import Users from './Users'
import CreateAnecdote from './CreateAnecdote'
import Anecdote from './Home'
import Anecdotes from './Home'


const LoginForm = () =>{
    
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [id, setId] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')
  const [blogs, setBlogs] = useState([])
  
  useEffect(() => {
    blogService
      .getAll()
      .then(blogs =>
        setBlogs( blogs )
      )

  }, [])
  
  
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }, [])
  
    const handelLogout = async () => {
      await window.localStorage.removeItem('loggedBlogappUser')
      setUser(null)
    }
  
    const handleLogin = async (event) => {
      event.preventDefault()
  
      try {
        const user = await loginService.login({
          username, password, id
        })
        window.localStorage.setItem(
          'loggedBlogappUser', JSON.stringify(user)
          
        )
        setUser(user)
        blogService.setToken(user.token);
        setUsername('')
        setPassword('')
        setId('')
  
      } catch (exception) {
        setErrorMessage('Wrong username or password')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
      console.log('logging in with', username, password)
    }
  
    const loginForm = () => (

      <form onSubmit={handleLogin}>
        <div>
          <h2>log in to applicacion</h2>
        </div>
        <Notification message={errorMessage}
          />
        <div>
            username
          <input
          id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
          id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button" type="submit">login</button>
      </form>
    ) 
  
    return(
  <>
  {user === null ?
          loginForm() :
      
          <div>
            
  <Router>
        <div>
          <h1>APP BLOG</h1>
          {user.name} logged-in 
            <button onClick={handelLogout} className="logout">Logout</button>
       </div>
       <br></br>
          <Menu />
           <Routes>    
           <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />  
           <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/users" element={<Users />} />
            <Route path="/create" element={<CreateAnecdote />} />
            <Route path="/" AnecdoteList={<AnecdoteList blogs={blogs} />} />
          </Routes>
          </Router>
          </div>
        }
  <br></br>
  
  <Footer/>
  
  </>
  
      
    )
  }


  export default LoginForm
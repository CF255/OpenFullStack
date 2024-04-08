import { useState, useEffect } from 'react'
import Blog from './Blog'
import axios from 'axios'
import Notification from './Notification'
import blogService from '../services/blogs'


const CreateAnecdote = () =>{
    const [blogs, setBlogs] = useState([])
    const [newtitle, setNewTitle] = useState('')
    const [newauthor, setNewAuthor] = useState('')
    const [newurl, setNewUrl] = useState('')
    const [user, setUser] = useState(null)
    const [loginVisible, setLoginVisible] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState('')
    const [addMessage, setAddMessage] = useState('')
    const [nullMessage, setNullMessage] = useState('')
  
    useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
      blogService
        .getAll()
        .then(blogs =>
          setBlogs( blogs )
        )
  
    }, [])
  
    
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
  
    const addNewBlog =(event) => {
  
      if(!newtitle || !newauthor || !newurl){
        event.preventDefault()
        setNullMessage(
          `Completar todas las casillas`
        )
        setTimeout(() => {
          setNullMessage(null)
        }, 3000)
      }else{
  
      event.preventDefault()
      const BlogObject = {
        title: newtitle,
        author: newauthor,
        url: newurl 
  
      }
  
      blogService
        .create(BlogObject)
        .then(returnedBlog => {
  
          blogService.setToken(user.token)
          setBlogs(blogs.concat(returnedBlog))
          setNewTitle('')
          setNewAuthor('')
          setNewUrl('')
          setLoginVisible(false)
          setAddMessage(
            `a new blog ${newtitle} by ${newauthor}`
          )
          setTimeout(() => {
            setAddMessage(null)
          }, 3000)
        })
      }
      
  
    }
  
    const handleauthorchange = (event) => {
      console.log(event.target.value)
      setNewAuthor(event.target.value)
    }
  
    const handleurlchange = (event) => {
      console.log(event.target.value)
      setNewUrl(event.target.value)
    }
  
    const handletitlechange = (event) => {
      console.log(event.target.value)
      setNewTitle(event.target.value)
    }
  
    const btnDelete = (id) => {
  
      const confirm =  window.confirm('Desea eliminar el blog?')
  
      if(confirm){
        axios.delete('http://localhost:3003/api/blogs/' + id)
          .then (res => {
       
          }).catch(err => {
            console.log(err)
          })
        setDeleteMessage(
          'the blog has delete from server'
        )
        setTimeout(() => {
          setDeleteMessage(null)
        }, 3000)
  
        setBlogs(blogs.filter(n => n.id !==id))
  
      }
    }
    
    return(
      <>
   <Notification 
            addmessage={addMessage}
            deletemessage={deleteMessage}
            nullmessage={nullMessage}
          />
  
      <div style={hideWhenVisible}>
  
     <button onClick={() => setLoginVisible(true)}>create new anecdote</button>
      </div>
      <form style={showWhenVisible} onSubmit={addNewBlog}>
      <h2>create new anecdote</h2>
     <label >Title: </label>
      <input id="idtitle" value = {newtitle}
           onChange={handletitlechange} />
             <br />
         <label >Author: </label>
         <input id="idautor" value = {newauthor}
      onChange={handleauthorchange}  />
         <br />
         <label >Url: </label>
         <input id="idurl"value = {newurl}
      onChange={handleurlchange}  />
         <br />
         <button id='btncreate' type="submit">create</button>
         <br></br>
         <button type="text" onClick={() => setLoginVisible(false)}>cancel</button>
         </form>
  
        <div>
        <br></br>
        <div>
         {blogs.map(blog =>
        <Blog key={blog.id} blog={blog}
        toggleImportance={() => btnDelete(blog.id)} />
     )}
      </div>
      </div>
      </>
    )
  } 
  
  export default CreateAnecdote
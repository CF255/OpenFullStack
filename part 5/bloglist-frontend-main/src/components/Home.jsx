
import {
  BrowserRouter as Router,
  Routes, useParams, Link
} from 'react-router-dom'
import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import Blog from './Blog'


const AnecdoteList = ({ blogs }) => (
  <div>
    <h2>Anecdotes</h2>
    <ul>
      {blogs.map(blog => 
      <li key={blog.id} >
       <Link to={`/anecdotes/${blog.id}`}>{blog.content}</Link>
       </li>)}
    </ul>
  </div>
)

const Anecdote = ({blogs}) =>{
  const id = useParams().id
  const blog = blogs.find(a => a.id === Number(id))
  return(
    <div>
        <h2>{blog.title} by {blog.author}</h2>
      <div>has {blog.votes} votes</div>
      <div>for more information <a href={blog.info}>{blog.info}</a></div>
   </div>
  )
}




const Home = () =>{
    const [blogs, setBlogs] = useState([])
  
    useEffect(() => {
      blogService
        .getAll()
        .then(blogs =>
          setBlogs( blogs )
        )
  
    }, [])

  
  
    return(
      <>
      <h1>Blogs</h1>

{blogs.map(blog => 
      <li key={blog.id} >
       <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
       </li>)}
      </>
    )
  }


  export default Home
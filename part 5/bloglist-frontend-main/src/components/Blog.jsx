


import { useState, useEffect } from 'react'

const Button =({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const handleVote = () => {

}


const Blog = ({ blog,toggleImportance }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const [blogVisible, setBlogVisible] = useState(false)
  const bloghideWhenVisible = { display: blogVisible ? 'none' : '' }
  const blogshowWhenVisible = { display: blogVisible ? '' : 'none' }

  return(
    <div style={blogStyle} >
      {blog.title} <button style={blogshowWhenVisible} onClick={() => setBlogVisible(false)}>hide</button> <button style={bloghideWhenVisible} onClick={e => setBlogVisible(blog.id)}>view</button>
      <br />

      <div className='blog' style={blogshowWhenVisible}>
        {blog.author}
        <br />
        <a href={blog.url} >{blog.url}</a> {/* {blog.url} */}
        <br />
        {blog.likes}<Button handleClick={handleVote} text='Vote'/>
        <br />

        <button onClick={e => toggleImportance(blog.id)}>delete</button>
      </div>
    </div>
  )}

export default Blog
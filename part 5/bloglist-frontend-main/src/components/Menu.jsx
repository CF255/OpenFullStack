import {
    BrowserRouter as Router, Link
  } from 'react-router-dom'
  

const Menu = () =>{
    const padding = {
      padding: 5
    }
    return(
     
      <div>
        <Link style={padding} to="/home">home</Link>
        <Link style={padding} to="/create">create new</Link>
        <Link style={padding} to="/about">about</Link>
        <Link style={padding} to="/users">users</Link>
      </div>
   
    )
  }
  
  export default Menu
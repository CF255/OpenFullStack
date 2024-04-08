import { useState, useEffect } from 'react'
import usersService from '../services/users'
import User from './User'

const Users = () =>{
    const [users, setUsers]= useState([])
    useEffect(() => {
  
      usersService
        .getAll()
        .then(user =>
          setUsers (user)
        )
    }, [])
  
    return(
  <div>
  <h1>Users</h1>
  
            {users.map(user =>
               <User key={user.id} user={user} />
                )}
           </div>
    )
  }


  export default Users
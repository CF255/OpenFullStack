import React from 'react'
import ReactDOM from 'react-dom/client'
import axios from 'axios'
import App from './App'
import './index.css'

const promise = axios.get('http://localhost:3001/api/persons')
console.log(promise)

/*  const promise2 = axios.get('http://localhost:3001/foobar')
console.log(promise2) 
 */



const agendas = [
  {
    id: 1,
    name: 'ANA',
    number:'000',
    important: true
  }
]


  ReactDOM.createRoot(document.getElementById('root')).render(<App agendas={agendas} />)


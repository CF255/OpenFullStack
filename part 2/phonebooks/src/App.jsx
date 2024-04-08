
import { useState, useEffect} from 'react'
import Agenda from './components/Agenda'
import Notification from './components/Notification'
import agendaService from './services/agendas'
import axios from 'axios'



const App = () => {
  const [agendas, setNames] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showAll, setShowAll] = useState(true) 
  const [errorMessage, setErrorMessage] = useState('')
  const [addMessage, setAddMessage] = useState('')
  const [morenamemessage, setMoreMessage] = useState('')


   useEffect(() => {
    agendaService
    .getAll()
    .then(initialPersons =>{
      setNames(initialPersons)
    })
  }, [])
  
  console.log('render', agendas.length, 'notes')


  const addNewPerson = (event) =>{

     
          event.preventDefault()
          const personObject = {
            name: newPerson,
            number: newNumber,
            important: Math.random()< 0.5,
            id: (agendas.length + 1).toString(),
        }
        
         agendaService
         .create(personObject)
        .then(returnedPerson =>{
          setNames(agendas.concat(returnedPerson))
          setNewPerson('')
          setNewNumber('')
          setAddMessage(
            `add contact in the server`
           )
           setTimeout(() => {
              setAddMessage(null)
           }, 3000);
         })
         .catch(error =>{
          setMoreMessage(
            `el nombre necesita mas de 3 caracteres y el numero debe incluir 8 caracteres`
          )
          setTimeout(() => {
            setMoreMessage(null)
         }, 3000);
          console.log(error.response.data.error)
         })
             
  }


  const handlePersonChange = (event) =>{
    console.log(event.target.value)
    setNewPerson(event.target.value)
  }

  const handleNumberChange = (event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const btnDelete = (id) => {

      const confirm =  window.confirm("Desea eliminar el contacto?")

      if(confirm){
        axios.delete(`http://localhost:3001/api/persons/` + id)
        .then (res =>{
          navigate('/')
        }).catch(err =>{
          setErrorMessage(
            `Contact has already removed from server`
          )
          setTimeout(()=>{
            setErrorMessage(null)
          }, 3000)
          
          
        })
        setNames(agendas.filter(n=>n.id !==id))
        console.log(err) 
     /*   window.location.replace('');  */
       
      }
  }

  const notesToShow = showAll
  ? agendas
  : agendas.filter(persons => persons.important) 

  return (
    <div>
      <h1>Phonebooks</h1>
        <Notification message={errorMessage}
        addmessage={addMessage}
        morenamemessage={morenamemessage}
        />
        <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all' }
        </button>
      </div> 
        <br></br>

        <form onSubmit={addNewPerson}>
          
          <label >name: </label>
          <input id="inname" value = {newPerson}
          onChange={handlePersonChange} /> 
          <br />
          <label >number: </label>
          <input value = {newNumber}
          onChange={handleNumberChange}  /> 
          
          <br />
          <button type="submit">save</button>

        </form>

        <h2>Numbers</h2>
        <ul>
        {notesToShow.map((persons, i) =>
        <Agenda
         key={i} 
         persons={persons}
        toggleImportance={() => btnDelete(persons.id)} />
        
        )}

      
      </ul>
    </div>
  )
}

export default App
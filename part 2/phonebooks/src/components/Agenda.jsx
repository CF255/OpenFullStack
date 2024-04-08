import agendas from "../services/agendas"

const Agenda = ({ persons, toggleImportance }) => {

  const label = persons.important
      ? 'Delete' : 'Delete'


    return (
      <li>{persons.name} {persons.number}  <button onClick={e => toggleImportance(persons.id)}>{label}</button> </li>
      
    )
  }


  export default Agenda
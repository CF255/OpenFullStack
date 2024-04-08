import { useSelector, useDispatch } from 'react-redux'
import { createStore } from 'redux'
import anecdoteReduce from './reducers/anecdoteReducer'



const store = createStore(anecdoteReduce)

const App = () => {
  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    store.dispatch(createNote(content))
  }

  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id, anecdote) => {
    console.log('vote', id)
    store.dispatch({
      type: 'VOTE'
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={addNote}>
        <div><input name="note" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App
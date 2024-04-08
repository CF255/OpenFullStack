import { useState } from 'react'

/* const Header = (header) =>{
  return(
    <h1>{header.tittle}</h1>
  )
}

const Motions = (motions) =>{
  return(
    <h3>{motions.motions}</h3>
  )
}

const Button =({ handleClick, text}) =>(
  <button onClick={handleClick}>
    {text}
  </button>
)


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const tittle  = {name:'Greeating',
  subti: 'Statist'
  }

  const motions = {motion1: "Goog",
motion2: 'neutral',
motion3: 'bad'}

const handleGoodClick = () =>{
  setGood(good + 1)
}
const handleNeutralClick = () =>{
  setNeutral(neutral + 1)
}
const handleBadClick = () =>{
  setBad(bad + 1)
}
  

  return (
    <div>
      
      <Header tittle = {tittle.name}/>
      <Button handleClick={handleGoodClick} text = 'good'/>
      <Button handleClick={handleNeutralClick} text = 'Neutral'/>
      <Button handleClick={handleBadClick} text = 'Bad'/>

      <Header tittle = {tittle.subti} />

      <Motions motions = {motions.motion1} />
      {good}
      <Motions motions = {motions.motion2} />
      {neutral}
      <Motions motions = {motions.motion3} />
      {bad}

    </div>
  )

}
 */

const History = (histo) =>{
  if(histo.good.length || histo.neutral.length || histo.bad.length === 0)
  return(
<div>
  No feedback given
</div>
)
return(
  <div>
   
  press Motion: {histo.all.join(' ')}
  </div>
)
}

const Header = (header) =>{
  return(
    <h1>{header.tittle}</h1>
  )
}

const Stadist = (stadist) =>{
  return(
    <h3>{stadist.stadistis}</h3>
  )
}

const Motions = (motions) =>{
  return(
    <h3>{motions.motions}</h3>
  )
}

const Button =({ handleClick, text, cont}) =>(
  <button onClick={handleClick}>
    {text}
    {cont}
  </button>
)


const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const tittle  = {name:'Greeating',
  subti: 'Statistics'
  }


  const motions = {motion1: "Goog",
motion2: 'neutral',
motion3: 'bad',
motion4: 'total'}

const stadistis = {
total: 'total',
afirmative: 'positive',
negative: 'average'
}

const handleGoodClick = () =>{
  setGood(good + 1)
}
const handleNeutralClick = () =>{
  setNeutral(neutral + 1)
}
const handleBadClick = () =>{
  setAll(all.concat('r'))
  setBad(bad + 1)
}
  

  return (
    <div>
      
      <Header tittle = {tittle.name}/>
      <Button handleClick={handleGoodClick} text = 'good' />
      <Button handleClick={handleNeutralClick} text = 'Neutral'/>
      <Button handleClick={handleBadClick} text = 'Bad'/>

      <Header tittle = {tittle.subti} />

      <history all ={all} />
      <Motions motions = {motions.motion1}/>
      {good}
      <Motions motions = {motions.motion2} />
      {neutral}
      <Motions motions = {motions.motion3} />
      {bad}

      <Stadist stadistis = {stadistis.total}/>
      {good + neutral + bad}
      <Stadist stadistis = {stadistis.negative}/>
      {good * bad * neutral/ 100}%
      <Stadist stadistis = {stadistis.afirmative}/>
      {good * neutral  / bad }%
      

    </div>
  )

}


export default App

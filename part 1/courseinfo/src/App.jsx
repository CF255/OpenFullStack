
const Header = (header) =>{
  console.log(header)
  return(
  <h1>{header.course}</h1>
  )
}

const Part = (content)=>{
  return (
   <p>
    {content.part} {content.exercise}
   </p>
  )
}

const Content = (content) =>{
  return(
    <div>
      <Part
      part={content.parts[0].name}
      exercise ={content.parts[0].exercises}
      />
      <Part 
      part={content.parts[1].name}
      exercise ={content.parts[1].exercises}
      />
      <Part
      part={content.parts[2].name}
      exercise ={content.parts[2].exercises}
      />

    </div>
  )
}

const Total = (total) =>{
  return(
    <div>
      <p>
        number of exercises{' '}
        {total.parts[0].exercises+
        total.parts[1].exercises+
        total.parts[2].exercises}
      </p>

    </div>
  )
}

const App =()=>{
 
  const course  = {
    name: 'half stack application developement',
    parts:[
      {name: 'fundamnetas of react',
      exercises: 10
      },
      {
        name: 'using props to pas data',
        exercises: 7
      },
      {
        name: 'state of a componet',
        exercises: 14
      }
    ]
  }

  return(
  <div>
    <Header course ={course.name} />
    <Content  parts ={course.parts}/>
    <Total  parts={course.parts}/>
  </div>

  )
}
export default App

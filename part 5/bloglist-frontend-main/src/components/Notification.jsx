const Notification = ({ message, addmessage, deletemessage, nullmessage }) => {


  return (
    <>
      <div className="error">
        {message}
        
      </div>
      <div className="add">
        {addmessage}
      </div>
      <div className="more">
        {deletemessage}
      </div>
      <div className="error">
      {nullmessage}
      </div>
    </>

  )
}

export default Notification
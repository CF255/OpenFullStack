const Notification = ({ message, addmessage, morenamemessage }) => {
  
  
    return (
      <>
      <div className="error">
        {message} 
      </div>
      <div className="add">
        {addmessage}
      </div>
      <div className="more">
        {morenamemessage}
      </div>
      </>
      
    )
  }

  export default Notification
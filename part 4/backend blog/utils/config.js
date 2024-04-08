require('dotenv').config()
const mongoose = require('mongoose')
const SECRET = process.env.SECRET;
const NODE_ENV = process.env.NODE_ENV;

/* const PORT = process.env.PORT

const MONGODB_URI = process.env.NODE_ENV === 'test' 
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI
    */
 
 const PORT = 3003 
const MONGODB_URI = `mongodb+srv://alfernandez:crichily@cluster0.vgfih9f.mongodb.net/personsApp?retryWrites=true&w=majority&appName=Cluster0`
mongoose.connect(MONGODB_URI)  
  


module.exports = {
  MONGODB_URI,
  PORT,
  SECRET,
  NODE_ENV
}

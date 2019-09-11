const express = require('express') 
const userRouter = require('./users/userRouter')
const server = express(); 
server.use(express.json());   
server.use(logger)


//custom middleware
function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );
 next();
} 

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
}) 
server.use('/users' , userRouter)

module.exports = server;

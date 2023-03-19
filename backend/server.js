const app = require('./app')
const dotenv = require('dotenv')

const connectDatabase = require('./db')

// Handling Uncaught Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
  });
  
// config
dotenv.config({path:"backend/config/config.env"})

// connecting Database
connectDatabase()


const server = app.listen(process.env.PORT,()=>{
    console.log(`Server is running on http://localhost:${process.env.PORT}`)
})

// Unhandled Prommise
process.on('unhandleRejection',err=>{
    console.log(`Error: ${err.message}`)
    console.log(`Shotting down the server due to Unhabdle Prommise Rejection`)
    
    server.close(()=>{
        process.exit(1)
    })
})
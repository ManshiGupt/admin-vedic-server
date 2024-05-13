import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
import Connection from "./database/mongo-db.js";
import Routes from "./routes/route.js";


//initiating express app
const app = express()

//parse JSON bodies
app.use(express.json());

//Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

//configer dotenv file
dotenv.config()

//initiating cors for cross domain communication (backent to front end)
app.use(cors())

//app routing
app.use('/', Routes)

//configer server port
const PORT = process.env.PORT || 8000;


// Connect to MongoDB
const userName = process.env.MONGO_USER
const pass = process.env.MONGO_PASS

//passing the props to 
Connection(userName, pass)


//logging the server running status
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))


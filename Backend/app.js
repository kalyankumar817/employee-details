const express=require('express')
const mongoose=require('mongoose')
require('dotenv').config()
const cors=require('cors')
const userRoute=require('./routes/userRoute')
const employeeRoute=require('./routes/employeeRoute')
const cookieParser = require('cookie-parser')


const app=express();
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173', // Allow Vite frontend origin
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
}))
app.use(cookieParser())


const port=process.env.PORT
const mongouri=process.env.MONGO_URI

mongoose.connect(mongouri)
    .then(()=>console.log('connection established successfully'))
    .catch((err)=>console.log('Error in establishing connection',err))

app.use('/users',userRoute)
app.use('/users/employees',employeeRoute)
app.listen(port,()=>{
    console.log(`server is running at ${port}`)
})

require('dotenv').config()

const mongoose=require('mongoose')

const express=require('express');
const details=require("./routers/detail")


const app=express()

var cors = require('cors');
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})


app.use("/threads",details)

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    app.listen(process.env.PORT,()=>{
        console.log("connected to db && listening on port 5000!!!");
    })
})
.catch((error)=>{
    console.log(error)
})


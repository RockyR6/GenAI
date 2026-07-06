const express = require('express');
const cookieParser = require("cookie-parser")



const app = express()

app.use(cookieParser())
app.use(express.json())

//requite all the routes here
const authRouter = require("./routes/auth.routes.js")

//useing all the routes here
app.use("/api/auth", authRouter)

module.exports = app;
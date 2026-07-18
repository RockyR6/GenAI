const express = require('express');
const cookieParser = require("cookie-parser")
const cors = require("cors")



const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

//requite all the routes here
const authRouter = require("./routes/auth.routes.js")
const interviewRoter = require("./routes/interview.route.js")

//useing all the routes here
app.use("/api/auth", authRouter)
app.use("/api/interview", interviewRoter)

module.exports = app;
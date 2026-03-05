import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
dotenv.config({ path: "./env" });

const app=express()
app.use(cors({ 
    origin:process.env.CORS_ORIGIN,     // defines who is allowed to access your API
    credentials:true                    // allows: cookies,tokens,authentication headers. If you don’t add this → browser will BLOCK your API calls.
}))

app.use(express.json({limit:"16kb"}))   // Allows Express to read JSON data from requests
app.use(express.urlencoded({extended:true,limit:"16kb"}))   // Allows Express to read form data, like HTML form submissions:
// extended: true   Allows nested objects like:   user[name]=Kartik
app.use(express.static("public"))  // Makes the public folder accessible to the browser.
app.use(cookieParser())  // Allows Express to read cookies sent by the browser.



// routes import

import userRouter from "./routes/user.routes.js"


// routes declaration
app.use("/api/v1/users",userRouter)

export default app
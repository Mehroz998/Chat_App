import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/database.js"
import userRoute from "./routes/userRoutes.js"
import messageRoute from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import path from 'path'
import {app , server} from './socket/socket.js'
dotenv.config({});

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "https://severe-annabell-mehrozali-9d0db8b7.koyeb.app",  // ✅ Specific frontend origin
  credentials: true,  // ✅ Allow cookies
  }))
app.options("*", cors());  // ✅ Allow preflight requests

// routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

// -----deployement--------
const dirPath = path.resolve()
app.use(express.static("./frontend/build"))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(dirPath, './frontend/build','index.html'))
})

server.listen(PORT,()=>{
    connectDB()
    console.log(`Server Started ${PORT}`);
})


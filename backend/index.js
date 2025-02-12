import express from "express"
import dotenv from "dotenv";
import connectDB from "./config/database.js"
import userRoute from "./routes/userRoutes.js"
import messageRoute from "./routes/messageRoutes.js"
import cookieParser from "cookie-parser";
import cors from "cors"
import {app , server} from './socket/socket.js'
dotenv.config({});

const PORT = process.env.PORT || 3000;

// middleware
app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:3000",  // ✅ Specific frontend origin
  credentials: true,  // ✅ Allow cookies
  }))
app.options("*", cors());  // ✅ Allow preflight requests

// routes
app.use("/api/v1/user",userRoute);
app.use("/api/v1/message",messageRoute);

server.listen(PORT,()=>{
    connectDB()
    console.log(`Server Started ${PORT}`);
})


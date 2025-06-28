import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./config/db.js";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/userRoute.js";
import tweetRoutes from "./routers/tweetRoute.js";
import cors from "cors";

dotenv.config({ 
    path: ".env"   
});

const app = express();
databaseConnection(); 

app.use(cors({
  origin: "https://interactive-post-sharing-app-unmg.vercel.app", // your frontend URL
  credentials: true, // 👈 allow cookies to be sent/received
}));
 
//middlewares 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.get("/", (req, res)=>{
    res.status(200).json({
        message: "Coming from Backend."
    })
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/tweet", tweetRoutes);

app.listen(process.env.PORT, ()=>{
    console.log(`✅ Server is running on http://localhost:${process.env.PORT}`);    
});   
    
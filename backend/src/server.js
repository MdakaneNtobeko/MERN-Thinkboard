import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import notesRoutes from "./routes/notesRoutes.js"
import { connectDB } from './config/db.js';
import rateLimiter from './middleware/rateLimiter.js';


dotenv.config();
const port = process.env.PORT || 3000;

const app = express();

//Middleware
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(rateLimiter);

app.use("/api/notes", notesRoutes);


connectDB().then (() =>{
    app.listen(port, ()=>{
      console.log(`Server is running on PORT: ${port}`);
    });
});
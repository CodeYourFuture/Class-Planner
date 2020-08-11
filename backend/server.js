const express = require('express');
const dotenv = require('dotenv');
const connectDB=require("./config/db");

dotenv.config({ path: './config/config.env' });
connectDB();


const app = express();
app.use(express.json());

app.get("/",  (request, response)=>{
    response.json({
        status:"success",
        message:"keep Calm! Class Planner server is Okay"
    });
  });
  

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
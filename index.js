const express = require('express');
const app = express();
require('dotenv').config();
const cookieParser = require('cookie-parser');
//mongoose
const mongoose = require('mongoose');
const authRoutes = require('./Routes/AuthRoutes');
//cors
const cors = require('cors');

//port
const PORT = process.env.Port || 8000

//cors
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true,
}));
//cookie-parser
app.use(cookieParser());

app.use(express.json());

//Routes
app.use("/", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})

mongoose.connect(process.env.Mongo_DB_URI)
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err) => {
    console.log(err.message)
})

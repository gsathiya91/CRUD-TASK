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
const PORT = process.env.PORT || 5000

//cors
app.use(cors());
//cookie-parser
app.use(cookieParser());

app.use(express.json());

//Routes
app.use("/", authRoutes);

app.listen(PORT,()=>{
    console.log(`Server running at port ${PORT}`)
})

mongoose.connect("mongodb+srv://Gsathiya:capstoneproject@cluster0.ktemn.mongodb.net/Movies-App?retryWrites=true&w=majority")
.then(()=>{
    console.log("MongoDB connected successfully")
}).catch((err) => {
    console.log(err.message)
})


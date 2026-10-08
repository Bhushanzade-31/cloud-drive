const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const cookieParser = require('cookie-parser');
const connectToDb = require('./db/db');
const userRoutes = require('./routes/user.routes');






const allowedOrigins = ['http://localhost:4000', 'http://localhost:5173', 'https://cloud-drive-3p46.vercel.app'];
app.use(cors({ origin: allowedOrigins }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

connectToDb();

app.get('/',(req,res)=>{
    res.send('hello');
});
app.use('/users',userRoutes);


  
module.exports = app;
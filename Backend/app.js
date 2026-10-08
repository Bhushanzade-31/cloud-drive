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

app.get('/',(req,res)=>{
    res.send('hello');
});
app.use('/users', async (req, res, next) => {
    try {
        await connectToDb();
        next();
    } catch (error) {
        next(error);
    }
}, userRoutes);

app.use((error, req, res, next) => {
    console.error(`Request failed: ${req.method} ${req.originalUrl}`, error);
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).json({ message: 'Internal server error' });
});

  
module.exports = app;
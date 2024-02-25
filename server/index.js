require("dotenv").config();
import express  from "express";
import bodyParser from "body-parser";
import configViewEngine from  "./src/config/viewEngine.js"
import initWebRoutes from  './src/routes/web.js'
import cors from 'cors';
import mongoose from 'mongoose';
import './src/db'; // Import and execute db.js to establish MongoDB connection

let app = express()
// Enable CORS for all routes
app.use(cors());
configViewEngine(app)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
initWebRoutes(app);

const PORT=process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)    
})
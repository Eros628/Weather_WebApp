import 'dotenv/config.js';
import cors from 'cors';
import axios from 'axios';
import express from 'express';
const app = express();

app.use(cors({
    origin: ['http://localhost:5500', 'http://127.0.0.1:5500', 'http://localhost:5173']
}));


const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/";
const SECRET_KEY = process.env.WEATHER_API_KEY;



app.get('/api/weather/', async(req, res)=>{
    const{loc} = req.query;
    const response = await axios.get(`${BASE_URL}${loc}?key=${SECRET_KEY}`)
    res.json(response.data);
});


app.listen(3000, ()=>{
    console.log("LISTENING AT PORT: 3000");
});
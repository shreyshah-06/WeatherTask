const express = require("express");
const app = express();
const axios = require('axios');
const router = express.Router();
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/',(req,res)=>{
    res.send("owerhs");
})

app.post('/weatherData',async (req,res)=>{
    const {cityNames} = req.body;
    let temperatures = [];
    const API_KEY = process.env.API_KEY;
    for (cities in cityNames){
        console.log(cityNames[cities])
        let citySite = `http://api.openweathermap.org/data/2.5/weather?q=${cityNames[cities]}&appid=${API_KEY}`;
        await axios.get(citySite).then((response)=>{
            let cTemp = ((response.data.main.temp-273)).toFixed(2);
            temperatures.push(`${cityNames[cities]} : ${cTemp}C`)
        },(error)=>{
            console.log(error)
        });
    }
    return res.send({"temperatures":temperatures});
})

const serverStart = async () => {
    try {
      app.listen(PORT, () => {
        console.log(`Server is listening on port ${PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  };
  serverStart();
  
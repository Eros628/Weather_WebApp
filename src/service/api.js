import axios from "axios";

const BACK_END_URL = "http://localhost:3000";


export async function getWeather(location){
    try {
      const response = await axios.get(`${BACK_END_URL}/api/weather/${location}`,);

      
      const {conditions, temp, precipprob, windspeed, icon, datetime} = response.data.currentConditions;
      const {days, description, resolvedAddress} = response.data;
      return {
        conditions: conditions,
        temp: temp,
        rainChance: precipprob,
        windspeed: windspeed,
        icon: icon,
        datetime: datetime,
        days: days,
        description: description,
        place: resolvedAddress
      };


    } catch (error) {
      console.log(error);
    }
}

export async function  getPlaces (location) {
    try {
        const response = await axios.get("https://photon.komoot.io/api", {
            params:{
                q: location,
                limit: 5
            }
        });
        console.log("request");
    
        return response.data;

    } catch (error) {
        console.log(error);
    }
}
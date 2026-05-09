import axios from "axios";

const BACK_END_URL = "http://localhost:3000";


export async function getWeather(location){
    try {
      const response = await axios.get(`${BACK_END_URL}/api/weather/`,{
      params:{loc: location}});
      return response;

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
    
        return response.data;

    } catch (error) {
        console.log(error);
    }
}
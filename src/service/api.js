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
import { Wind, Droplets, Cloudy } from "lucide-react";
import '../App.css';

function WeatherCard({weatherData}){
    return(
        <>
            <div className="weather-info-container">
                <div className="weather-info-col1">
                    <div className="col1-upper-section">
                        <p>{weatherData.place.split(",")[0]}</p>
                        <p>{weatherData.days[0].datetime.replaceAll("-", ".")}</p>
                    </div>
                    <div className="col1-middle-section">
                        <div>
                            <h1>{Math.floor(weatherData.temp, 0)}</h1>
                            <h1>{weatherData.conditions}</h1>
                        </div>
                        <div>
                            <div>
                                <Wind /> 
                                <p>{weatherData.windspeed + "mph"}</p>
                            </div>
                            <div>
                                <Droplets />
                                <p>{weatherData.rainChance + "%"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col1-lower-section">
                        
                    </div>
                </div>
                <div className="weather-info-col2">
                    <div className="col2-upper-section">
                        <p>Good Morning</p>
                        <p>12:27 PM</p>
                    </div>
                    <div className="col2-middle-section">
                        <div>{weatherData.icon}</div>
                        <p>{weatherData.description}</p>
                        <p>{weatherData.conditions}</p>
                    </div>
                    <div className="col2-lower-section">
                        <p>Hourly Forcast</p>
                    </div>
                </div>
            </div>
        </>
    );
}




export default WeatherCard;
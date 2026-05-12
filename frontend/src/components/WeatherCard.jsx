import { Wind, Droplets, Cloudy, CloudRain, CloudMoon, Moon, Sun, CloudSun } from "lucide-react";
import '../App.css';
import ForecastCard from "./ForecastCard";
import { DateTime } from "luxon";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

export function WeatherCard({weatherData}){


    const [currentWeather, setCurrentWeather] = useState({
        temp: weatherData.days[0].temp,
        conditions: weatherData.days[0].conditions.split(",").at(-1),
        description: weatherData.days[0].description,
        windspeed: weatherData.days[0].windspeed,
        date: weatherData.days[0].datetime,
        hours: weatherData.days[0].hours,
        rainChance: weatherData.days[0].precipprob,
        icon: weatherData.days[0].icon
    });

    const [currentIndex, setCurrentIndex] = useState(null);

    const timeSec = Math.floor( DateTime.now().startOf('hour').toSeconds());
    const time = DateTime.now().toFormat("h: mm a");
    const isPM = time.split(" ").at(-1) == "PM"? true : false;

    const hours = currentWeather.hours.filter((hour)=> hour.datetimeEpoch >= timeSec).slice(0,6);

    const getIcon =()=>{
        let size = "70px";
        switch (currentWeather.icon) {
            case "rain":
                return <CloudRain size={size} />
                break;
            case "cloudy":
                return <Cloudy size={size} />
            case "partly-cloudy-night":
                return <CloudMoon size={size} />
            case "clear-night":
                return <Moon size={size} />
            case "clear-day":
                return <Sun size={size} />
            case "partly-cloudy-day":
                return <CloudSun size={size} />
            default:
                break;
        }
    }


    return(
        <> 
           
            <div className="weather-info-container" style={{animation: "none", height: "530px"}}>
                <div className="weather-info-col1">
                    <div className="col1-upper-section">
                        <p>{weatherData.place.split(",")[0]}</p>
                        <p>{currentWeather.date.replaceAll("-", ".")}</p>
                    </div>
                    <div className="col1-middle-section">
                        <div>
                            <h1>
                                {Math.floor(currentWeather.temp, 0)}
                                <span style={{fontSize: "4rem", height: "100%", display: "flex"}}>°</span>

                            </h1>
                            <h1>{currentWeather.conditions}</h1>
                        </div>
                        <div>
                            <div>
                                <Wind size={"30px"} /> 
                                <p>{currentWeather.windspeed + "mph"}</p>
                            </div>
                            <div>
                                <Droplets size={"30px"} />
                                <p>{currentWeather.rainChance + "%"}</p>
                            </div>
                        </div>
                    </div>
                    <div className="col1-lower-section">
                        {weatherData.days.slice(0, 6).map((data, index)=>{
                            return (<ForecastCard setCurrentIndex={setCurrentIndex} currentIndex={currentIndex}  weather={data} key={index} index={index} setCurrentWeather={setCurrentWeather} currentWeather={currentWeather}></ForecastCard>)
                        })}
                    </div>
                </div>
                <div className="weather-info-col2">
                    <div className="col2-upper-section">
                        <p>{isPM ? "Good Evening" : "Good Morning"}</p>
                        <p>{time}</p>
                    </div>  
                    <div className="col2-middle-section">
                        <div>{getIcon()}</div>
                        <div className="back-to-back-description">
                            <div className="face-description"><p>{currentWeather.conditions}</p></div>
                            <div className="back-description"><p>{currentWeather.description}</p></div>
                        </div>
                      
                    </div>
                    <p>Hourly Forcast</p>
                    <div className="col2-lower-section">
                        {hours.map((data, index)=>{
                            return (<ForecastCard weather={data} key={index} isCol1={false} hours={hours}></ForecastCard>)
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}

export function WeatherCardSkeleton({weatherData, isLoading}){
    return(
        <>  

         {isLoading ?  <div className="weather-info-container" style={{animation: (Object.keys(weatherData).length !=0 ) && "none" }}>
            <div className="weather-info-col1">
                <div className="col1-upper-section">

                    <p><Skeleton width={100} /></p>
                    <p><Skeleton width={100} /></p>
                </div>
                
                <div className="col1-middle-section">
                    <div>
    
                        <h1><Skeleton width={150} height={130} /></h1>
                        <h1><Skeleton width={150} height={40} /></h1>
                    </div>
                    <div>
                        <div style={{ marginLeft: '30px' }}>
                            <Skeleton width={50} height={50} circle={true} /> 
                            <p><Skeleton width={80} /></p>
                        </div>
                        <div style={{ marginLeft: '30px' }}>
                            <Skeleton width={50} height={50} circle={true} />
                            <p><Skeleton width={80} /></p>
                        </div>
                    </div>
                </div>
                
                    <div className="col1-lower-section" style={{justifyContent: "center"}}>
                        <Skeleton count={7} inline={true} width={70} height={100} style={{marginLeft: "10px"}} />
                    </div>
                </div>
            
                <div className="weather-info-col2">
                    <div className="col2-upper-section">
                        <div><Skeleton width={100} /></div>
                        <p><Skeleton width={80} /></p>
                    </div>  
                    
                    <div className="col2-middle-section">
                        <div><Skeleton width={50} height={50} /></div>
                        <div className="back-to-back-description" style={{animation: "none"}}>
                            <div className="face-description"><p><Skeleton width={100} /></p></div>
                            <div className="back-description"><p><Skeleton width={100} /></p></div>
                        </div>
                    </div>
                    
                    <p><Skeleton width={150} /></p>
                    
                    <div className="col2-lower-section">
                        <Skeleton inline={true} count={6} width={80} height={100} style={{ marginLeft: '10px' }} />
                    </div>
                </div>
            </div> : <WeatherCard weatherData={weatherData}/> }

   

          
        </>
    )
}




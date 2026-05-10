import { DateTime } from "luxon";
import "../App.css";
import { pascalCase } from "pascal-case";
import { useState } from "react";

function ForecastCard ({weather, isCol1 = true, index, hours, currentWeather, setCurrentWeather, currentIndex, setCurrentIndex}){

    const formatedDay = DateTime.fromISO(weather.datetime).toFormat('EEE');
    const date = DateTime.fromSeconds(weather.datetimeEpoch);
    const time24hr = date.toFormat("h a");
    return(
         <div onClick={
            ()=>{
                if(isCol1){
                    setCurrentWeather({
                        temp: weather.temp,
                        conditions: weather.conditions.split(",").at(-1),
                        description: weather.description,
                        windspeed: weather.windspeed,
                        rainChance: weather.precipprob,
                        date: weather.datetime,
                        hours: weather.hours,
                        icon: weather.icon
                    });
                }
               setCurrentIndex(index);
            

               
           
            
            }
         } className={isCol1 ? "card-col1" : "card-col2"} style={{animationDelay: (index * 0.3) +"s", flexBasis: hours?.length == 4? "100px": "70px", border: currentIndex === index || (index == 0 && currentIndex == null)? "1px solid #686868" : "none" }}>
            {isCol1 ?  <p>{formatedDay}</p> : <p>{time24hr}</p>}
            <p>{ Math.floor(weather.temp,0)}°</p>
            <p>{pascalCase(weather.conditions.split(" ").at(-1))}</p>
         </div> 
    );
}

export default ForecastCard;
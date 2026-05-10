import { DateTime } from "luxon";
import "../App.css";
import { pascalCase } from "pascal-case";

function ForecastCard ({weather, isCol1 = true, index, hours}){
    const formatedDay = DateTime.fromISO(weather.datetime).toFormat('EEE');
    const date = DateTime.fromSeconds(weather.datetimeEpoch);
    const time24hr = date.toFormat("h a");
    return(
         <div className={isCol1 ? "card-col1" : "card-col2"} style={{animationDelay: (index * 0.3) +"s", flexBasis: hours?.length == 4? "100px": "70px"}}>
            {isCol1 ?  <p>{formatedDay}</p> : <p>{time24hr}</p>}
            <p>{ Math.floor(weather.temp,0)}°</p>
            <p>{pascalCase(weather.conditions.split(" ").at(-1))}</p>
         </div> 
    );
}

export default ForecastCard;
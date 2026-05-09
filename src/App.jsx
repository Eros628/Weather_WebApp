import { use, useCallback, useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'
import { getPlaces, getWeather } from './service/api.js';
import { SearchIcon } from 'lucide-react';
import { debounce } from './service/util.js';
import WeatherCard from './components/WeatherCard.jsx';

function App() {
  const [isFetched, setIsFetched] = useState(false);
  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState([]);
  const [weatherData, setWeatherData] = useState({});

  const getApi =  async ()=>{
      const data = await getWeather(location);
      setWeatherData(data);
      setIsFetched(true);
      setPlaces([]);
  }

  const setInput = async(value)=>{
    if(value == ""){
      setPlaces([]);
      return;
    }
    const response =  await getPlaces(value);
    const listPlaces = response.features.map((place)=>{
      return place.properties.name +", "+place.properties.country;
    })

    setPlaces(listPlaces);
  }

  const debounceSearch = useCallback(
    debounce(setInput), []
  );


  
  return (
    <>
      <div className='main-container'>
        <div className='search-container' style={{width: "300px"}}>
          {!isFetched &&  <h1>WeatherWise</h1>}
          <form onSubmit={(e)=>{
              e.preventDefault(); 
              getApi();
          }}>
            <div className='input-suggest-wrapper'>
              <div className='input-wrapper'>
                <input value={location} onChange={
                  (e)=>{
                     setLocation(e.target.value);
                    if(e.target.value == ""){
                      setPlaces([]);
                    }
                  
                    debounceSearch(e.target.value);
                  }
                } className='input-bar' placeholder='Enter your City'></input>
                <button className='search-btn' type='submit'><SearchIcon color='#686868'></SearchIcon></button>
              </div>
               {places.length > 0 && 
              <div className='places-suggestions-wrapper'>
                {places.map((place, index)=>{
                  return <button type='submit' onClick={ ()=>{
                    setLocation(place);
                  }}  className='list-suggest' key={index}>{place}</button>
                })}
              </div>}
            </div>
          </form>
        </div>
        {isFetched && <WeatherCard weatherData={weatherData} />}
        
      </div>
    </>
  )
}

export default App

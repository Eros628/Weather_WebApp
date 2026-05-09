import { use, useState } from 'react'
import axios from 'axios'
import './App.css'
import { getPlaces, getWeather } from './service/api.js';
import { SearchIcon } from 'lucide-react';

function App() {
  const [location, setLocation] = useState('');
  const [places, setPlaces] = useState([]);
  const getApi =  async ()=>{
      const data = await getWeather(location);
      console.log(data);
  }

  const setInput = async(place)=>{
    const response =  await getPlaces(place);
    const listPlaces = response.features.map((place)=>{
      return place.properties.name +", "+place.properties.country;
    })

    setPlaces(listPlaces);
  }


  return (
    <>
      <div className='main-container'>
        <div className='search-container'>
          <h1>WeatherWise</h1>
          <form onSubmit={(e)=>{
              getApi(e.target.value);
          }}>
            <div className='input-suggest-wrapper'>
              <div className='input-wrapper'>
                <input onChange={
                  (e)=>{
                    if(e.target.value == ""){
                      setPlaces([]);
                    }
                    else{
                      setInput(e.target.value);
                    }
                    
                    
                  }
                } className='input-bar' placeholder='Enter your City'></input>
                <button className='search-btn' type='submit'><SearchIcon></SearchIcon></button>
              </div>
               {places.length > 0 && 
              <div className='places-suggestions-wrapper'>
                {places.map((place, index)=>{
                  return <div className='list-suggest' key={index}>{place}</div>
                })}
              </div>}
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default App

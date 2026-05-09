import { use, useState } from 'react'
import axios from 'axios'
import './App.css'
import { getWeather } from './service/api.js';

function App() {
  const [location, setLocation] = useState('');
  const getApi =  async ()=>{
      const data = await getWeather(location);
      console.log(data);
  }

  return (
    <>
      <form onSubmit={(e)=>{
        e.preventDefault();
        getApi();
      }}>
        <input onChange={
          (e)=>{
            setLocation(e.target.value);
          }
        } placeholder='enter location'></input>
        <button type='submit'> SEARCH</button>
      </form>

      <div>

      </div>
    </>
  )
}

export default App

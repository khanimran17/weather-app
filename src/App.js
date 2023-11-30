import React, { useEffect, useState } from 'react'
import coldBg from './assets/snow.png'
import hotBg from './assets/sunny.jpg'
import rainnyBg from './assets/rainny.jpg'
import './App.css'
import Description from './components/Description'
import { getFormattedWeatherData } from './WeatherServices'

const App = () => {
  const [weather, setWeather] = useState(null)
  const [units, setUnits] = useState("metric")
  const [city, setCity] = useState("mumbai")
  const [bgImage, setBgImage] = useState(coldBg);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const data = await getFormattedWeatherData(city, units);

      setWeather(data);

      if (data) {
        if (data.description.toLowerCase().includes("rain")) {
          setBgImage(rainnyBg);
        } else if (data.temp > 20 && units === "metric") {
          setBgImage(hotBg);
        } else if (data.temp > 68 && units === "imperial") {
          setBgImage(hotBg);
        } else {
          setBgImage(coldBg);
        }
      }
    };

    fetchWeatherData();
  }, [units, city]);

  const unitHandler = () => {
    if (units === "imperial") {

      return setUnits("metric");
    } else {
      return setUnits("imperial");
    }
  }

  const cityHandler = (e) => {
    if (e.keyCode === 13) {
      const newCity = e.target.value.trim("");
      setCity(newCity);
      e.target.blur();
    }
  };

  return (
    <div className='app' style={{ backgroundImage: `url(${bgImage})` }} >
      <div className="overlay">
        {weather &&
          <div className="container">
            <div className="section section__input">
              <input type="text" name='city' placeholder='Enter City And Press Enter...' onKeyDown={cityHandler} />
              <button onClick={unitHandler}>{units === "imperial" ? "°C" : "°F"}</button>
            </div>

            <div className="section section__temperatue">
              <div className="icon">
                <h3>{`${weather.name}, ${weather.country}`}</h3>
                <img src={weather.iconURL} alt="weathericon" />
                <h3>{weather.description}</h3>
              </div>
              <div className="temperature">
                <h1>{weather.temp.toFixed()}°{units === "metric" ? "C" : "F"}</h1>
              </div>
            </div>

            {/* Bottom description */}
            <Description weather={weather} units={units} />
          </div>
        }
      </div>
    </div>
  )
}

export default App
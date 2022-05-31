import React, { useState } from "react";
import GlobalSvgSelector from "./assets/icons/global/GlobalSvgSelector";
import axios from "axios";

const apiKey = "7325aceaa1383a2fedd5cc7dc9e712ff";
const url = "https://api.openweathermap.org/data/2.5";

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");
  const searchByLocation = (event) => {
    if (event.key === "Enter") {
      axios
        .get(`${url}/weather?q=${location}&units=metric&appid=${apiKey}`)
        .then((response) => setWeatherData(response.data));
      setLocation("");
    }
  };

  return (
    <div className="app">
      <div className="search">
        <label htmlFor="location">
          <input
            value={location}
            id="location"
            onChange={(event) => setLocation(event.target.value)}
            onKeyPress={searchByLocation}
            placeholder="Enter Location"
            type="text"
          />
          <div className="search_svg">
            <GlobalSvgSelector id="search-icon" />
          </div>
        </label>
      </div>
      <div className="container">
        <div className="top">
          <div className="location">
            <p>{weatherData.name}</p>
          </div>
          <div className="temp">
            {weatherData.main ? (
              <h1>{weatherData.main.temp.toFixed()}°C</h1>
            ) : null}
          </div>
          <div className="description">
            {weatherData.weather ? <p>{weatherData.weather[0].main}</p> : null}
          </div>
        </div>

        {weatherData.name !== undefined && (
          <div className="bottom">
            <div className="feels">
              {weatherData.main ? (
                <p className="bold">
                  {weatherData.main.feels_like.toFixed()}°F
                </p>
              ) : null}
              <p>Feels Like</p>
            </div>
            <div className="humidity">
              {weatherData.main ? (
                <p className="bold">{weatherData.main.humidity}%</p>
              ) : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {weatherData.wind ? (
                <p className="bold">{weatherData.wind.speed.toFixed()} Km/H</p>
              ) : null}
              <p>Wind Speed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

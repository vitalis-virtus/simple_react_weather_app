import React, { useState } from "react";
import GlobalSvgSelector from "./assets/icons/global/GlobalSvgSelector";
import { fetchWeather } from "./services/services";

import "react-spinner-animated/dist/index.css";
import { HalfMalf } from "react-spinner-animated";

export default function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [location, setLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const searchByLocation = async (event) => {
    if (event.key === "Enter") {
      setIsLoading(true);
      await fetchWeather(location)
        .then((response) => {
          setWeatherData(response);
        })
        .catch((error) => console.log(error));
      setIsLoading(false);
      setLocation("");
    }
  };

  return (
    <div className="app">
      {isLoading && <HalfMalf />}
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
      {!isLoading ? (
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
              {weatherData.weather ? (
                <p>{weatherData.weather[0].main}</p>
              ) : null}
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
                  <p className="bold">
                    {weatherData.wind.speed.toFixed()} Km/H
                  </p>
                ) : null}
                <p>Wind Speed</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

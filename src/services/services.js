import axios from "axios";

const url = process.env.REACT_APP_API_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const fetchWeather = (location) => {
  return axios.get(`${url}/weather?q=${location}&units=metric&appid=${apiKey}`)
  .then(response=>response.data)
};

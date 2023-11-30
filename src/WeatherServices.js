import axios from 'axios';

const API_KEY = "f7b12ea370bf1a0758d6a3200d128722";

const makeIconUrl = (iconId)=> `https://openweathermap.org/img/wn/${iconId}@2x.png`


const getFormattedWeatherData = async (city, units = "metric") => {
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=${units}`;

    const response = await axios.get(URL);
    const data = response.data;

    const { weather, main: {
        temp, humidity, pressure, visibility, feels_like, temp_min, temp_max
    },
        wind: { speed },
        sys: { country },
        name
    } = data;

    const { description, icon } = weather[0]

    return {
        description, 
        iconURL: makeIconUrl(icon), 
        temp, humidity, pressure, visibility, feels_like, temp_min, temp_max, speed, country, name
    }
}

export { getFormattedWeatherData };

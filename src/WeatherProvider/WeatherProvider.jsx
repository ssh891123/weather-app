import React, { createContext, useEffect, useState } from 'react';

export const WeatherContext = createContext({});

function WeatherProvider({children}) {
    const [weatherInfo, setWeatherInfo] = useState({});

    const APIKEY = 'APIKEY';
    const getWeatherInfo =  async() => {
        try {
            const currentWeatherInfoAPI =
                `http://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&q=Seoul&units=metric`;
            const currentWeatherInfo = await fetch(currentWeatherInfoAPI);
            console.log(currentWeatherInfo.json());
            const { 
                name, 
                coord: {lat, lon}, //위도, 경도
                main:{temp, humidity, pressure, feels_like, temp_min, temp_max}, 
                sys:{sunset, sunrise},
                weather: [{main: weatherState}],
                wind: {speed, deg},
            } = await currentWeatherInfo.json();
            const hourlyWeatherInfoAPI = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,daily&appid=${APIKEY}&units=metric`;
            const hourlyWeatherInfo = await fetch(hourlyWeatherInfoAPI);
            const { hourly } = await hourlyWeatherInfo.json();
            setWeatherInfo({
                name, temp, humidity, pressure, weatherState, feels_like, speed, deg, hourly, sunset, sunrise, temp_max, temp_min
            }); 

        } catch(error) {
            console.error(error);
        }
};

    useEffect(() => {
        getWeatherInfo()
    }, []);

    return(
        <WeatherContext.Provider value={{ ...weatherInfo }}>
            {children}
        </WeatherContext.Provider>
    )
}

export default WeatherProvider;
import React, { createContext, useEffect, useState } from 'react';

export const WeatherContext = createContext({});

function WeatherProvider({children}) {
    const [weatherInfo, setWeatherInfo] = useState({});

    //내가 발급받은 키 - 230712에 받음
    const APIKEY = 'fd93d157e225573e99937849958e77d9';

    // 아래 사이트에서 가져온 키
    // https://velog.io/@eunhye_k/JavaScript-%EB%82%A0%EC%94%A8%EC%A0%95%EB%B3%B4-API
    // const APIKEY = '2834387742b25d5393a21e88fee8246a'; 
    const getWeatherInfo =  async() => {
        try {
            const currentWeatherInfoAPI =
                `http://api.openweathermap.org/data/2.5/weather?appid=${APIKEY}&q=Seoul&units=metric`;
            const currentWeatherInfo = await fetch(currentWeatherInfoAPI);
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
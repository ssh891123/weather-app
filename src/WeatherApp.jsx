import React from 'react';
import CurrentWeather from './CurrentWeather/CurrentWeather';
import './style.css';

function WeatherApp() {
    return(
        <>
        <div classNmae = 'container'>
            <CurrentWeather/>
        </div>
        </>
    )
}

export default WeatherApp;
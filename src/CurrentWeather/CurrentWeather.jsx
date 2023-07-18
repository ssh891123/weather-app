import React, { useContext } from 'react';
import { WeatherContext } from '../WeatherProvider/WeatherProvider';
import CurrentWeatherIcon from '../CurrentWeatherIcon/CurrentWeatherIcon';

function CurrentWeather() {
    // name - 도시
    // temp - 현재 온도
    const {name, temp, weatherState } = useContext(WeatherContext);

    //nbsp: 공백
    return(
        <div className='weather'> 
            {name} &nbsp;/
            <CurrentWeatherIcon weatherState={weatherState} />
            <span>{temp}&deg;</span>
        </div>
    )
}

export default CurrentWeather;
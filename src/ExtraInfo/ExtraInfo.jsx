import React, { useContext } from 'react';
import { WeatherContext } from '../WeatherProvider/WeatherProvider';
import { WiHumidity, WiSunrise, WiSunset } from 'react-icons/wi';

function ExtraInfo() {
    const {humidity, speed, deg, sunset, sunrise} = useContext(WeatherContext);
    return (
        <div className="extra-info">
        <div className="extra-info-item">
            <WiSunrise style={{fontSize:"50px", color:"#ff7500"}}/>
            <p className='extra-info-text'>
                {
                    new Date(sunrise * 1000).toLocaleString("en-US", {
                        hour:"numeric",
                        minute:"numeric",
                        hour12:true,
                    })
                } <br/>
                일출
            </p>
        </div>
        <div className="extra-info-item">
            <WiSunset style={{fontSize:"50px", color:"#ff7500"}}/>
            <p className='extra-info-text'>
                {
                    new Date(sunset * 1000).toLocaleString("en-US", {
                        hour:"numeric",
                        minute:"numeric",
                        hour12:true,
                    })
                } <br/>
                일몰
            </p>
        </div>
        <div className="extra-info-item">
            <WiHumidity style={{fontSize:"50px", color:"#ff7500"}}/>
            <p className='extra-info-text'>
                {`${humidity}%`}<br/>
                습도
            </p>
        </div>
        </div>
    );
}

export default ExtraInfo;
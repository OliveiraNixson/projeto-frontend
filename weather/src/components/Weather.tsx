import React from "react";
import weatherImage from "../assets/weather_cloudy_sky_sun_weather.svg";
import "../css/box.css";
export default function Temperature({ clima = 0, chuvaChance = 3 }) {
  return (
    <div id="headerBox">
      <div id="logo">
        <img src={weatherImage} alt="weather" />
      </div>
      <h2 id="title">Clima</h2>
      <div id="state">{clima}%</div>
      <div id="info">{chuvaChance} mm</div>
    </div>
  );
}

import React from "react";
import "../css/box.css";
import temperatureImage from "../assets/weather_temperature_thermometer_warm_weather.svg";

export default function Temperature({
  temperatura = 0,
  maxima = 0,
  minima = 0,
}) {
  return (
    <div id="headerBox">
      <div id="logo">
        <img src={temperatureImage} alt="Temperature" />
      </div>
      <h2 id="title">Temperatura</h2>
      <div id="maximo">Máxima: {maxima}&deg;C</div>
      <div id="minimo">Mínima: {minima}&deg;C</div>
    </div>
  );
}

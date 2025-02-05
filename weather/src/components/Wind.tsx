import React from "react";
import windImage from "../assets/weather_blow_weather_wind_windy.svg";
import "../css/box.css";
export default function Temperature({ velocidade = 0, rajada = 30 }) {
  return (
    <div id="headerBox">
      <div id="logo">
        <img src={windImage} alt="wind" />
      </div>
      <h2 id="title">Vento</h2>
      <div id="state">Média: {velocidade}km/h</div>
      <div id="info">Rajadas de vento de {rajada}km</div>
    </div>
  );
}

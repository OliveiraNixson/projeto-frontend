import umidityImage from "../assets/weather_drop_humidity_rain_weather.svg";
import "../css/box.css";
export default function Umidity({ umidade = 30, pontoOrvalho = 20 }) {
  return (
    <div id="headerBox">
      <div id="logo">
        <img src={umidityImage} alt="Umidity" />
      </div>
      <h2 id="title">Umidade</h2>
      <div id="state">{umidade}%</div>
      <div id="info">Orvalho: {pontoOrvalho}&deg;C</div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import Temperature from "./Temperature";
import Umidity from "./Umidity";
import Weather from "./Weather";
import Wind from "./Wind";
import Graphs from "./Graphs";
import axios from "axios";
import "../css/box.css";

export default function Box() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [coords, setCoords] = useState(null);
  const [countryCode, setCountryCode] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("today");

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get("https://ipwho.is/");
        const { latitude, longitude, city } = response.data;

        setCoords({ latitude, longitude });
        setCity(city);

        fetchWeatherData(latitude, longitude);
      } catch (error) {
        console.error("Erro ao obter localização:", error);
      }
    };

    fetchLocation();
  }, []);

  const fetchWeatherData = async (lat, lon, countryCode) => {
    setLoading(true);
    setError(null);

    try {
      const weatherResponse = await axios.get(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,precipitation,relativehumidity_2m,windspeed_10m&daily=temperature_2m_max,temperature_2m_min&timezone=auto`
      );

      setWeatherData(weatherResponse.data);
      setCountryCode(countryCode);
    } catch (error) {
      setError("Não foi possível obter os dados meteorológicos.");
    } finally {
      setLoading(false);
    }
  };

  const filterDataByPeriod = () => {
    if (!weatherData?.daily) return weatherData;

    switch (selectedPeriod) {
      case "today":
        return {
          ...weatherData,
          hourly: {
            time: weatherData.hourly.time.filter((_, index) => {
              const now = new Date();
              const dataHora = new Date(weatherData.hourly.time[index]);
              return dataHora.getDate() === now.getDate(); //
            }),
            temperature_2m: weatherData.hourly.temperature_2m.filter(
              (_, index) => {
                const now = new Date();
                const dataHora = new Date(weatherData.hourly.time[index]);
                return dataHora.getDate() === now.getDate();
              }
            ),
            precipitation: weatherData.hourly.precipitation.filter(
              (_, index) => {
                const now = new Date();
                const dataHora = new Date(weatherData.hourly.time[index]);
                return dataHora.getDate() === now.getDate();
              }
            ),
          },
        };
      case "tomorrow":
        return {
          ...weatherData,
          hourly: {
            time: weatherData.hourly.time.filter((_, index) => {
              const now = new Date();
              const dataHora = new Date(weatherData.hourly.time[index]);
              return dataHora.getDate() === now.getDate() + 1;
            }),
            temperature_2m: weatherData.hourly.temperature_2m.filter(
              (_, index) => {
                const now = new Date();
                const dataHora = new Date(weatherData.hourly.time[index]);
                return dataHora.getDate() === now.getDate() + 1;
              }
            ),
            precipitation: weatherData.hourly.precipitation.filter(
              (_, index) => {
                const now = new Date();
                const dataHora = new Date(weatherData.hourly.time[index]);
                return dataHora.getDate() === now.getDate() + 1;
              }
            ),
          },
        };
      case "7 days":
        return {
          ...weatherData,
          daily: weatherData.daily.slice(0, 7),
        };
      default:
        return weatherData;
    }
  };

  const handleSearch = async () => {
    if (!city.trim()) return;

    try {
      setLoading(true);
      setError(null);

      const geocodingResponse = await axios.get(
        `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&language=pt&format=json`
      );

      const { latitude, longitude } = geocodingResponse.data.results[0];

      setCoords({ latitude, longitude });
      fetchWeatherData(latitude, longitude);
    } catch (error) {
      setError("Cidade não encontrada.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="box">
      <div className="container">
        <div className="form">
          <h3>Confira o clima de uma cidade</h3>
          <div className="form-iput-container">
            <input
              placeholder="Digite o nome da cidade..."
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <button id="search" onClick={handleSearch}>
              <i className="fa-solid fa-magnifying-glass">Pesquisar</i>
            </button>
          </div>
        </div>

        {loading && (
          <div id="loader">
            <i className="fa-solid fa-spinner"></i>
          </div>
        )}

        {error && (
          <div id="error-message">
            <p>{error}</p>
          </div>
        )}

        {weatherData && (
          <>
            <div id="weather-data">
              <h2>
                <i className="fa-solid fa-location-dot"></i>
                <span id="city">{city}</span>
                <img
                  src={`https://flagsapi.com/${countryCode}/flat/64.png`}
                  id="country"
                  alt=""
                />
              </h2>
            </div>

            <div id="filters">
              <button onClick={() => setSelectedPeriod("today")}>Hoje</button>
              <button onClick={() => setSelectedPeriod("tomorrow")}>
                amanhã
              </button>
              <button onClick={() => setSelectedPeriod("7days")}>7 Dias</button>
            </div>

            <div id="elements">
              <Weather
                clima={weatherData?.current?.weathercode}
                chuvaChance={weatherData?.hourly?.precipitation?.[0]}
              />
              <Temperature
                maxima={filterDataByPeriod()?.daily?.temperature_2m_max?.[0]}
                minima={filterDataByPeriod()?.daily?.temperature_2m_min?.[0]}
              />
              <Umidity
                umidade={filterDataByPeriod()?.hourly?.relativehumidity_2m?.[0]}
                pontoOrvalho={filterDataByPeriod()?.hourly?.dewpoint_2m?.[0]}
              />
              <Wind
                velocidade={filterDataByPeriod()?.current?.windspeed}
                rajada={filterDataByPeriod()?.hourly?.windspeed_10m?.[0]}
              />
            </div>

            <Graphs data={filterDataByPeriod()} />
          </>
        )}
      </div>

      <footer>
        <h3>Desenvolvido por Nixson Pires</h3>
      </footer>
    </div>
  );
}

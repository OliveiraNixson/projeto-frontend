import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  interaction: {
    mode: "index",
    intersect: false,
  },
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
      title: {
        display: true,
        text: "Temperatura (°C)",
      },
      grid: {
        drawOnChartArea: false,
      },
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      title: {
        display: true,
        text: "Precipitação (mm)",
      },
      grid: {
        drawOnChartArea: false,
      },
    },
  },
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Temperatura e Precipitação",
    },
  },
};

export default function Graphs({ data }) {
  if (!data) {
    return <p>Carregando dados...</p>;
  }

  const chartData = {
    labels: data.hourly.time.map((time) => new Date(time).toLocaleTimeString()),
    datasets: [
      {
        label: "Temperatura Máxima",
        data: data.hourly.temperature_2m,
        backgroundColor: "transparent",
        borderColor: "red",
        borderWidth: 1,
        type: "line",
        yAxisID: "y",
      },
      {
        label: "Temperatura Mínima",
        data: data.hourly.temperature_2m.map((temp) => temp - 5), // Exemplo de ajuste para mínima
        borderColor: "blue",
        backgroundColor: "transparent",
        type: "line",
        yAxisID: "y",
      },
      {
        label: "Precipitação",
        data: data.hourly.precipitation,
        backgroundColor: "rgba(0, 128, 0, 0.5)",
        borderColor: "green",
        type: "bar",
        yAxisID: "y1",
      },
    ],
  };

  return <Bar data={chartData} options={options} />;
}

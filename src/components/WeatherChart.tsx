import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  RadialLinearScale,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';
import { WeatherData } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
);

interface WeatherChartProps {
  weather: WeatherData;
  title: string;
  isUserChoice: boolean;
}

export function WeatherChart({ weather, title, isUserChoice }: WeatherChartProps) {
  // Convert weather data to radar chart format
  const temperature = Math.round(weather.main.temp - 273.15); // Convert to Celsius
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed * 3.6; // Convert to km/h
  const pressure = (weather.main.pressure - 1000) / 10; // Normalized pressure
  const cloudiness = weather.clouds.all;
  const visibility = weather.visibility ? weather.visibility / 1000 : 10; // Convert to km

  const data = {
    labels: [
      'Temperature (°C)',
      'Humidity (%)',
      'Wind Speed (km/h)',
      'Pressure (normalized)',
      'Cloudiness (%)',
      'Visibility (km)'
    ],
    datasets: [
      {
        label: weather.name,
        data: [
          Math.max(0, temperature + 40), // Offset temperature for positive values
          humidity,
          Math.min(100, windSpeed * 2), // Scale wind speed
          Math.max(0, pressure + 50), // Offset pressure
          cloudiness,
          Math.min(100, visibility * 10) // Scale visibility
        ],
        backgroundColor: isUserChoice 
          ? 'rgba(59, 130, 246, 0.3)' 
          : 'rgba(168, 85, 247, 0.3)',
        borderColor: isUserChoice 
          ? 'rgba(59, 130, 246, 1)' 
          : 'rgba(168, 85, 247, 1)',
        borderWidth: 2,
        pointBackgroundColor: isUserChoice 
          ? 'rgba(59, 130, 246, 1)' 
          : 'rgba(168, 85, 247, 1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: isUserChoice 
          ? 'rgba(59, 130, 246, 1)' 
          : 'rgba(168, 85, 247, 1)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: 'white',
        font: {
          size: 16,
          weight: 'bold' as const
        }
      },
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      r: {
        beginAtZero: true,
        max: 100,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)',
          backdropColor: 'rgba(0, 0, 0, 0.3)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.2)'
        },
        pointLabels: {
          color: 'white',
          font: {
            size: 11
          }
        }
      }
    }
  };

  return (
    <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
      <div className="h-80">
        <Radar data={data} options={options} />
      </div>
      
      {/* Weather Details */}
      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-white/60 mb-1">Current Conditions</div>
          <div className="text-white font-semibold">{weather.weather[0].description}</div>
        </div>
        <div className="bg-black/20 rounded-lg p-3">
          <div className="text-white/60 mb-1">Feels Like</div>
          <div className="text-white font-semibold">{Math.round(weather.main.feels_like - 273.15)}°C</div>
        </div>
      </div>
    </div>
  );
}
import React from 'react';
import { Character, WeatherData } from '../types';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface CharacterComparisonProps {
  userCharacter: Character;
  randomCharacter: Character;
  userWeather: WeatherData;
  randomWeather: WeatherData;
}

export function CharacterComparison({ 
  userCharacter, 
  randomCharacter, 
  userWeather, 
  randomWeather 
}: CharacterComparisonProps) {
  
  const statsData = {
    labels: ['Strength', 'Dexterity', 'Constitution', 'Intelligence', 'Wisdom', 'Charisma'],
    datasets: [
      {
        label: `${userCharacter.name} (${userWeather.name})`,
        data: [
          userCharacter.stats.strength,
          userCharacter.stats.dexterity,
          userCharacter.stats.constitution,
          userCharacter.stats.intelligence,
          userCharacter.stats.wisdom,
          userCharacter.stats.charisma
        ],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1
      },
      {
        label: `${randomCharacter.name} (${randomWeather.name})`,
        data: [
          randomCharacter.stats.strength,
          randomCharacter.stats.dexterity,
          randomCharacter.stats.constitution,
          randomCharacter.stats.intelligence,
          randomCharacter.stats.wisdom,
          randomCharacter.stats.charisma
        ],
        backgroundColor: 'rgba(168, 85, 247, 0.8)',
        borderColor: 'rgba(168, 85, 247, 1)',
        borderWidth: 1
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Character Ability Score Comparison',
        color: 'white',
        font: {
          size: 18,
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
      y: {
        beginAtZero: true,
        max: 20,
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      },
      x: {
        ticks: {
          color: 'rgba(255, 255, 255, 0.7)'
        },
        grid: {
          color: 'rgba(255, 255, 255, 0.1)'
        }
      }
    }
  };

  return (
    <div className="space-y-8">
      {/* Stats Comparison Chart */}
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
        <div className="h-96">
          <Bar data={statsData} options={chartOptions} />
        </div>
      </div>

      {/* Side-by-side Character Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 font-cinzel">
            {userCharacter.name}
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-white/60">Origin:</span>
              <span className="text-white ml-2">{userWeather.name}, {userWeather.sys.country}</span>
            </div>
            <div>
              <span className="text-white/60">Race & Class:</span>
              <span className="text-white ml-2">{userCharacter.race} {userCharacter.class}</span>
            </div>
            <div>
              <span className="text-white/60">Alignment:</span>
              <span className="text-white ml-2">{userCharacter.alignment}</span>
            </div>
            <div>
              <span className="text-white/60">Weather Influence:</span>
              <p className="text-white/80 text-sm mt-1">{userCharacter.weatherInfluence}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h3 className="text-xl font-bold text-white mb-4 font-cinzel">
            {randomCharacter.name}
          </h3>
          <div className="space-y-3">
            <div>
              <span className="text-white/60">Origin:</span>
              <span className="text-white ml-2">{randomWeather.name}, {randomWeather.sys.country}</span>
            </div>
            <div>
              <span className="text-white/60">Race & Class:</span>
              <span className="text-white ml-2">{randomCharacter.race} {randomCharacter.class}</span>
            </div>
            <div>
              <span className="text-white/60">Alignment:</span>
              <span className="text-white ml-2">{randomCharacter.alignment}</span>
            </div>
            <div>
              <span className="text-white/60">Weather Influence:</span>
              <p className="text-white/80 text-sm mt-1">{randomCharacter.weatherInfluence}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
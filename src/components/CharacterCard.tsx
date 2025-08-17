import React from 'react';
import { Character, WeatherData } from '../types';
import { Thermometer, Wind, Cloud, Eye, MapPin, Zap } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  weather: WeatherData;
  isUserChoice: boolean;
}

export function CharacterCard({ character, weather, isUserChoice }: CharacterCardProps) {
  const getWeatherIcon = (weatherMain: string) => {
    const main = weatherMain.toLowerCase();
    if (main.includes('clear')) return '☀️';
    if (main.includes('cloud')) return '☁️';
    if (main.includes('rain')) return '🌧️';
    if (main.includes('thunder')) return '⛈️';
    if (main.includes('snow')) return '❄️';
    if (main.includes('mist') || main.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getCardBackground = () => {
    const main = weather.weather[0].main.toLowerCase();
    if (main.includes('clear')) return 'bg-gradient-to-br from-yellow-100/20 to-orange-200/20';
    if (main.includes('cloud')) return 'bg-gradient-to-br from-gray-100/20 to-gray-300/20';
    if (main.includes('rain')) return 'bg-gradient-to-br from-blue-100/20 to-blue-300/20';
    if (main.includes('thunder')) return 'bg-gradient-to-br from-purple-100/20 to-gray-400/20';
    if (main.includes('snow')) return 'bg-gradient-to-br from-blue-50/30 to-white/20';
    if (main.includes('mist') || main.includes('fog')) return 'bg-gradient-to-br from-gray-50/20 to-gray-200/20';
    return 'bg-gradient-to-br from-blue-100/20 to-purple-200/20';
  };

  return (
    <div className={`${getCardBackground()} backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-2xl transform transition-all duration-300 hover:scale-105`}>
      {/* Character Header */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-4">
          {getWeatherIcon(weather.weather[0].main)}
        </div>
        <h3 className="text-2xl font-bold text-white mb-2 font-cinzel">{character.name}</h3>
        <p className="text-white/80">
          Level {character.level} {character.race} {character.class}
        </p>
        <p className="text-white/60 text-sm mt-1">{character.alignment}</p>
      </div>

      {/* Weather Info */}
      <div className="bg-black/20 rounded-xl p-4 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-white/70" />
            <span className="text-white font-medium">{weather.name}, {weather.sys.country}</span>
          </div>
          <span className="text-white/70 text-sm">{weather.weather[0].description}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Thermometer className="w-5 h-5 text-white/70 mx-auto mb-1" />
            <div className="text-white font-semibold">{Math.round(weather.main.temp - 273.15)}°C</div>
            <div className="text-white/60 text-xs">Temperature</div>
          </div>
          <div className="text-center">
            <Wind className="w-5 h-5 text-white/70 mx-auto mb-1" />
            <div className="text-white font-semibold">{weather.wind.speed} m/s</div>
            <div className="text-white/60 text-xs">Wind Speed</div>
          </div>
          <div className="text-center">
            <Cloud className="w-5 h-5 text-white/70 mx-auto mb-1" />
            <div className="text-white font-semibold">{weather.main.humidity}%</div>
            <div className="text-white/60 text-xs">Humidity</div>
          </div>
        </div>
      </div>

      {/* Character Stats */}
      <div className="space-y-4">
        <div>
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Zap className="w-4 h-4 mr-2" />
            Ability Scores
          </h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-black/20 rounded-lg p-2 text-center">
              <div className="text-white font-bold">{character.stats.strength}</div>
              <div className="text-white/60">STR</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center">
              <div className="text-white font-bold">{character.stats.dexterity}</div>
              <div className="text-white/60">DEX</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center">
              <div className="text-white font-bold">{character.stats.constitution}</div>
              <div className="text-white/60">CON</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center">
              <div className="text-white font-bold">{character.stats.intelligence}</div>
              <div className="text-white/60">INT</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center">
              <div className="text-white font-bold">{character.stats.wisdom}</div>
              <div className="text-white/60">WIS</div>
            </div>
            <div className="bg-black/20 rounded-lg p-2 text-center">
              <div className="text-white font-bold">{character.stats.charisma}</div>
              <div className="text-white/60">CHA</div>
            </div>
          </div>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2 flex items-center">
            <Eye className="w-4 h-4 mr-2" />
            Appearance
          </h4>
          <p className="text-white/80 text-sm">{character.appearance}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Biography</h4>
          <p className="text-white/80 text-sm">{character.bio}</p>
        </div>

        <div>
          <h4 className="text-white font-semibold mb-2">Weather Influence</h4>
          <p className="text-white/80 text-sm italic">{character.weatherInfluence}</p>
        </div>
      </div>
    </div>
  );
}
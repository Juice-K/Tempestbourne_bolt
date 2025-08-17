import React from 'react';
import { Character, WeatherData } from '../types';
import { WeatherChart } from './WeatherChart';
import { CharacterComparison } from './CharacterComparison';

interface ComparisonViewProps {
  userCharacter: Character;
  randomCharacter: Character;
  userWeather: WeatherData;
  randomWeather: WeatherData;
}

export function ComparisonView({
  userCharacter,
  randomCharacter,
  userWeather,
  randomWeather
}: ComparisonViewProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 font-cinzel">Character & Weather Comparison</h2>
        <p className="text-white/80 text-lg">
          Analyze how different climates shape heroic destinies
        </p>
      </div>

      {/* Weather Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <WeatherChart 
          weather={userWeather} 
          title={`${userWeather.name} Weather Profile`}
          isUserChoice={true}
        />
        <WeatherChart 
          weather={randomWeather} 
          title={`${randomWeather.name} Weather Profile`}
          isUserChoice={false}
        />
      </div>

      {/* Character Comparison */}
      <CharacterComparison 
        userCharacter={userCharacter}
        randomCharacter={randomCharacter}
        userWeather={userWeather}
        randomWeather={randomWeather}
      />
    </div>
  );
}
import React from 'react';
import { Character, WeatherData } from '../types';
import { CharacterCard } from './CharacterCard';
import { Download, FileText, Image } from 'lucide-react';
import { exportCharacterPDF, exportCharacterData, exportBothCharacters } from '../utils/exportUtils';

interface CharacterDisplayProps {
  userCharacter: Character;
  randomCharacter: Character;
  userWeather: WeatherData;
  randomWeather: WeatherData;
}

export function CharacterDisplay({ 
  userCharacter, 
  randomCharacter, 
  userWeather, 
  randomWeather 
}: CharacterDisplayProps) {
  
  const handleExportPDF = (character: Character, weather: WeatherData) => {
    exportCharacterPDF(character, weather);
  };

  const handleExportData = (character: Character, weather: WeatherData) => {
    exportCharacterData(character, weather);
  };

  const handleExportBoth = () => {
    exportBothCharacters(
      userCharacter, 
      randomCharacter, 
      userWeather, 
      randomWeather
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-4xl font-bold text-white mb-4 font-cinzel">Your Weather-Forged Heroes</h2>
        <p className="text-white/80 text-lg">
          Two champions born from the same moment, shaped by different skies
        </p>
      </div>

      {/* Export All Button */}
      <div className="text-center">
        <button
          onClick={handleExportBoth}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 flex items-center space-x-2 mx-auto transform hover:scale-105"
        >
          <Download className="w-5 h-5" />
          <span>Export Both Characters</span>
        </button>
      </div>

      {/* Character Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center font-cinzel">
            Your Chosen City: {userWeather.name}
          </h3>
          <CharacterCard 
            character={userCharacter} 
            weather={userWeather}
            isUserChoice={true}
          />
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleExportPDF(userCharacter, userWeather)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => handleExportData(userCharacter, userWeather)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Data</span>
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-white text-center font-cinzel">
            Fate's Random City: {randomWeather.name}
          </h3>
          <CharacterCard 
            character={randomCharacter} 
            weather={randomWeather}
            isUserChoice={false}
          />
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => handleExportPDF(randomCharacter, randomWeather)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button
              onClick={() => handleExportData(randomCharacter, randomWeather)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 flex items-center space-x-2"
            >
              <Download className="w-4 h-4" />
              <span>Data</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
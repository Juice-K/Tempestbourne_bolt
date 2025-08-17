import React, { useState } from 'react';
import { WeatherForm } from './components/WeatherForm';
import { CharacterDisplay } from './components/CharacterDisplay';
import { ComparisonView } from './components/ComparisonView';
import { Header } from './components/Header';
import { Character, WeatherData } from './types';
import './styles/animations.css';

function App() {
  const [characters, setCharacters] = useState<{user: Character | null, random: Character | null}>({
    user: null,
    random: null
  });
  const [weatherData, setWeatherData] = useState<{user: WeatherData | null, random: WeatherData | null}>({
    user: null,
    random: null
  });
  const [currentView, setCurrentView] = useState<'form' | 'characters' | 'comparison'>('form');
  const [isLoading, setIsLoading] = useState(false);

  const handleCharactersGenerated = (
    userChar: Character, 
    randomChar: Character, 
    userWeather: WeatherData, 
    randomWeather: WeatherData
  ) => {
    setCharacters({ user: userChar, random: randomChar });
    setWeatherData({ user: userWeather, random: randomWeather });
    setCurrentView('characters');
  };

  const handleReset = () => {
    setCharacters({ user: null, random: null });
    setWeatherData({ user: null, random: null });
    setCurrentView('form');
    setIsLoading(false);
  };

  const getBackgroundClass = () => {
    if (currentView === 'form') return 'bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900';
    
    const weather = weatherData.user;
    if (!weather) return 'bg-gradient-to-br from-gray-800 to-gray-900';
    
    const condition = weather.weather[0].main.toLowerCase();
    
    if (condition.includes('clear')) return 'bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500';
    if (condition.includes('cloud')) return 'bg-gradient-to-br from-gray-400 via-gray-600 to-gray-800';
    if (condition.includes('rain')) return 'bg-gradient-to-br from-blue-600 via-blue-800 to-gray-900';
    if (condition.includes('thunder')) return 'bg-gradient-to-br from-purple-800 via-gray-900 to-black';
    if (condition.includes('snow')) return 'bg-gradient-to-br from-blue-100 via-blue-300 to-blue-600';
    if (condition.includes('mist') || condition.includes('fog')) return 'bg-gradient-to-br from-gray-300 via-gray-500 to-gray-700';
    
    return 'bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900';
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${getBackgroundClass()}`}>
      <Header 
        currentView={currentView} 
        onViewChange={setCurrentView}
        onReset={handleReset}
        hasCharacters={!!characters.user}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'form' && (
          <div className="fade-in">
            <WeatherForm 
              onCharactersGenerated={handleCharactersGenerated}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          </div>
        )}
        
        {currentView === 'characters' && characters.user && characters.random && weatherData.user && weatherData.random && (
          <div className="fade-in">
            <CharacterDisplay 
              userCharacter={characters.user}
              randomCharacter={characters.random}
              userWeather={weatherData.user}
              randomWeather={weatherData.random}
            />
          </div>
        )}
        
        {currentView === 'comparison' && characters.user && characters.random && weatherData.user && weatherData.random && (
          <div className="fade-in">
            <ComparisonView 
              userCharacter={characters.user}
              randomCharacter={characters.random}
              userWeather={weatherData.user}
              randomWeather={weatherData.random}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
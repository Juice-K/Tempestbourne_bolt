import jsPDF from 'jspdf';
import { Character, WeatherData } from '../types';

export function exportCharacterPDF(character: Character, weather: WeatherData) {
  const pdf = new jsPDF();
  
  // Title
  pdf.setFontSize(20);
  pdf.text('D&D 5E Character Sheet', 20, 30);
  
  // Character basic info
  pdf.setFontSize(16);
  pdf.text(`Name: ${character.name}`, 20, 50);
  pdf.text(`Race: ${character.race}`, 20, 65);
  pdf.text(`Class: ${character.class}`, 20, 80);
  pdf.text(`Level: ${character.level}`, 20, 95);
  pdf.text(`Alignment: ${character.alignment}`, 20, 110);
  pdf.text(`Gender: ${character.gender}`, 20, 125);
  
  // Weather info
  pdf.setFontSize(14);
  pdf.text('Weather Origin:', 20, 145);
  pdf.setFontSize(12);
  pdf.text(`City: ${weather.name}, ${weather.sys.country}`, 20, 160);
  pdf.text(`Condition: ${weather.weather[0].description}`, 20, 175);
  pdf.text(`Temperature: ${Math.round(weather.main.temp - 273.15)}°C`, 20, 190);
  pdf.text(`Humidity: ${weather.main.humidity}%`, 20, 205);
  
  // Ability Scores
  pdf.setFontSize(14);
  pdf.text('Ability Scores:', 120, 50);
  pdf.setFontSize(12);
  pdf.text(`STR: ${character.stats.strength}`, 120, 65);
  pdf.text(`DEX: ${character.stats.dexterity}`, 120, 80);
  pdf.text(`CON: ${character.stats.constitution}`, 120, 95);
  pdf.text(`INT: ${character.stats.intelligence}`, 120, 110);
  pdf.text(`WIS: ${character.stats.wisdom}`, 120, 125);
  pdf.text(`CHA: ${character.stats.charisma}`, 120, 140);
  
  // Appearance and Bio
  pdf.setFontSize(14);
  pdf.text('Appearance:', 20, 225);
  pdf.setFontSize(10);
  const appearanceLines = pdf.splitTextToSize(character.appearance, 170);
  pdf.text(appearanceLines, 20, 240);
  
  pdf.setFontSize(14);
  pdf.text('Biography:', 20, 260 + appearanceLines.length * 5);
  pdf.setFontSize(10);
  const bioLines = pdf.splitTextToSize(character.bio, 170);
  pdf.text(bioLines, 20, 275 + appearanceLines.length * 5);
  
  // Weather Influence
  pdf.setFontSize(14);
  pdf.text('Weather Influence:', 20, 295 + appearanceLines.length * 5 + bioLines.length * 5);
  pdf.setFontSize(10);
  const influenceLines = pdf.splitTextToSize(character.weatherInfluence, 170);
  pdf.text(influenceLines, 20, 310 + appearanceLines.length * 5 + bioLines.length * 5);
  
  pdf.save(`${character.name.replace(/\s+/g, '_')}_Character_Sheet.pdf`);
}

export function exportCharacterData(character: Character, weather: WeatherData) {
  const data = {
    character,
    weather: {
      city: weather.name,
      country: weather.sys.country,
      condition: weather.weather[0].description,
      temperature: Math.round(weather.main.temp - 273.15),
      humidity: weather.main.humidity,
      windSpeed: weather.wind.speed,
      pressure: weather.main.pressure
    },
    exportedAt: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(data, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `${character.name.replace(/\s+/g, '_')}_Character_Data.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}

export function exportBothCharacters(
  userCharacter: Character,
  randomCharacter: Character,
  userWeather: WeatherData,
  randomWeather: WeatherData
) {
  // Create a comprehensive data structure
  const bothCharactersData = {
    userCharacter: {
      character: userCharacter,
      weather: {
        city: userWeather.name,
        country: userWeather.sys.country,
        condition: userWeather.weather[0].description,
        temperature: Math.round(userWeather.main.temp - 273.15),
        humidity: userWeather.main.humidity,
        windSpeed: userWeather.wind.speed,
        pressure: userWeather.main.pressure
      }
    },
    randomCharacter: {
      character: randomCharacter,
      weather: {
        city: randomWeather.name,
        country: randomWeather.sys.country,
        condition: randomWeather.weather[0].description,
        temperature: Math.round(randomWeather.main.temp - 273.15),
        humidity: randomWeather.main.humidity,
        windSpeed: randomWeather.wind.speed,
        pressure: randomWeather.main.pressure
      }
    },
    comparison: {
      temperatureDiff: Math.round(userWeather.main.temp - randomWeather.main.temp),
      humidityDiff: userWeather.main.humidity - randomWeather.main.humidity,
      windSpeedDiff: userWeather.wind.speed - randomWeather.wind.speed
    },
    exportedAt: new Date().toISOString()
  };
  
  const dataStr = JSON.stringify(bothCharactersData, null, 2);
  const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
  
  const exportFileDefaultName = `Tempestbourne_Both_Characters_${new Date().toISOString().split('T')[0]}.json`;
  
  const linkElement = document.createElement('a');
  linkElement.setAttribute('href', dataUri);
  linkElement.setAttribute('download', exportFileDefaultName);
  linkElement.click();
}
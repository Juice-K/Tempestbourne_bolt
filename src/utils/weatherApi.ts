import { WeatherData } from '../types';

const API_KEY = '8c24e98b5a5fc8ca8b9c4b5c87b26b07'; // Demo API key - users should replace with their own
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

export async function getWeatherData(city: string): Promise<WeatherData> {
  try {
    const response = await fetch(`${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`City "${city}" not found. Please check the spelling and try again.`);
      }
      throw new Error(`Weather API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to fetch weather data. Please check your internet connection.');
  }
}
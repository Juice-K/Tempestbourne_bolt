import React, { useState } from 'react';
import { MapPin, Calendar, Clock, User, Zap, Loader2 } from 'lucide-react';
import { generateCharacter } from '../utils/characterGenerator';
import { getWeatherData } from '../utils/weatherApi';
import { Character, WeatherData, FormData } from '../types';
import { RANDOM_CITIES } from '../utils/constants';

interface WeatherFormProps {
  onCharactersGenerated: (userChar: Character, randomChar: Character, userWeather: WeatherData, randomWeather: WeatherData) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export function WeatherForm({ onCharactersGenerated, isLoading, setIsLoading }: WeatherFormProps) {
  const [formData, setFormData] = useState<FormData>({
    city: '',
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    gender: 'Any',
    level: 1
  });

  const [errors, setErrors] = useState<Partial<FormData>>({});

  const validateForm = (): boolean => {
    const newErrors: Partial<FormData> = {};

    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else {
      const selectedDate = new Date(formData.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      if (selectedDate < today) {
        newErrors.date = 'Please select a future date';
      }
    }

    if (!formData.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    
    try {
      // Get user city weather
      const userWeather = await getWeatherData(formData.city);
      
      // Get random city weather
      const randomCity = RANDOM_CITIES[Math.floor(Math.random() * RANDOM_CITIES.length)];
      const randomWeather = await getWeatherData(randomCity);
      
      // Generate characters
      const userCharacter = generateCharacter(userWeather, formData.gender, formData.level);
      const randomCharacter = generateCharacter(randomWeather, formData.gender, formData.level);
      
      onCharactersGenerated(userCharacter, randomCharacter, userWeather, randomWeather);
    } catch (error) {
      console.error('Error generating characters:', error);
      alert('Error generating characters. Please check your city name and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setFormData({
      city: '',
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      gender: 'Any',
      level: 1
    });
    setErrors({});
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-white mb-4 font-cinzel">Weather-Forged Heroes</h2>
        <p className="text-white/80 text-lg">
          Enter your details to generate D&D characters shaped by the storms and sunshine of destiny
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City Input */}
          <div className="md:col-span-2">
            <label className="flex items-center text-white font-medium mb-3">
              <MapPin className="w-5 h-5 mr-2" />
              City
            </label>
            <input
              type="text"
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                errors.city ? 'border-red-400' : 'border-white/30'
              }`}
              placeholder="Enter a city name (e.g., London, Tokyo, New York)"
            />
            {errors.city && <p className="text-red-300 text-sm mt-1">{errors.city}</p>}
          </div>

          {/* Date Input */}
          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <Calendar className="w-5 h-5 mr-2" />
              Date
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
              className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                errors.date ? 'border-red-400' : 'border-white/30'
              }`}
            />
            {errors.date && <p className="text-red-300 text-sm mt-1">{errors.date}</p>}
          </div>

          {/* Time Input */}
          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <Clock className="w-5 h-5 mr-2" />
              Time
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
              className={`w-full px-4 py-3 bg-white/20 border rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all ${
                errors.time ? 'border-red-400' : 'border-white/30'
              }`}
            />
            {errors.time && <p className="text-red-300 text-sm mt-1">{errors.time}</p>}
          </div>

          {/* Gender Selection */}
          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <User className="w-5 h-5 mr-2" />
              Gender
            </label>
            <select
              value={formData.gender}
              onChange={(e) => setFormData(prev => ({ ...prev, gender: e.target.value }))}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              <option value="Any">Any</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Non-binary">Non-binary</option>
            </select>
          </div>

          {/* Level Selection */}
          <div>
            <label className="flex items-center text-white font-medium mb-3">
              <Zap className="w-5 h-5 mr-2" />
              Level
            </label>
            <select
              value={formData.level}
              onChange={(e) => setFormData(prev => ({ ...prev, level: parseInt(e.target.value) }))}
              className="w-full px-4 py-3 bg-white/20 border border-white/30 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map(level => (
                <option key={level} value={level}>Level {level}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button
            type="submit"
            disabled={isLoading}
            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Forging Characters...</span>
              </>
            ) : (
              <>
                <Zap className="w-5 h-5" />
                <span>Generate Characters</span>
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="bg-white/20 hover:bg-white/30 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Clear Form
          </button>
        </div>
      </form>
    </div>
  );
}
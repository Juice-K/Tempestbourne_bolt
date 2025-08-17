export interface WeatherData {
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  wind: {
    speed: number;
    deg?: number;
    gust?: number;
  };
  clouds: {
    all: number;
  };
  visibility?: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  dt: number;
}

export interface Character {
  id: string;
  name: string;
  race: string;
  class: string;
  level: number;
  alignment: string;
  appearance: string;
  bio: string;
  stats: {
    strength: number;
    dexterity: number;
    constitution: number;
    intelligence: number;
    wisdom: number;
    charisma: number;
  };
  weatherInfluence: string;
  cityOrigin: string;
  gender: string;
}

export interface FormData {
  city: string;
  date: string;
  time: string;
  gender: string;
  level: number;
}
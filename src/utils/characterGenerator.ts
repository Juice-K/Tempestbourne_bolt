import { Character, WeatherData } from '../types';
import { 
  DND_RACES, 
  DND_CLASSES, 
  DND_ALIGNMENTS, 
  MALE_NAMES, 
  FEMALE_NAMES, 
  FANTASY_SURNAMES 
} from './constants';

export function generateCharacter(
  weather: WeatherData, 
  preferredGender: string, 
  level: number
): Character {
  const temperature = weather.main.temp - 273.15; // Convert to Celsius
  const humidity = weather.main.humidity;
  const windSpeed = weather.wind.speed;
  const weatherCondition = weather.weather[0].main.toLowerCase();
  const cloudiness = weather.clouds.all;

  // Generate gender
  const genders = preferredGender === 'Any' 
    ? ['Male', 'Female', 'Non-binary'] 
    : [preferredGender];
  const gender = genders[Math.floor(Math.random() * genders.length)];

  // Generate name based on gender
  const firstNames = gender === 'Female' ? FEMALE_NAMES : 
                    gender === 'Male' ? MALE_NAMES :
                    [...MALE_NAMES, ...FEMALE_NAMES];
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const lastName = FANTASY_SURNAMES[Math.floor(Math.random() * FANTASY_SURNAMES.length)];
  const name = `${firstName} ${lastName}`;

  // Weather-influenced race selection
  let race = DND_RACES[Math.floor(Math.random() * DND_RACES.length)];
  
  if (temperature < 0) {
    race = ['Goliath', 'Dwarf', 'Dragonborn'][Math.floor(Math.random() * 3)];
  } else if (temperature > 30) {
    race = ['Tiefling', 'Dragonborn', 'Human'][Math.floor(Math.random() * 3)];
  } else if (weatherCondition.includes('rain')) {
    race = ['Triton', 'Sea Elf', 'Half-Elf'][Math.floor(Math.random() * 3)];
  } else if (windSpeed > 10) {
    race = ['Aarakocra', 'Air Genasi', 'Variant Human'][Math.floor(Math.random() * 3)];
  }

  // Weather-influenced class selection
  let characterClass = DND_CLASSES[Math.floor(Math.random() * DND_CLASSES.length)];
  
  if (weatherCondition.includes('storm') || weatherCondition.includes('thunder')) {
    characterClass = ['Sorcerer', 'Tempest Cleric', 'Storm Herald Barbarian'][Math.floor(Math.random() * 3)];
  } else if (weatherCondition.includes('clear')) {
    characterClass = ['Paladin', 'Light Cleric', 'Divine Soul Sorcerer'][Math.floor(Math.random() * 3)];
  } else if (weatherCondition.includes('rain')) {
    characterClass = ['Druid', 'Ranger', 'Nature Cleric'][Math.floor(Math.random() * 3)];
  } else if (weatherCondition.includes('fog') || weatherCondition.includes('mist')) {
    characterClass = ['Rogue', 'Shadow Monk', 'Warlock'][Math.floor(Math.random() * 3)];
  } else if (weatherCondition.includes('snow')) {
    characterClass = ['Ranger', 'Circle of the Land Druid', 'Hunter'][Math.floor(Math.random() * 3)];
  }

  // Weather-influenced alignment
  let alignment = DND_ALIGNMENTS[Math.floor(Math.random() * DND_ALIGNMENTS.length)];
  
  if (weatherCondition.includes('storm')) {
    alignment = ['Chaotic Neutral', 'Chaotic Good', 'Chaotic Evil'][Math.floor(Math.random() * 3)];
  } else if (weatherCondition.includes('clear')) {
    alignment = ['Lawful Good', 'Neutral Good', 'Lawful Neutral'][Math.floor(Math.random() * 3)];
  } else if (humidity > 80) {
    alignment = ['True Neutral', 'Neutral Good', 'Neutral Evil'][Math.floor(Math.random() * 3)];
  }

  // Generate stats influenced by weather
  const baseStats = generateBaseStats(level);
  const weatherModifiedStats = applyWeatherModifiers(baseStats, weather);

  // Generate appearance influenced by weather
  const appearance = generateAppearance(weather, race, gender);

  // Generate bio influenced by weather
  const bio = generateBio(weather, race, characterClass, weather.name);

  // Generate weather influence description
  const weatherInfluence = generateWeatherInfluence(weather);

  return {
    id: crypto.randomUUID(),
    name,
    race,
    class: characterClass,
    level,
    alignment,
    appearance,
    bio,
    stats: weatherModifiedStats,
    weatherInfluence,
    cityOrigin: weather.name,
    gender
  };
}

function generateBaseStats(level: number) {
  const baseStatValue = 8 + level; // Scale with level
  
  return {
    strength: baseStatValue + Math.floor(Math.random() * 6),
    dexterity: baseStatValue + Math.floor(Math.random() * 6),
    constitution: baseStatValue + Math.floor(Math.random() * 6),
    intelligence: baseStatValue + Math.floor(Math.random() * 6),
    wisdom: baseStatValue + Math.floor(Math.random() * 6),
    charisma: baseStatValue + Math.floor(Math.random() * 6)
  };
}

function applyWeatherModifiers(stats: any, weather: WeatherData) {
  const temperature = weather.main.temp - 273.15;
  const windSpeed = weather.wind.speed;
  const humidity = weather.main.humidity;
  const condition = weather.weather[0].main.toLowerCase();
  
  // Temperature effects
  if (temperature < 0) {
    stats.constitution += 2; // Cold hardiness
    stats.dexterity -= 1; // Stiffness
  } else if (temperature > 30) {
    stats.charisma += 1; // Warmth and openness
    stats.constitution -= 1; // Heat exhaustion
  }
  
  // Wind effects
  if (windSpeed > 10) {
    stats.dexterity += 2; // Agility in wind
    stats.strength -= 1; // Harder to be steady
  }
  
  // Weather condition effects
  if (condition.includes('storm') || condition.includes('thunder')) {
    stats.charisma += 2; // Dramatic presence
    stats.wisdom += 1; // Storm wisdom
  } else if (condition.includes('clear')) {
    stats.wisdom += 2; // Clear thinking
    stats.intelligence += 1; // Mental clarity
  } else if (condition.includes('rain')) {
    stats.wisdom += 2; // Contemplative
    stats.constitution += 1; // Rain resilience
  }
  
  // Humidity effects
  if (humidity > 80) {
    stats.constitution += 1; // Humid adaptation
  }
  
  // Ensure stats stay within reasonable bounds
  Object.keys(stats).forEach(key => {
    stats[key] = Math.max(6, Math.min(20, stats[key]));
  });
  
  return stats;
}

function generateAppearance(weather: WeatherData, race: string, gender: string): string {
  const temperature = weather.main.temp - 273.15;
  const condition = weather.weather[0].main.toLowerCase();
  const windSpeed = weather.wind.speed;
  
  let appearance = `A ${race.toLowerCase()} with `;
  
  // Weather-influenced features
  if (condition.includes('storm')) {
    appearance += "storm-grey eyes that flash like lightning and wind-tousled hair. ";
  } else if (condition.includes('clear')) {
    appearance += "bright, sun-kissed features and hair that gleams like golden wheat. ";
  } else if (condition.includes('rain')) {
    appearance += "deep blue-green eyes like rain pools and hair dark as storm clouds. ";
  } else if (condition.includes('snow')) {
    appearance += "pale, frost-touched skin and silver-white hair like fresh snow. ";
  } else {
    appearance += "weathered features that speak of many seasons and storms endured. ";
  }
  
  // Temperature influences
  if (temperature < 0) {
    appearance += "Their skin has the hardy resilience of one born to winter's embrace, ";
  } else if (temperature > 30) {
    appearance += "Their complexion is bronzed by endless summer suns, ";
  }
  
  // Wind influences
  if (windSpeed > 10) {
    appearance += "and their movements are as fluid and graceful as wind through leaves.";
  } else {
    appearance += "and they carry themselves with the steady presence of calm skies.";
  }
  
  return appearance;
}

function generateBio(weather: WeatherData, race: string, characterClass: string, cityName: string): string {
  const condition = weather.weather[0].main.toLowerCase();
  const temperature = weather.main.temp - 273.15;
  
  let bio = `Born in the ${cityName} region, this ${race.toLowerCase()} ${characterClass.toLowerCase()} `;
  
  if (condition.includes('storm')) {
    bio += "was shaped by the violent tempests that frequent their homeland. They learned early that power flows like lightning - unpredictable, dangerous, but capable of illuminating the darkest nights.";
  } else if (condition.includes('clear')) {
    bio += "grew up under endless clear skies, developing an unshakeable optimism and clarity of purpose. They believe that like the sun, hope always returns after the darkest night.";
  } else if (condition.includes('rain')) {
    bio += "was nurtured by the gentle rains of their homeland, learning patience and the value of quiet contemplation. They understand that growth requires both storms and gentle showers.";
  } else if (condition.includes('snow')) {
    bio += "was forged in the harsh beauty of winter, developing incredible endurance and a deep appreciation for the rare moments of warmth and companionship.";
  } else {
    bio += "learned to read the ever-changing skies of their homeland, becoming adaptable and wise in the ways of nature's moods and mysteries.";
  }
  
  return bio;
}

function generateWeatherInfluence(weather: WeatherData): string {
  const condition = weather.weather[0].description;
  const temperature = Math.round(weather.main.temp - 273.15);
  const windSpeed = weather.wind.speed;
  
  return `Forged by ${condition} at ${temperature}°C with ${windSpeed}m/s winds, this character embodies the very essence of their homeland's climate, carrying its power and wisdom within their soul.`;
}
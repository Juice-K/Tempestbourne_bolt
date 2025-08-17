# Tempestbourne - Weather-Based D&D Character Generator

A beautiful web application that generates D&D 5E characters based on real weather data from around the world.

## Features

- **Weather-Driven Character Generation**: Characters are shaped by real weather conditions from OpenWeatherMap API
- **Dual Character Creation**: Generate one character from your chosen city and another from a random location
- **Interactive Comparisons**: Visual charts comparing weather patterns and character statistics
- **Export Options**: Download character sheets as PDFs or structured JSON data
- **Responsive Design**: Beautiful, mobile-friendly interface with weather-themed backgrounds
- **Real-time Weather Data**: Live weather information influences character traits, abilities, and backstories

## How It Works

1. **Input**: Enter a city, date, time, preferred gender, and character level
2. **Weather Fetch**: The app retrieves current weather data for your city and a random city
3. **Character Generation**: Advanced algorithms create characters influenced by:
   - Temperature (affects constitution and race selection)
   - Weather conditions (influences class and alignment)
   - Wind speed (impacts dexterity and character traits)
   - Humidity and atmospheric pressure (shapes personality and backstory)
4. **Display**: View both characters with detailed stats, appearance, and weather-influenced backstories
5. **Compare**: Analyze differences through interactive charts and side-by-side comparisons
6. **Export**: Download character sheets, data files, or both characters together

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Charts**: Chart.js with React integration
- **Weather API**: OpenWeatherMap
- **Export**: jsPDF for character sheets, JSON for data
- **Build Tool**: Vite
- **Deployment**: Bolt Hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OpenWeatherMap API key (free tier available)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/tempestbourne.git
cd tempestbourne
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create .env file with your OpenWeatherMap API key
echo "VITE_OPENWEATHER_API_KEY=your_api_key_here" > .env
```

4. Start the development server:
```bash
npm run dev
```

5. Open [http://localhost:5173](http://localhost:5173) in your browser

### Building for Production

```bash
npm run build
npm run preview
```

## API Configuration

The app uses OpenWeatherMap API for weather data. You can:

1. Get a free API key at [OpenWeatherMap](https://openweathermap.org/api)
2. Replace the demo key in `src/utils/weatherApi.ts`
3. For production, use environment variables

## Character Generation Logic

Characters are generated using sophisticated weather-to-D&D mappings:

### Weather Influences
- **Temperature**: Cold weather favors hardy races (Goliath, Dwarf), hot weather suits fire-resistant races (Tiefling, Dragonborn)
- **Precipitation**: Rain influences nature-based classes (Druid, Ranger), storms create chaotic alignments
- **Wind**: High winds boost dexterity and favor agile classes (Rogue, Monk)
- **Atmospheric Conditions**: Fog/mist suits stealth classes, clear skies favor lawful alignments

### Stat Modifications
- Constitution increases in extreme temperatures
- Dexterity boosts in windy conditions  
- Wisdom increases during storms and rain
- Charisma enhanced by pleasant weather

## Project Structure

```
tempestbourne/
├── src/
│   ├── components/          # React components
│   │   ├── Header.tsx
│   │   ├── WeatherForm.tsx
│   │   ├── CharacterCard.tsx
│   │   ├── CharacterDisplay.tsx
│   │   ├── ComparisonView.tsx
│   │   └── ...
│   ├── utils/              # Utility functions
│   │   ├── weatherApi.ts
│   │   ├── characterGenerator.ts
│   │   ├── exportUtils.ts
│   │   └── constants.ts
│   ├── types/              # TypeScript definitions
│   ├── styles/             # CSS and animations
│   └── App.tsx             # Main application
├── public/                 # Static assets
└── package.json
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Roadmap

- [ ] Additional weather APIs (AccuWeather, Weather.gov)
- [ ] More D&D races and classes
- [ ] Character image generation
- [ ] Campaign integration tools
- [ ] Weather history analysis
- [ ] Multiplayer character creation sessions

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- OpenWeatherMap for weather data
- Wizards of the Coast for D&D 5E system
- Chart.js for beautiful visualizations
- The D&D community for inspiration

## Live Demo

Visit the live application: [https://tempestbourne-weathe-cz4k.bolt.host](https://tempestbourne-weathe-cz4k.bolt.host)

---

*"Where weather meets destiny, heroes are born."*
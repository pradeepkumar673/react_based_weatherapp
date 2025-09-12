import React, { useState } from 'react';
import clear from '../assets/clear.png';
import cloud from '../assets/cloud.png';
import rain from '../assets/rain.png';
import drizzle from '../assets/drizzle.png';
import snow from '../assets/snow.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';
import searchIcon from '../assets/search.png';

const Weather = () => {
  const [city, setCity] = useState('Ambur');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unit, setUnit] = useState('metric');
  React.useEffect(() => {
    fetchWeather();
  }, []); // Fetch once on mount
  
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;
  const getWeatherIcon = (condition) => {
    switch(condition.toLowerCase()) {
      case 'clear': return clear;
      case 'clouds': return cloud;
      case 'rain': return rain;
      case 'drizzle': return drizzle;
      case 'snow': return snow;
      default: return clear;
    }
  };

  const fetchWeather = async () => {
    if (!city.trim()) return;
    
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${apiKey}`
      );
      
      if (!response.ok) throw new Error('City not found');
      
      const data = await response.json();
      setWeather({
        temp: Math.round(data.main.temp),
        humidity: data.main.humidity,
        wind: data.wind.speed,
        condition: data.weather[0].main,
        lat: data.coord.lat,
        lon: data.coord.lon,
        cityName: data.name,
        country: data.sys.country
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Single useEffect for initial load
  React.useEffect(() => {
    fetchWeather();
  }, []); // Auto-load on mount

  return (
    <div className="max-w-2xl w-full mx-auto bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 transition-all duration-500 hover:shadow-2xl hover:scale-[1.01] border border-white/20 hover:border-white/30 animate-glow min-h-[60vh] flex flex-col items-center justify-center">
      <div className="flex gap-2 mb-6 ">
        <input
          type="text"
          placeholder="Enter city"
          className="flex-1 p-2 border text-gray-200 rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:border-transparent bg-black/25 backdrop-blur-sm"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && fetchWeather()}
        />
        <button 
          onClick={fetchWeather}
          className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <img src={searchIcon} alt="Search" className="w-6 h-6" />
        </button>
      </div>

      {loading && <p className="text-center">Please wait....</p>}
      
      {error && (
        <p className="text-red-500 text-center mb-4">{error}</p>
      )}

      {weather && !loading && (
        <div className="space-y-4">
          <div className="text-center">
            <img 
              src={getWeatherIcon(weather.condition)} 
              alt="Weather" 
              className="w-24 h-24 mx-auto" 
            />
            <div className="flex items-center justify-center gap-3">
              <p className="text-5xl font-bold mt-2 text-gray-50">
                {unit === 'metric' ? weather.temp : Math.round((weather.temp * 9/5) + 32)}°{unit === 'metric' ? 'C' : 'F'}
              </p>
              <button
                onClick={() => setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')}
                className={`mt-2 px-3 py-1 rounded-lg transition-colors border-none shadow-xl ${
                  unit === 'metric'
                    ? 'bg-red-400 text-white  hover:bg-red-500'
                    : 'bg-white text-red-400 hover:bg-blue-200'
                }`}
              >
                °{unit === 'metric' ? 'F' : 'C'}
              </button>
            </div>
            <div className="col-span-2 p-3 bg-black/25 rounded-lg mt-4">
              <p className="text-sm font-mono text-gray-50">
                Coordinates: {weather.lat.toFixed(2)}, {weather.lon.toFixed(2)}
              </p>
            </div>
            <p className="text-gray-50 mt-2">{weather.cityName}, {weather.country}</p>
            <p className="text-lg text-gray-50 mt-1">{weather.condition}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-black/25 rounded-lg">
              <img src={humidityIcon} alt="Humidity" className="w-8 h-8" />
              <div className='pl-2'>
                <p className="font-semibold text-gray-50">{weather.humidity}%</p>
                <p className="text-sm text-gray-500">Humidity</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-black/25 rounded-lg">
              <img src={windIcon} alt="Wind" className="w-8 h-8" />
              <div className='pl-2'>
                <p className="font-semibold text-gray-50">{weather.wind} km/h</p>
                <p className="text-sm text-gray-500">Wind Speed</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
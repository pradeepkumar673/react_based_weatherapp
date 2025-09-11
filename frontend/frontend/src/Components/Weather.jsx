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
  }, []); // Runs once on component mount

  
    React.useEffect(() => {
      fetchWeather();
    }, []); // Auto-fetch on mount
  
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

  React.useEffect(() => {
    fetchWeather();
  }, []); // Auto-load Ambur weather on mount

  React.useEffect(() => {
    fetchWeather();
  }, []); // Auto-fetch on component mount

  return (
    <div className="max-w-2xl w-full mx-4 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 transition-all duration-300 hover:shadow-2xl">
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter city"
          className="flex-1 p-2 border rounded-lg transition-all duration-300 ease-in-out transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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

      {loading && <p className="text-center">Loading...</p>}
      
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
              <p className="text-5xl font-bold mt-2">
                {weather.temp}°{unit === 'metric' ? 'C' : 'F'}
              </p>
              <button
                onClick={() => setUnit(prev => prev === 'metric' ? 'imperial' : 'metric')}
                className="mt-2 px-3 py-1 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
              >
                °{unit === 'metric' ? 'F' : 'C'}
              </button>
            </div>
            <div className="col-span-2 p-3 bg-gray-50 rounded-lg mt-4">
              <p className="text-sm font-mono text-gray-600">
                Coordinates: {weather.lat.toFixed(2)}, {weather.lon.toFixed(2)}
              </p>
            </div>
            <p className="text-gray-600 mt-2">{weather.cityName}, {weather.country}</p>
            <p className="text-lg text-gray-700 mt-1">{weather.condition}</p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <img src={humidityIcon} alt="Humidity" className="w-8 h-8" />
              <div>
                <p className="font-semibold">{weather.humidity}%</p>
                <p className="text-sm text-gray-500">Humidity</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
              <img src={windIcon} alt="Wind" className="w-8 h-8" />
              <div>
                <p className="font-semibold">{weather.wind} km/h</p>
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
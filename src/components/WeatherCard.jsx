import React, { useMemo } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const WeatherCard = ({ location }) => {
  const { isDarkMode } = useTheme();
  const nearestForecast = useMemo(() => {
    const now = new Date();
    return location.cuaca[0].reduce((nearest, forecast) => {
      const forecastTime = new Date(forecast.local_datetime);
      const currentDiff = Math.abs(now - new Date(nearest.local_datetime));
      const newDiff = Math.abs(now - forecastTime);
      return newDiff < currentDiff ? forecast : nearest;
    });
  }, [location]);

  const getWeatherIcon = (weatherDesc) => {
    const lowerDesc = weatherDesc.toLowerCase();
    if (lowerDesc.includes('cerah')) return 'fa-sun';
    if (lowerDesc.includes('berawan')) return 'fa-cloud-sun';
    if (lowerDesc.includes('hujan')) return 'fa-cloud-showers-heavy';
    if (lowerDesc.includes('petir')) return 'fa-bolt';
    return 'fa-cloud';
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} rounded-xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 animate-fade-in h-full`}>
      <div className="p-6 flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl sm:text-3xl font-semibold">{location.lokasi.kotkab}</h2>
          <i className={`fas ${getWeatherIcon(nearestForecast.weather_desc)} text-4xl sm:text-5xl ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}></i>
        </div>
        <p className={`text-lg sm:text-xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'} mb-4`}>{nearestForecast.weather_desc}</p>
        <div className="mb-4">
          <p className="text-4xl sm:text-5xl font-bold">{nearestForecast.t}°C</p>
        </div>
        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div>
            <p className="text-sm font-medium">Humidity</p>
            <p className="text-base sm:text-lg">{nearestForecast.hu}%</p>
          </div>
          <div>
            <p className="text-sm font-medium">Wind</p>
            <p className="text-base sm:text-lg">{nearestForecast.wd} {nearestForecast.ws} km/h</p>
          </div>
          <div>
            <p className="text-sm font-medium">Visibility</p>
            <p className="text-base sm:text-lg">{nearestForecast.vs_text}</p>
          </div>
          <div>
            <p className="text-sm font-medium">Forecast Time</p>
            <p className="text-base sm:text-lg">{formatTime(nearestForecast.local_datetime)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;

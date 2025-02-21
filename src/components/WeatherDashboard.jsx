import React, { useState, useEffect } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import Countdown from './Countdown';
import CurrentTime from './CurrentTime';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '../contexts/ThemeContext';

function WeatherDashboard() {
  const [weatherData, setWeatherData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [countdown, setCountdown] = useState(60);
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('https://api.bmkg.go.id/publik/prakiraan-cuaca?adm1=18');
        const locations = response.data.data;
        updateRandomLocations(locations);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to fetch weather data');
        setLoading(false);
      }
    };

    fetchWeatherData();

    const intervalId = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount === 1) {
          fetchWeatherData();
          return 60;
        }
        return prevCount - 1;
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const updateRandomLocations = (locations) => {
    const shuffled = [...locations].sort(() => 0.5 - Math.random());
    const randomLocations = shuffled.slice(0, 3);
    setWeatherData(randomLocations);
  };

  if (loading) return <div className={`flex justify-center items-center h-screen ${isDarkMode ? 'text-white' : 'text-gray-800'} text-2xl`}>Loading...</div>;
  if (error) return <div className="flex justify-center items-center h-screen text-red-500 text-2xl">{error}</div>;

  return (
    <div className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 flex flex-col justify-between ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'}`}>
      <header className="text-center relative">
        <div className="absolute right-0 top-0">
          <ThemeToggle />
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Lampung Weather Forecast</h1>
        <CurrentTime />
        <Countdown countdown={countdown} />
      </header>
      <main className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {weatherData.map((location, index) => (
            <WeatherCard key={`${location.lokasi.kotkab}-${index}`} location={location} />
          ))}
        </div>
      </main>
      <footer className={`text-center mt-8 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
        <p>Data provided by BMKG</p>
        <p className="mt-2">&copy; {new Date().getFullYear()} Angga Pratama. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default WeatherDashboard;

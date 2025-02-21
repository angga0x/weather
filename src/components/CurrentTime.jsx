import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const CurrentTime = () => {
  const [time, setTime] = useState(new Date());
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  return (
    <div className="text-center mb-4">
      <p className={`text-xl sm:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
        Current Time: <span className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>{formatTime(time)}</span>
      </p>
    </div>
  );
};

export default CurrentTime;

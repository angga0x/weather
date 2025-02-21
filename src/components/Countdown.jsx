import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const Countdown = ({ countdown }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="text-center mb-6">
      <p className={`text-xl sm:text-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
        Next update in: <span className={`font-bold ${isDarkMode ? 'text-blue-400' : 'text-blue-500'}`}>{countdown}</span> seconds
      </p>
    </div>
  );
};

export default Countdown;

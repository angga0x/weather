import React from 'react';
import WeatherDashboard from './components/WeatherDashboard';
import { ThemeProvider } from './contexts/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <WeatherDashboard />
    </ThemeProvider>
  );
}

export default App;

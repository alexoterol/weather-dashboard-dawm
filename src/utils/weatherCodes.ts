
import type { WeatherCodeInfo } from '../types/weather';

export const weatherCodes: Record<number, WeatherCodeInfo> = {
  0: { description: 'Cielo despejado', icon: '☀️', color: '#E1BC29' },
  1: { description: 'Principalmente despejado', icon: '🌤️', color: '#E1BC29' },
  2: { description: 'Parcialmente nublado', icon: '⛅', color: '#2B3A67' },
  3: { description: 'Nublado', icon: '☁️', color: '#2B3A67' },
  45: { description: 'Niebla', icon: '🌫️', color: '#080F0F' },
  48: { description: 'Niebla con escarcha', icon: '🌫️', color: '#080F0F' },
  51: { description: 'Llovizna ligera', icon: '🌦️', color: '#2B3A67' },
  53: { description: 'Llovizna moderada', icon: '🌦️', color: '#2B3A67' },
  55: { description: 'Llovizna intensa', icon: '🌧️', color: '#C8102E' },
  56: { description: 'Llovizna helada ligera', icon: '🌨️', color: '#080F0F' },
  57: { description: 'Llovizna helada intensa', icon: '🌨️', color: '#C8102E' },
  61: { description: 'Lluvia ligera', icon: '🌧️', color: '#2B3A67' },
  63: { description: 'Lluvia moderada', icon: '🌧️', color: '#2B3A67' },
  65: { description: 'Lluvia intensa', icon: '⛈️', color: '#C8102E' },
  66: { description: 'Lluvia helada ligera', icon: '🌨️', color: '#080F0F' },
  67: { description: 'Lluvia helada intensa', icon: '🌨️', color: '#C8102E' },
  71: { description: 'Nieve ligera', icon: '❄️', color: '#FFFFFF' },
  73: { description: 'Nieve moderada', icon: '❄️', color: '#2B3A67' },
  75: { description: 'Nieve intensa', icon: '🌨️', color: '#C8102E' },
  77: { description: 'Granizo', icon: '🧊', color: '#080F0F' },
  80: { description: 'Chubascos ligeros', icon: '🌦️', color: '#2B3A67' },
  81: { description: 'Chubascos moderados', icon: '🌧️', color: '#2B3A67' },
  82: { description: 'Chubascos intensos', icon: '⛈️', color: '#C8102E' },
  85: { description: 'Chubascos de nieve ligeros', icon: '🌨️', color: '#2B3A67' },
  86: { description: 'Chubascos de nieve intensos', icon: '🌨️', color: '#C8102E' },
  95: { description: 'Tormenta', icon: '⛈️', color: '#C8102E' },
  96: { description: 'Tormenta con granizo ligero', icon: '⛈️', color: '#C8102E' },
  99: { description: 'Tormenta con granizo intenso', icon: '⛈️', color: '#C8102E' }
};

export const getWeatherInfo = (code: number): WeatherCodeInfo => {
  return weatherCodes[code] || { 
    description: 'Condición desconocida', 
    icon: '❓', 
    color: '#080F0F' 
  };
};

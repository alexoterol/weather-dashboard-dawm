
import type { WeatherData, LocationData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';

export const weatherApi = {
  async getCurrentWeather(latitude: number, longitude: number): Promise<WeatherData> {
    try {
      const params = new URLSearchParams({
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'apparent_temperature',
          'is_day',
          'precipitation',
          'weather_code',
          'cloud_cover',
          'pressure_msl',
          'surface_pressure',
          'wind_speed_10m',
          'wind_direction_10m',
          'wind_gusts_10m'
        ].join(','),
        hourly: [
          'temperature_2m',
          'relative_humidity_2m',
          'precipitation_probability',
          'precipitation',
          'weather_code',
          'cloud_cover',
          'wind_speed_10m'
        ].join(','),
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'sunrise',
          'sunset',
          'uv_index_max',
          'precipitation_sum',
          'rain_sum',
          'showers_sum',
          'snowfall_sum',
          'precipitation_hours',
          'precipitation_probability_max',
          'wind_speed_10m_max',
          'wind_gusts_10m_max',
          'wind_direction_10m_dominant'
        ].join(','),
        timezone: 'auto',
        forecast_days: '7'
      });

      const response = await fetch(`${BASE_URL}/forecast?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Datos meteorológicos obtenidos:', data);
      return data;
    } catch (error) {
      console.error('Error al obtener datos meteorológicos:', error);
      throw error;
    }
  },

  async searchLocations(query: string): Promise<LocationData[]> {
    try {
      if (!query.trim()) return [];

      const params = new URLSearchParams({
        name: query,
        count: '10',
        language: 'es',
        format: 'json'
      });

      const response = await fetch(`${GEOCODING_URL}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Ubicaciones encontradas:', data);
      
      return data.results || [];
    } catch (error) {
      console.error('Error al buscar ubicaciones:', error);
      return [];
    }
  }
};

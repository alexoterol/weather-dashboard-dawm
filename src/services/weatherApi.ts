
import type { WeatherData, LocationData } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';
const GEOCODING_URL = 'https://geocoding-api.open-meteo.com/v1';
const CACHE_TTL_MINUTES = 5;

function generateCacheKey(url: string) {
  return `api_cache_${url}`;
}

function setCache(key: string, data: any) {
  const cacheEntry = {
    data: data,
    timestamp: Date.now()
  };
  localStorage.setItem(key, JSON.stringify(cacheEntry));
}

function getValidCache(key: string) {
  const item = localStorage.getItem(key) as string;
  if (!item) {
    return null;
  }
  const cacheEntry = JSON.parse(item);
  
  const now = Date.now();
  const elapsedMinutes = (now - cacheEntry.timestamp) / (1000 * 60);
  
  if (elapsedMinutes < CACHE_TTL_MINUTES) {
    return cacheEntry.data;
  } else {
    localStorage.removeItem(key);
    return null;
  }
}

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

      const cacheKey = generateCacheKey(`${BASE_URL}/forecast?${params}`);
      const cachedData = getValidCache(cacheKey)

      if (cachedData) {
        return cachedData;
      }
      const response = await fetch(`${BASE_URL}/forecast?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error en la API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCache(cacheKey, data);
      console.log('Datos meteorológicos obtenidos:', data);
      return data;
    } catch (error) {
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
      const cacheKey = generateCacheKey(`${BASE_URL}/forecast?${params}`);
      const staleItem = localStorage.getItem(cacheKey) as string;
      if (staleItem){
        const staleCacheEntry = JSON.parse(staleItem);
        return staleCacheEntry.data;
      }
      
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
      
      const cacheKey = generateCacheKey(`${GEOCODING_URL}/search?${params}`)
      const cachedData = getValidCache(cacheKey);
      if (cachedData){
        return cachedData.results || [];
      }
      const response = await fetch(`${GEOCODING_URL}/search?${params}`);
      
      if (!response.ok) {
        throw new Error(`Error en la búsqueda: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setCache(cacheKey, data);
      console.log('Ubicaciones encontradas:', data);
      
      return data.results || [];
    } catch (error) {
      const params = new URLSearchParams({
        name: query,
        count: '10',
        language: 'es',
        format: 'json'
      });
      const cacheKey = generateCacheKey(`${GEOCODING_URL}/search?${params}`)
      const staleItem = localStorage.getItem(cacheKey) as string;
      if (staleItem) {
        const staleCacheEntry = JSON.parse(staleItem);
        return staleCacheEntry.data.results || [];
      }
      console.error('Error al buscar ubicaciones:', error);
      return [];
    }
  }
};

import {
  Thermometer,
  Droplets,
  Wind,
  Eye,
  Gauge,
  Sunrise,
  Sunset,
  ThermometerSun,
} from 'lucide-react';
import IndicatorUI from './IndicatorUI';
import type { CurrentWeather, DailyWeather } from '../types/weather';
// import { getWeatherInfo } from '../utils/weatherCodes'; // ruta correcta según tu proyecto

interface Props {
  current: CurrentWeather;
  daily: DailyWeather;
}

export default function IndicatorsPanel({ current, daily }: Props) {
//   const weatherInfo = getWeatherInfo(current.weather_code);

  const formatTime = (timeString: string) =>
    new Date(timeString).toLocaleTimeString('es-ES', {
      hour: '2-digit',
      minute: '2-digit',
    });

  const indicators = [
  {
    title: 'Temperatura',
    value: `${Math.round(current.temperature_2m)}°C`,
    icon: <Thermometer className="w-5 h-5" />,
    color: '#ef4444', // rojo
  },
  {
    title: 'Sensación Térmica',
    value: `${Math.round(current.apparent_temperature)}°C`,
    icon: <ThermometerSun className="w-5 h-5" />,
    color: '#f97316', // naranja
  },
  {
    title: 'Humedad',
    value: `${current.relative_humidity_2m}%`,
    icon: <Droplets className="w-5 h-5" />,
    color: '#3b82f6', // azul
  },
  {
    title: 'Viento',
    value: `${Math.round(current.wind_speed_10m)} km/h`,
    icon: <Wind className="w-5 h-5" />,
    color: '#0ea5e9', // celeste
  },
  {
    title: 'Visibilidad',
    value: `${100 - current.cloud_cover}%`,
    icon: <Eye className="w-5 h-5" />,
    color: '#eab308', // amarillo
  },
  {
    title: 'Presión',
    value: `${Math.round(current.pressure_msl)} hPa`,
    icon: <Gauge className="w-5 h-5" />,
    color: '#64748b', // gris azulado
  },
  {
    title: 'Amanecer',
    value: formatTime(daily.sunrise[0]),
    icon: <Sunrise className="w-5 h-5" />,
    color: '#facc15', // amarillo cálido
  },
  {
    title: 'Atardecer',
    value: formatTime(daily.sunset[0]),
    icon: <Sunset className="w-5 h-5" />,
    color: '#f43f5e', // rosado rojizo
  },
];


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {indicators.map((indicator, i) => (
        <IndicatorUI
            key={i}
            title={indicator.title}
            description={indicator.value}
            icon={indicator.icon}
            color={indicator.color}
        />
        ))}
    </div>
  );
}

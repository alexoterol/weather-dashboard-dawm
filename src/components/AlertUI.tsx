import { Skeleton } from '@mui/material';
import { Info, Zap, Sun } from 'lucide-react';
import type { WeatherData, LocationData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';
import type { JSX } from 'react';

interface AlertUIProps {
  weather: WeatherData | null;
  location: LocationData | null;
  isLoading: boolean;
}

export default function AlertUI({ weather, location, isLoading }: AlertUIProps) {
  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton variant="rectangular" height={80} />
        <Skeleton variant="rectangular" height={80} />
      </div>
    );
  }

  if (!weather || !location) return null;

  const { current } = weather;
  const weatherInfo = getWeatherInfo(current.weather_code);

  const alerts: {
    title: string;
    message: string;
    severity: 'error' | 'info' | 'success' | 'warning';
    icon: JSX.Element;
  }[] = [];

  if (current.temperature_2m >= 35) {
    alerts.push({
      title: 'Ola de calor',
      message: 'Temperaturas extremadamente altas. Evita el sol directo y mantente hidratado.',
      severity: 'warning',
      icon: <Sun className="text-yellow-500 dark:text-yellow-300 w-5 h-5" />
    });
  }

  if (current.wind_speed_10m >= 50) {
    alerts.push({
      title: 'Vientos fuertes',
      message: 'Ráfagas intensas. Cuidado con objetos sueltos y evita zonas peligrosas.',
      severity: 'info',
      icon: <Info className="text-blue-500 dark:text-blue-300 w-5 h-5" />
    });
  }

  if (current.precipitation > 10) {
    alerts.push({
      title: 'Lluvia intensa',
      message: 'Precipitación significativa. Precaución al conducir o caminar.',
      severity: 'info',
      icon: <Info className="text-blue-500 dark:text-blue-300 w-5 h-5" />
    });
  }

  if (weatherInfo.description.toLowerCase().includes('tormenta')) {
    alerts.push({
      title: 'Tormenta eléctrica',
      message: 'Riesgo de rayos. Permanece en interiores.',
      severity: 'error',
      icon: <Zap className="text-red-500 dark:text-red-400 w-5 h-5" />
    });
  }

  if (alerts.length === 0) {
    return (
      <div className="rounded-lg p-4 bg-green-50 dark:bg-green-900/40 border border-green-200 dark:border-green-700 shadow">
        <div className="flex items-center gap-3 text-green-800 dark:text-white">
          <Info className="w-5 h-5" />
          <div>
            <h3 className="font-semibold text-sm">Clima estable</h3>
            <p className="text-sm">
              No hay alertas activas en <strong>{location.name}</strong>.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, idx) => (
        <div
          key={idx}
          className={`flex gap-3 items-start p-4 rounded-xl border shadow-md 
            ${
              alert.severity === 'error'
                ? 'bg-red-50 dark:bg-red-900/30 border-red-200 dark:border-red-600 text-red-800 dark:text-red-200'
                : alert.severity === 'warning'
                ? 'bg-yellow-50 dark:bg-yellow-900/30 border-yellow-200 dark:border-yellow-600 text-yellow-800 dark:text-yellow-200'
                : 'bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-600 text-blue-800 dark:text-blue-200'
            }
          `}
        >
          {alert.icon}
          <div>
            <h4 className="font-semibold text-sm">{alert.title}</h4>
            <p className="text-sm">{alert.message}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

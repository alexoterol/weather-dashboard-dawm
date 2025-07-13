import { Alert, AlertTitle, Skeleton } from '@mui/material';
import type { WeatherData, LocationData } from '../types/weather';
import { getWeatherInfo } from '../utils/weatherCodes';

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

  const alerts = [];

  if (current.temperature_2m >= 35) {
    alerts.push({
      title: "Ola de calor",
      message: "Temperaturas extremadamente altas. Evita el sol directo y mantente hidratado.",
      severity: "warning"
    });
  }

  if (current.wind_speed_10m >= 50) {
    alerts.push({
      title: "Vientos fuertes",
      message: "Ráfagas intensas. Cuidado con objetos sueltos y evita zonas peligrosas.",
      severity: "info"
    });
  }

  if (current.precipitation > 10) {
    alerts.push({
      title: "Lluvia intensa",
      message: "Precipitación significativa. Precaución al conducir o caminar.",
      severity: "info"
    });
  }

  if (weatherInfo.description.toLowerCase().includes("tormenta")) {
    alerts.push({
      title: "Tormenta eléctrica",
      message: "Riesgo de rayos. Permanece en interiores.",
      severity: "error"
    });
  }

  if (alerts.length === 0) {
    return (
      <Alert severity="success">
        <AlertTitle>Clima estable</AlertTitle>
        No hay alertas activas en <strong>{location.name}</strong>.
      </Alert>
    );
  }

  return (
    <div className="space-y-4">
      {alerts.map((alert, idx) => (
        <Alert key={idx} severity={alert.severity as "error" | "info" | "success" | "warning"}>
          <AlertTitle>{alert.title}</AlertTitle>
          {alert.message}
        </Alert>
      ))}
    </div>
  );
}

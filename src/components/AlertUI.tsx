import { AlertTriangle, Sun } from 'lucide-react';

interface WeatherAlertsProps {
  uvIndex?: number;
  windSpeed?: number;
  precipitation?: number;
}

const AlertBox = ({
  icon,
  message,
  color,
}: {
  icon: React.ReactNode;
  message: string;
  color: string;
}) => (
  <div className={`flex items-center space-x-2 border-l-4 p-4 rounded-md mb-2 ${color} animate-slide-in`}>
    {icon}
    <span className="font-medium">{message}</span>
  </div>
);

const WeatherAlerts = ({
  uvIndex = 0,
  windSpeed = 0,
  precipitation = 0,
}: WeatherAlertsProps) => {
  const alerts = [];

  // Alerta de índice UV alto
  if (uvIndex > 6) {
    alerts.push({
      icon: <Sun className="h-4 w-4" />,
      message: `Índice UV alto (${uvIndex}). Se recomienda usar protección solar.`,
      color: 'border-weather-saffron bg-weather-saffron/10',
    });
  }

  // Alerta de vientos fuertes
  if (windSpeed > 40) {
    alerts.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      message: `Vientos fuertes detectados (${windSpeed} km/h). Precaución al aire libre.`,
      color: 'border-weather-red bg-weather-red/10',
    });
  }

  // Alerta de precipitación intensa
  if (precipitation > 10) {
    alerts.push({
      icon: <AlertTriangle className="h-4 w-4" />,
      message: `Precipitación intensa (${precipitation} mm). Conduzca con precaución.`,
      color: 'border-weather-blue bg-weather-blue/10',
    });
  }

  if (alerts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 animate-fade-in">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Alertas Meteorológicas</h3>
      {alerts.map((alert, index) => (
        <AlertBox
          key={index}
          icon={alert.icon}
          message={alert.message}
          color={alert.color}
        />
      ))}
    </div>
  );
};

export default WeatherAlerts;

import { Lightbulb, Shield, Info } from 'lucide-react';
import type { WeatherData } from '../types/weather';

interface Props {
  weather: WeatherData;
}

export default function SummaryExtra({ weather }: Props) {
  const current = weather.current;
  const daily = weather.daily;

  // Evaluación del índice de confort (simplificada)
  let comfortIndex = 'Moderado';
  if (current.temperature_2m >= 35 || current.apparent_temperature >= 37) {
    comfortIndex = 'Extremo';
  } else if (current.temperature_2m <= 10) {
    comfortIndex = 'Bajo';
  }

  const uvIndex = daily.uv_index_max[0];

  let uvAlert = '';
  if (uvIndex >= 6 && uvIndex <= 7) uvAlert = 'Índice UV Alto';
  else if (uvIndex >= 8) uvAlert = 'Índice UV Muy Alto';

  const updatedAt = new Date(current.time).toLocaleString('es-ES', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="space-y-4 text-sm text-gray-700 dark:text-gray-100">
      {/* Índice de confort */}
      <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Índice de Confort
        </div>
        <div className="text-2xl font-bold text-yellow-600">{comfortIndex}</div>
        <div className="text-sm mt-1">Basado en temperatura, humedad y viento</div>
      </div>

      {/* Recomendaciones */}
      <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <Lightbulb className="h-5 w-5 text-yellow-500" />
          Recomendaciones
        </div>
        {uvAlert && (
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-md text-yellow-800 dark:text-yellow-300">
            <div className="flex items-center gap-2 font-semibold">
              <Shield className="h-4 w-4" /> {uvAlert}
            </div>
            <p className="text-sm mt-1">
              Usa protector solar, sombrero y gafas de sol.
            </p>
          </div>
        )}
        {!uvAlert && <p>No hay recomendaciones especiales por UV.</p>}
      </div>

      {/* Información del sistema */}
      <div className="rounded-xl bg-white dark:bg-gray-900 p-4 shadow-md border border-gray-100 dark:border-gray-700">
        <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
          <Info className="h-5 w-5 text-blue-500" />
          Información del Sistema
        </div>
        <ul className="space-y-1 text-sm">
          <li>
            <strong>Última actualización:</strong> {updatedAt}
          </li>
          <li>
            <strong>Fuente de datos:</strong> Open-Meteo API
          </li>
          <li>
            <strong>Precisión:</strong> Alta resolución
          </li>
          <li>
            <strong>Cobertura:</strong> Global
          </li>
        </ul>
      </div>
    </div>
  );
}

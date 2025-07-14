import type { WeatherData, WeatherCodeInfo } from "../types/weather";

type Props = {
  currentWeather: WeatherData["current"];
  weatherInfo: WeatherCodeInfo;
};

export default function CurrentWeatherSummary({ currentWeather, weatherInfo }: Props) {
  const formattedTime = new Date(currentWeather.time).toLocaleTimeString("es-ES", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="rounded-lg shadow-lg bg-gradient-to-r from-weather-blue to-weather-saffron dark:from-gray-800 dark:to-gray-700 p-6 transition-all duration-300 mb-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-3 text-black dark:text-slate-200">Clima Actual</h3>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{weatherInfo.icon}</span>
            <div>
              <div className="text-5xl font-bold text-black/90 dark:text-slate-100">
                {Math.round(currentWeather.temperature_2m)}°C
              </div>
              <div className="text-lg text-black/80 dark:text-slate-300">
                {weatherInfo.description}
              </div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm text-black/80 dark:text-slate-400">
            {currentWeather.is_day ? "Día" : "Noche"}
          </div>
          <div className="text-lg font-medium text-black/70 dark:text-slate-200">
            {formattedTime}
          </div>
        </div>
      </div>
    </div>
  );
}

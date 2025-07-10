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
    <div className="rounded-lg shadow-lg bg-gradient-to-r from-weather-blue to-weather-saffron text-white p-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-3">Clima Actual</h3>
          <div className="flex items-center space-x-3">
            <span className="text-4xl">{weatherInfo.icon}</span>
            <div>
              <div className="text-5xl font-bold">
                {Math.round(currentWeather.temperature_2m)}°C
              </div>
              <div className="text-lg opacity-90">{weatherInfo.description}</div>
            </div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-sm opacity-75">
            {currentWeather.is_day ? "Día" : "Noche"}
          </div>
          <div className="text-lg font-medium">{formattedTime}</div>
        </div>
      </div>
    </div>
  );
}

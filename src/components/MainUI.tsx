import CurrentWeatherSummary from "./CurrentWeatherUI";
import IndicatorPanelUI from "./IndicatorPanelUI";
import ChartUI from "./ChartUI";
import type { WeatherData, WeatherCodeInfo, LocationData } from "../types/weather";
import { Grid } from '@mui/material';
import SummaryExtra from "./SumaryExtra";

import { buildForecastDays } from '../utils/forecast';

type MainProps = {
  weatherData: WeatherData;
  weatherInfo: WeatherCodeInfo;
  locationData: LocationData;
};

export default function Main({ weatherData, weatherInfo, locationData }: MainProps) {
  const formattedLocation = locationData
    ? `${locationData.name}, ${locationData.country}`
    : "Ubicación no disponible";

  const formattedUpdate = new Date(weatherData.current.time).toLocaleString("es-ES", {
    dateStyle: "medium",
    timeStyle: "short",
  });



  return (
    <main className="min-h-screen bg-gradient-to-b from-[#e2e8f0] to-white dark:from-gray-900 dark:to-gray-800 py-6 px-4 md:px-8">
      {/* Sección principal con resumen del clima actual */}
      <section className="max-w-7xl mx-auto mt-8 flex flex-wrap gap-6 items-start">
        <Grid size={{ xs: 12, md: 8 }}>
            <CurrentWeatherSummary
                currentWeather={weatherData.current}
                weatherInfo={weatherInfo}
            />
            <IndicatorPanelUI
                current={weatherData.current}
                daily={weatherData.daily}
            />

        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <SummaryExtra weather={weatherData} />
        </Grid>

      </section>
      <section className="max-w-7xl mx-auto mt-8 space-y-8 " >
        <Grid size={{ xs: 12, md: 7 }}>
            <ChartUI hourlyWeather={weatherData.hourly} />
        </Grid>

        <Grid size={{ xs: 12, md: 5 }}>

        </Grid>

      </section>
    </main>
  );
}

import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { HourlyWeather } from '../types/weather';

interface Props {
  hourlyWeather: HourlyWeather;
}

export default function ChartUI({ hourlyWeather }: Props) {
  const next24 = hourlyWeather.time.slice(0, 24);
  const labels = next24.map((t) =>
    new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  );

  const temperaturas = hourlyWeather.temperature_2m.slice(0, 24).map(Math.round);
  const humedades = hourlyWeather.relative_humidity_2m.slice(0, 24);
  const precipitaciones = hourlyWeather.precipitation.slice(0, 24);

  return (
    <div className="rounded-xl p-5 border shadow transition-all duration-300 h-full 
      bg-white text-gray-800 border-gray-200
      bg-gradient-to-b dark:from-gray-800 dark:to-gray-900  dark:text-gray-100 dark:border-gray-700">

      <Typography
        variant="h6"
        component="div"
        gutterBottom
        className="text-lg font-semibold mb-4 text-gray-900 dark:text-white"
      >
        Evolución Meteorológica (24 horas)
      </Typography>

      <div className="w-full h-[300px]">
        <LineChart
          height={300}
          xAxis={[{
            scaleType: 'point',
            data: labels,
            tickLabelStyle: {
              fill: 'currentColor',
              fontSize: 12
            },
          }]}
          yAxis={[{
            tickLabelStyle: {
              fill: 'currentColor',
              fontSize: 12
            },
          }]}
          series={[
            {
              data: temperaturas,
              label: 'Temperatura (°C)',
              color: '#f87171', // rojo claro
            },
            {
              data: humedades,
              label: 'Humedad (%)',
              color: '#60a5fa', // azul claro
            },
            {
              data: precipitaciones,
              label: 'Precipitación (mm)',
              color: '#facc15', // amarillo claro
            },
          ]}
          grid={{ horizontal: true, vertical: false }}
          sx={{
            backgroundColor: 'transparent',
            '.MuiChartsLegend-root text': {
              fill: 'currentColor',
            },
            '.MuiChartsTooltip-root': {
              backgroundColor: 'rgba(17, 24, 39, 0.9)', // gray-900
              color: '#f3f4f6', // gray-100
              borderRadius: 8,
              fontSize: 13,
              padding: 8,
            },
          }}
        />
      </div>
    </div>
  );
}

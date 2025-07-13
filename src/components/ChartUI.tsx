import { LineChart } from '@mui/x-charts/LineChart';
import Typography from '@mui/material/Typography';
import type { HourlyWeather } from '../types/weather';

interface Props {
  hourlyWeather: HourlyWeather;
}

export default function ChartUI({ hourlyWeather }: Props) {
  // Tomar las próximas 24 horas
  const next24 = hourlyWeather.time.slice(0, 24);
  const labels = next24.map((t) =>
    new Date(t).toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  );

  const temperaturas = hourlyWeather.temperature_2m.slice(0, 24).map(Math.round);
  const humedades = hourlyWeather.relative_humidity_2m.slice(0, 24);
  const precipitaciones = hourlyWeather.precipitation.slice(0, 24);

  return (
    <>
      <Typography variant="h6" component="div" gutterBottom>
        Evolución Meteorológica (24 horas)
      </Typography>
      <LineChart
        height={300}
        xAxis={[{ scaleType: 'point', data: labels }]}
        series={[
          {
            data: temperaturas,
            label: 'Temperatura (°C)',
            color: '#C8102E',
          },
          {
            data: humedades,
            label: 'Humedad (%)',
            color: '#2563eb',
          },
          {
            data: precipitaciones,
            label: 'Precipitación (mm)',
            color: '#fbbf24',
          },
        ]}
        sx={{
          '.MuiChartsLegend-root': {
            mb: 2,
          },
        }}
      />
    </>
  );
}

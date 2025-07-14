import { Typography, Box } from '@mui/material';
import Grid from '@mui/material/Grid';
import {
  Thermometer,
  ThermometerSun,
  ArrowUpDown,
  Wind,
  LocateFixed,
  AirVent,
  Gauge,
  Droplets,
  Cloud,
  CloudRain,
  Sun
} from 'lucide-react';

interface DetailSummaryProps {
  weatherData: any;
}

const DataBox = ({
  icon,
  title,
  value,
  unit,
  subtitle,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  unit: string;
  subtitle: string;
}) => (
  <div className="w-full h-full p-4 border rounded-xl shadow bg-white text-gray-800 border-gray-200
                  dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 transition-all">
    <div className="flex items-center gap-2 mb-1">
      {icon}
      <span className="font-semibold">{title}</span>
    </div>
    <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
      {value} {unit}
    </div>
    <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>
  </div>
);

export default function DetailSummary({ weatherData }: DetailSummaryProps) {
  const { current, daily } = weatherData;

  return (
    <Box mt={8}>
      <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">Información Detallada</h2>

      {/* Sección: Temperatura */}
      <div className="mt-4 mb-2 text-gray-800 dark:text-gray-200 font-medium">Temperatura</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <DataBox icon={<Thermometer size={20} />} title="Temperatura actual" value={`${Math.round(current.temperature_2m)}`} unit="°C" subtitle="Temperatura del aire a 2m" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DataBox icon={<ThermometerSun size={20} />} title="Sensación térmica" value={`${Math.round(current.apparent_temperature)}`} unit="°C" subtitle="Percibida por el cuerpo" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DataBox icon={<ArrowUpDown size={20} />} title="Temperatura máxima" value={`${Math.round(daily.temperature_2m_max[0])}`} unit="°C" subtitle="Máxima del día" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <DataBox icon={<ArrowUpDown size={20} />} title="Temperatura mínima" value={`${Math.round(daily.temperature_2m_min[0])}`} unit="°C" subtitle="Mínima del día" />
        </Grid>
      </Grid>

      {/* Sección: Viento */}
      <div className="mt-6 mb-2 text-gray-800 dark:text-gray-200 font-medium">Viento</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <DataBox icon={<Wind size={20} />} title="Velocidad del viento" value={`${Math.round(current.wind_speed_10m)}`} unit="km/h" subtitle="A 10 metros" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataBox icon={<LocateFixed size={20} />} title="Dirección del viento" value={`${current.wind_direction_10m}`} unit="°" subtitle="Origen del viento" />
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <DataBox icon={<AirVent size={20} />} title="Ráfagas" value={`${Math.round(daily.wind_gusts_10m_max[0])}`} unit="km/h" subtitle="Máxima del día" />
        </Grid>
      </Grid>

      {/* Sección: Presión */}
      <div className="mt-6 mb-2 text-gray-800 dark:text-gray-200 font-medium">Presión</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<Gauge size={20} />} title="Presión al nivel del mar" value={`${Math.round(current.pressure_msl)}`} unit="hPa" subtitle="Presión actual MSL" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<Gauge size={20} />} title="Presión superficial" value={`${Math.round(current.surface_pressure)}`} unit="hPa" subtitle="Presión al nivel del suelo" />
        </Grid>
      </Grid>

      {/* Sección: Humedad y Nubosidad */}
      <div className="mt-6 mb-2 text-gray-800 dark:text-gray-200 font-medium">Humedad y Nubosidad</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<Droplets size={20} />} title="Humedad relativa" value={`${current.relative_humidity_2m}`} unit="%" subtitle="Nivel de humedad" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<Cloud size={20} />} title="Nubosidad" value={`${current.cloud_cover}`} unit="%" subtitle="Cobertura de nubes" />
        </Grid>
      </Grid>

      {/* Sección: Precipitación */}
      <div className="mt-6 mb-2 text-gray-800 dark:text-gray-200 font-medium">Precipitación</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<CloudRain size={20} />} title="Precipitación actual" value={`${current.precipitation}`} unit="mm" subtitle="Nivel actual" />
        </Grid>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<CloudRain size={20} />} title="Total del día" value={`${daily.precipitation_sum[0]}`} unit="mm" subtitle="Precipitación acumulada" />
        </Grid>
      </Grid>

      {/* Sección: UV */}
      <div className="mt-6 mb-2 text-gray-800 dark:text-gray-200 font-medium">Radiación UV</div>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <DataBox icon={<Sun size={20} />} title="Índice UV máximo" value={`${daily.uv_index_max[0]}`} unit="" subtitle="Máximo del día" />
        </Grid>
      </Grid>
    </Box>
  );
}

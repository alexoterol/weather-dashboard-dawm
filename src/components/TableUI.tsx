import { DataGrid, type GridColDef } from '@mui/x-data-grid';
import { useMemo } from 'react';
import { getWeatherInfo } from '../utils/weatherCodes';
import type { WeatherCodeInfo } from '../types/weather';
import type { DailyWeather } from '../types/weather';

interface TableUIProps {
  dailyWeather: DailyWeather;
}

export default function TableUI({ dailyWeather }: TableUIProps) {
  const rows = useMemo(() => {
    return dailyWeather.time.map((date, index) => {
      const weatherInfo: WeatherCodeInfo = getWeatherInfo(dailyWeather.weather_code[index]);

      const formattedDate = new Date(date).toLocaleDateString('es-ES', {
        weekday: 'short',
        day: '2-digit',
        month: 'short',
      });

      return {
        id: index,
        fecha: formattedDate,
        clima: `${weatherInfo.icon} ${weatherInfo.description}`,
        max: `${Math.round(dailyWeather.temperature_2m_max[index])}°C`,
        min: `${Math.round(dailyWeather.temperature_2m_min[index])}°C`,
        viento: `${Math.round(dailyWeather.wind_speed_10m_max[index])} km/h`,
        lluvia: `${dailyWeather.precipitation_probability_max[index]}%`,
        uv: dailyWeather.uv_index_max[index],
      };
    });
  }, [dailyWeather]);

  const columns: GridColDef[] = [
    { field: 'fecha', headerName: 'Fecha', flex: 1, minWidth: 100 },
    { field: 'clima', headerName: 'Clima', flex: 2, minWidth: 160 },
    { field: 'max', headerName: 'Máx', flex: 1, minWidth: 80 },
    { field: 'min', headerName: 'Mín', flex: 1, minWidth: 80 },
    { field: 'lluvia', headerName: 'Lluvia', flex: 1, minWidth: 100 },
    { field: 'viento', headerName: 'Viento', flex: 1, minWidth: 100 },
    { field: 'uv', headerName: 'Índice UV', flex: 1, minWidth: 100 },
  ];

  return (
    <div className="w-full h-[460px] rounded-xl border shadow bg-white text-gray-800 border-gray-200
                    dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700 transition-all duration-300">
      <DataGrid
        rows={rows}
        columns={columns}
        disableRowSelectionOnClick
        hideFooter
        sx={{
          border: 0,
          color: 'inherit',
          bgcolor: 'transparent',
          '& .MuiDataGrid-columnHeaders': {
            backgroundColor: '#f3f4f6',
            color: '#111827',
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-columnHeaders--dark': {
            backgroundColor: '#1f2937',
            color: '#f9fafb',
          },
          '& .MuiDataGrid-row:hover': {
            backgroundColor: 'rgba(59,130,246,0.1)', // azul claro en hover
            cursor: 'pointer',
          },
          '& .MuiDataGrid-row.Mui-selected:hover': {
            backgroundColor: 'rgba(59,130,246,0.15)',
          },
          '& .MuiDataGrid-cell': {
            fontSize: '0.875rem',
            color: 'inherit',
          },
        }}
      />
    </div>
  );
}

// import { useState } from 'react';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import SelectorUI from './components/SelectorUI';
import AlertUI from './components/AlertUI';
import { getWeatherInfo } from "./utils/weatherCodes";
import { weatherApi } from './services/weatherApi';
import MainUI from './components/MainUI';
import { useState } from 'react';
import type { LocationData, WeatherCodeInfo, WeatherData } from './types/weather';
// import type { LocationData } from './types/weather';


function App() {
  const [location, setLocation] = useState<LocationData | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [weatherInfo, setWeatherInfo] = useState<WeatherCodeInfo | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleLocationSelected = async (loc: LocationData) => {
    setIsLoading(true);
    setLocation(loc);
    try {
      const data = await weatherApi.getCurrentWeather(loc.latitude, loc.longitude);
      setWeatherData(data);
      const info = getWeatherInfo(data.current.weather_code);
      setWeatherInfo(info);
    } catch (error) {
      console.error("Error al obtener el clima:", error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <>
      <Grid container
        spacing={5}
        justifyContent="center"
        alignItems="center"
        sx={{
          maxWidth: { xs: '100%', md: '1300px' },
          margin: '0 auto',
        }}
      >

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>
          <HeaderUI
            location={
              location && weatherData
                ? `${location.name}, ${location.country}`
                : "Ubicación no seleccionada"
            }
            lastUpdate={
              weatherData
                ? new Date(weatherData.current.time).toLocaleString("es-ES", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })
                : undefined
            }
          />
        </Grid>

        {/* Selección */}
        <Grid size={{ xs: 12, md: 4 }}>
          <SelectorUI onLocationSelected={handleLocationSelected} />
        </Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 8 }}>
          <AlertUI
            weather={weatherData}
            location={location}
            isLoading={isLoading}
          />
        </Grid>

        {isLoading && (
          <div className="text-center text-gray-600 dark:text-gray-300 animate-pulse">
            Cargando datos meteorológicos...
          </div>
        )}

        {!isLoading && location && weatherData && weatherInfo && (
          
          <>
            <Grid size={{ xs: 12, md: 12 }}>
              <MainUI
                weatherData={weatherData}
                weatherInfo={weatherInfo}
                locationData={location}
              />
            </Grid>
          </>
        )}


        {/* Resumen */}
        <Grid size={{ xs: 12, md: 12 }}> 

        </Grid>


        {/* Información A Considerar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid>h2 Indice de confort</Grid>
          <Grid>Recomendaciones</Grid>
          <Grid>Info del sistema</Grid>
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>
        
        {/* Pronóstico 7 días */}
        <Grid size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>

        {/* Tabla de info detallada */}
        <Grid>Elemento: Tabla</Grid>

        

      </Grid>
    </>
  )
}

export default App

// import { useState } from 'react';
import { Grid } from '@mui/material';
import HeaderUI from './components/HeaderUI';
import SelectorUI from './components/SelectorUI';
import AlertUI from './components/AlertUI';
// import type { LocationData } from './types/weather';


function App() {


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
          <HeaderUI/>
        </Grid>

        {/* Selección */}
        <Grid size={{ xs: 12, md: 3 }}>
          <SelectorUI
          />
        </Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 9 }}>
          <AlertUI/>
        </Grid>

        {/* Resumen */}
        <Grid size={{ xs: 12, md: 8 }}> 
          {/* Clima Actual */}
          <Grid>h2 Clima actual GRADOS TIEMPO DÍA HORA</Grid>
          {/* DATOS DE CLIMA ACTUAL */}
          <Grid>GRIDS DE Temperatura Sensasion termica Humedad </Grid>
          <Grid>Viento...</Grid>
          <Grid> amanecer, anochecer...</Grid>
          <Grid>  anochecer...</Grid>
          <Grid>  ...</Grid>
        </Grid>

        {/* Información A Considerar */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid>h2 Indice de confort</Grid>
          <Grid>Recomendaciones</Grid>
          <Grid>Info del sistema</Grid>
        </Grid>

        {/* Gráfico */}
        <Grid size={{ xs: 12, md: 6 }}>Elemento: Gráfico</Grid>

        {/* Tabla */}
        <Grid>Elemento: Tabla</Grid>

        

      </Grid>
    </>
  )
}

export default App

import { Grid } from '@mui/material';


function App() {

  return (
    <>
      <Grid container spacing={5} justifyContent="center" alignItems="center">

        {/* Encabezado */}
        <Grid size={{ xs: 12, md: 12 }}>IMG h1 Dashboard del clima p Datos meteorologicos Ubicación y tal</Grid>

        {/* Selección */}
        <Grid size={{ xs: 12, md: 3 }}>h2 Selección Ubicación form Buscar Mi ubicación NONE Ubicación</Grid>

        {/* Alertas */}
        <Grid size={{ xs: 12, md: 9 }}>NONE h2 alertas meteorológicas lista de alertas</Grid>

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

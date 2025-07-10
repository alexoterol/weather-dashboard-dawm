import Typography from '@mui/material/Typography';
import { Cloud, MapPin } from 'lucide-react';

interface HeaderUIProps {
  location?: string;
  lastUpdate?: string;
}

export default function HeaderUI({
  location = "Ubicación no seleccionada",
  lastUpdate,
}: HeaderUIProps) {
  return (
    <header className="bg-gradient-to-r from-[#3b466f] to-[#d8b73b] dark:from-gray-900 dark:to-gray-700 text-white p-6 md:p-8 rounded-2xl shadow-2xl animate-fade-in transition-all max-w-7xl mx-auto mt-6 sticky top-4 z-20">
      <div className="flex flex-col md:flex-row items-center md:justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="bg-white/30 dark:bg-white/10 p-4 rounded-full shadow-xl border-2 border-white/40 dark:border-white/20 flex items-center justify-center transition hover:scale-105">
            <Cloud className="h-10 w-10 md:h-12 md:w-12 text-white drop-shadow" />
          </div>
          <div className="min-w-0">
            <Typography
              variant="h2"
              component="h1"
              sx={{
                fontWeight: 'bold',
                color: 'white',
                fontSize: { xs: '2rem', md: '2.5rem' },
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              Dashboard del Clima
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontSize: { xs: '1rem', md: '1.25rem' },
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                maxWidth: '100%',
              }}
            >
              Datos meteorológicos en tiempo real y pronósticos extendidos
            </Typography>
          </div>
        </div>
        <div className="text-center md:text-right">
          <div className="flex items-center justify-center md:justify-end gap-2 text-white/90 transition hover:text-white">
            <MapPin className="h-5 w-5" />
            <span className="text-base font-medium truncate max-w-[180px]">{location}</span>
          </div>
          {lastUpdate && (
            <Typography
              variant="caption"
              sx={{ color: 'rgba(255,255,255,0.7)', mt: 1, display: 'block' }}
            >
              Última actualización: {lastUpdate}
            </Typography>
          )}
        </div>
      </div>
    </header>
  );
}
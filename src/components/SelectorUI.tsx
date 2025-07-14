import { useState } from 'react';
import { MapPin, Search } from 'lucide-react';
import MenuItem from '@mui/material/MenuItem';
import { weatherApi } from '../services/weatherApi';
import type { LocationData } from '../types/weather';

interface SelectorUIProps {
  onLocationSelected: (location: LocationData) => void;
}


const SelectorUI = ({ onLocationSelected }: SelectorUIProps) => {
  const [cities, setCities] = useState<LocationData[]>([]);
  const [, setSelectedCity] = useState('');
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Buscar ciudades cuando el usuario escribe al menos 3 letras
  const handleInputChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    if (value.length >= 3) {
      const results = await weatherApi.searchLocations(value);
      setCities(results);
      setShowDropdown(true);
    } else {
      setCities([]);
      setShowDropdown(false);
    }
  };

  const handleSelectCity = (city: LocationData) => {
    setSelectedCity(city.name);
    setSearch(city.name);
    setShowDropdown(false);
    onLocationSelected(city); // notifica al componente padre
  };


  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          // Opcional: puedes buscar la ciudad más cercana usando la API de geocoding
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          const results = await weatherApi.searchLocations(`${lat},${lon}`);
          if (results && results.length > 0) {
            handleSelectCity(results[0]);
          } else {
            // Si no hay resultados, puedes crear un objeto básico
            handleSelectCity({
              name: 'Mi ubicación',
              latitude: lat,
              longitude: lon,
              country: 'Ubicación actual'
            });
          }
        },
        (error) => {
          alert('No se pudo obtener tu ubicación.' + error.message);
        }
      );
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-8 max-w-xl w-full animate-fade-in transition-colors">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-black dark:text-white" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Seleccionar Ubicación</h3>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Ciudad..."
              value={search}
              onChange={handleInputChange}
              onFocus={() => setShowDropdown(cities.length > 0)}
              className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-weather-blue dark:focus:ring-weather-saffron transition"
              autoComplete="off"
            />
            {showDropdown && cities.length > 0 && (
              <div
                className="absolute z-20 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-2xl max-h-72 overflow-auto custom-scrollbar"
                style={{ minWidth: '100%', fontSize: '1rem' }}
              >
                {cities.map((city) => (
                  <MenuItem
                    key={`${city.latitude}-${city.longitude}-${city.name}`}
                    onClick={() => handleSelectCity(city)}
                    value={city.name}
                    className="!whitespace-normal !py-3 !px-4 !text-base !text-gray-800 dark:!text-gray-100 hover:!bg-weather-blue/10 dark:hover:!bg-weather-saffron/10 transition"
                  >
                    <div>
                      <span className="font-semibold">{city.name}</span>
                      <span className="ml-1 text-gray-500 dark:text-gray-400">
                        {city.admin1 ? `, ${city.admin1}` : ''} {city.country ? `(${city.country})` : ''}
                      </span>
                    </div>
                  </MenuItem>
                ))}
              </div>
            )}
          </div>
          <button
            className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200"
            type="button"
            onClick={getCurrentLocation}
          >
            <MapPin className="h-4 w-4 mr-2" />
            Mi ubicación
          </button>
        </div>
      </div>
      {/* Custom scrollbar styles */}
      <style>{`
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #b3b3b3 #f5f5f5;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #b3b3b3;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f5f5f5;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #444;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-track {
          background: #222;
        }
      `}</style>
    </div>
  );
};

export default SelectorUI;
import { MapPin, Search } from 'lucide-react';

const SelectorUI = () => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 animate-fade-in transition-colors">
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-weather-blue dark:text-weather-saffron" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Seleccionar Ubicación</h3>
        </div>
        
        <div className="flex space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500" />
            <input
              type="text"
              placeholder="Ciudad..."
              className="pl-10 pr-3 py-2 w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-weather-blue dark:focus:ring-weather-saffron transition"
              // value, onChange, etc. se agregarán después
            />
            {/* Dropdown de resultados se agregará después */}
          </div>
          <button
            className="flex items-center px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition text-gray-700 dark:text-gray-200"
            type="button"
            // onClick se agregará después
          >
            <MapPin className="h-4 w-4 mr-2" />
            Mi ubicación
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectorUI;

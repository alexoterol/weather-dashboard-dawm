import React from "react";

interface IndicatorUIProps {
  title: string;
  description: string;
  icon?: React.ReactNode; // ícono en JSX o emoji string
  color?: string; // HEX o nombre
}

export default function IndicatorUI({
  title,
  description,
  icon,
  color = "#3b82f6", // color por defecto (azul Tailwind)
}: IndicatorUIProps) {
  return (
    <div className="bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 transition-all duration-300 rounded-xl p-4 flex items-center gap-4 shadow-sm">
      {/* Icono */}
      {icon && (
        <div
          className="rounded-full p-2 bg-opacity-20"
          style={{ backgroundColor: `${color}22` }}
        >
          <span style={{ color }} className="text-xl">
            {icon}
          </span>
        </div>
      )}

      {/* Texto */}
      <div className="flex-1">
        <p className="text-sm text-gray-900 dark:text-gray-300">{title}</p>
        <p className="text-lg font-bold text-gray-900 dark:text-white">{description}</p>
      </div>
    </div>
  );
}

'use client'
import { useState } from 'react';

export default function UruguayMap({ selectedDepartments, onDepartmentClick }) {
  const departamentos = {
    Artigas: `M80,20 L200,20 L180,80 L140,100 L100,80 L80,20`,
    Salto: `M80,20 L100,80 L140,100 L130,160 L80,180 L40,140 L60,80 L80,20`,
    Rivera: `M180,80 L200,20 L260,40 L240,100 L180,120 L140,100 L180,80`,
    Paysandu: `M40,140 L80,180 L120,200 L100,240 L60,260 L20,220 L40,140`,
    Tacuarembo: `M140,100 L180,120 L200,160 L160,200 L120,200 L130,160 L140,100`,
    RioNegro: `M20,220 L60,260 L80,300 L40,320 L10,280 L20,220`,
    Soriano: `M10,280 L40,320 L60,340 L40,380 L20,360 L10,280`,
    Colonia: `M20,360 L40,380 L80,380 L60,400 L20,400 L20,360`,
    Durazno: `M120,200 L160,200 L200,220 L180,260 L140,280 L100,240 L120,200`,
    Flores: `M60,260 L100,240 L140,280 L120,320 L80,300 L60,260`,
    Cerro_Largo: `M180,120 L240,100 L280,120 L260,180 L220,200 L200,160 L180,120`,
    TreintayTres: `M200,160 L220,200 L260,180 L240,240 L200,260 L180,260 L200,220 L200,160`,
    Florida: `M140,280 L180,260 L200,260 L180,300 L140,320 L120,320 L140,280`,
    SanJose: `M40,380 L60,340 L120,320 L100,360 L60,400 L40,380`,
    Lavalleja: `M180,260 L200,260 L240,240 L220,300 L180,320 L180,300 L180,260`,
    Rocha: `M240,240 L260,180 L300,200 L280,260 L240,280 L220,300 L240,240`,
    Canelones: `M120,320 L180,300 L180,320 L160,360 L100,360 L120,320`,
    Maldonado: `M180,320 L220,300 L240,280 L220,340 L180,360 L160,360 L180,320`,
    Montevideo: `M100,360 L160,360 L140,380 L100,380 L100,360`,
  };

  return (
    <div className="relative w-full aspect-square max-w-[300px] mx-auto">
      <svg
        viewBox="0 0 320 420"
        className="w-full h-full"
      >
        <rect x="0" y="0" width="320" height="420" className="fill-gray-50 dark:fill-gray-900" />
        
        {Object.entries(departamentos).map(([nombre, path]) => {
          const isSelected = selectedDepartments.includes(nombre);
          return (
            <path
              key={nombre}
              d={path}
              className={`
                cursor-pointer transition-colors duration-200
                ${isSelected ? 'fill-gray-900 dark:fill-gray-100' : 'fill-white dark:fill-gray-800'}
                hover:fill-gray-200 dark:hover:fill-gray-700 stroke-gray-400 dark:stroke-gray-500
                ${isSelected ? 'stroke-2' : 'stroke-1'}
              `}
              onClick={() => onDepartmentClick(nombre)}
            >
              <title>{nombre.replace('_', ' y ')}</title>
            </path>
          );
        })}
      </svg>
    </div>
  );
} 
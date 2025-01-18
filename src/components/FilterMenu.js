'use client'
import { useState } from 'react';
import UruguayMap from './UruguayMap';

export default function FilterMenu() {
  const [isOpen, setIsOpen] = useState(true);
  const [selectedDepartments, setSelectedDepartments] = useState([]);
  
  const partidos = [
    { 
      id: 'fa', 
      name: 'Frente Amplio', 
      color: 'bg-[#0066CC]',
      textColor: 'text-white'
    },
    { 
      id: 'pn', 
      name: 'Partido Nacional', 
      color: 'bg-white border-2 border-gray-900', // Blanco con borde
      textColor: 'text-gray-900'
    },
    { 
      id: 'pc', 
      name: 'Partido Colorado', 
      color: 'bg-[#FF0000]', // Rojo PC
      textColor: 'text-white'
    },
    { 
      id: 'ca', 
      name: 'Cabildo Abierto', 
      color: 'bg-[#000066]', // Azul oscuro CA
      textColor: 'text-white'
    },
    { 
      id: 'pi', 
      name: 'Partido Independiente', 
      color: 'bg-[#800080]', // Púrpura PI
      textColor: 'text-white'
    },
  ];

  const handleDepartmentClick = (departamento) => {
    setSelectedDepartments(prev => {
      if (prev.includes(departamento)) {
        return prev.filter(d => d !== departamento);
      }
      return [...prev, departamento];
    });
  };

  return (
    <div className="bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6 elegant-shadow w-80">
      <div className="flex justify-between items-center mb-6">
        <h3 className="serif-title text-xl">Filtros</h3>
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d={isOpen ? "M19 9l-7 7-7-7" : "M9 5l7 7-7 7"}
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <>
          <div className="mb-6">
            <h4 className="article-text text-sm text-gray-600 dark:text-gray-400 mb-3">Partidos Políticos</h4>
            <div className="space-y-2">
              {partidos.map(partido => (
                <label key={partido.id} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    className="form-checkbox h-4 w-4 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 rounded"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <span className={`w-4 h-4 rounded-full ${partido.color}`}></span>
                    <span className={`text-sm text-gray-900 dark:text-gray-100 group-hover:text-gray-600 dark:group-hover:text-gray-300`}>
                      {partido.name}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-6">
            <h4 className="article-text text-sm text-gray-600 dark:text-gray-400 mb-3">Departamentos</h4>
            <UruguayMap 
              selectedDepartments={selectedDepartments}
              onDepartmentClick={handleDepartmentClick}
            />
            {selectedDepartments.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {selectedDepartments.map(depto => (
                  <span 
                    key={depto}
                    className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs dark:text-gray-300"
                  >
                    {depto}
                    <button
                      onClick={() => handleDepartmentClick(depto)}
                      className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <button className="w-full py-2 px-3 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded hover:bg-gray-800 dark:hover:bg-gray-600 transition-colors">
              Aplicar
            </button>
            <button 
              className="w-full py-2 px-3 text-gray-600 dark:text-gray-400 text-sm border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              onClick={() => setSelectedDepartments([])}
            >
              Limpiar
            </button>
          </div>
        </>
      )}
    </div>
  );
} 
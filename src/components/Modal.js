'use client'
export default function Modal({ isOpen, onClose, politico }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-2xl w-full mx-auto overflow-hidden">
        {/* Header con imagen de fondo */}
        <div className="relative h-48 bg-gradient-to-b from-black/50 to-black/80">
          <img
            src={politico.imagen}
            alt={politico.nombre}
            className="absolute inset-0 w-full h-full object-cover opacity-50"
          />
          {/* Botón cerrar */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Contenido */}
        <div className="relative px-6 pb-6">
          {/* Imagen del político */}
          <div className="absolute -top-16 left-6">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
              <img
                src={politico.imagen}
                alt={politico.nombre}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Información */}
          <div className="pt-20">
            <h2 className="text-3xl font-playfair mb-2 dark:text-white">
              {politico.nombre}
            </h2>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 dark:text-white">
                {politico.cargo}
              </span>
              <span 
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ backgroundColor: politico.color, color: politico.color === '#FFFFFF' ? '#000' : '#FFF' }}
              >
                {politico.partido}
              </span>
            </div>

            {/* Enlaces y acciones */}
            <div className="flex gap-4 mt-6">
              <a
                href={politico.wiki}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Ver en Wikipedia
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
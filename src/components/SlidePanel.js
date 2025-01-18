'use client'
import { motion, AnimatePresence } from 'framer-motion';
import { politicos } from '@/data/mockPoliticos';

export default function SlidePanel({ isOpen, onClose, politico }) {
  if (!politico) return null;

  const handleRelacionClick = (relacionado) => {
    console.log('Clicked:', relacionado);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed inset-y-0 right-0 w-full sm:w-[480px] lg:w-[640px] bg-white dark:bg-gray-900 shadow-2xl z-50 overflow-y-auto"
          >
            <div className="relative h-[40vh] bg-black">
              <div className="absolute inset-0">
                <img
                  src={politico.imagen}
                  alt={politico.nombre}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              </div>

              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className={`px-3 py-1 text-sm font-medium rounded-full bg-opacity-90 ${
                    politico.partido === 'Partido Nacional' ? 'bg-white text-black' : 
                    politico.partido === 'Frente Amplio' ? 'bg-[#0066CC]' :
                    politico.partido === 'Partido Colorado' ? 'bg-[#FF0000]' :
                    politico.partido === 'Cabildo Abierto' ? 'bg-[#000066]' : 'bg-[#800080]'
                  }`}>
                    {politico.partido}
                  </span>
                </div>
                <h2 className="font-playfair text-4xl font-bold leading-tight mb-2">
                  {politico.nombre}
                </h2>
                <p className="font-serif text-lg text-white/90">
                  {politico.cargo}
                </p>
              </div>
            </div>

            <div className="px-6 py-8">
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="font-serif text-gray-700 dark:text-gray-200 leading-relaxed">
                  {politico.biografia || "Lorem ipsum..."}
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-playfair text-xl mb-4 text-gray-900 dark:text-white">
                  Enlaces de interés
                </h3>
                <div className="space-y-3">
                  <a
                    href={politico.wiki}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span className="font-serif">Wikipedia</span>
                  </a>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="font-playfair text-xl mb-4 text-gray-900 dark:text-white">
                  Relaciones políticas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {politico.links?.map(linkId => {
                    const relacionado = politicos.find(p => p.id === linkId);
                    if (!relacionado) return null;
                    
                    return (
                      <button
                        key={relacionado.id}
                        className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-left"
                        onClick={() => handleRelacionClick(relacionado)}
                      >
                        <img
                          src={relacionado.imagen}
                          alt={relacionado.nombre}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {relacionado.nombre}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {relacionado.cargo}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
} 
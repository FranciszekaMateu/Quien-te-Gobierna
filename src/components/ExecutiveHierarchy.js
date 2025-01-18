'use client'
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const executiveData = {
  id: 1,
  name: "Luis Lacalle Pou",
  role: "Presidente de la República",
  party: "Partido Nacional",
  image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Foto_Oficial_Presidente_Luis_Lacalle_Pou.jpg/800px-Foto_Oficial_Presidente_Luis_Lacalle_Pou.jpg",
  children: [
    {
      id: 2,
      name: "Beatriz Argimón",
      role: "Vicepresidente",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/7/70/2024-08-29_Reuni%C3%A3o_com_Beatriz_Argim%C3%B3n%2C_Vice-Presidente_do_Uruguai%2C_15_%28cropped%29.jpg",
    },
    {
      id: 3,
      name: "Francisco Bustillo",
      role: "Ministro de Relaciones Exteriores",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Francisco_Bustillo_2020.jpg/800px-Francisco_Bustillo_2020.jpg",
    },
    {
      id: 4,
      name: "Luis Alberto Heber",
      role: "Ministro del Interior",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Luis_Alberto_Heber_en_2021.jpg/800px-Luis_Alberto_Heber_en_2021.jpg",
    },
    {
      id: 5,
      name: "Azucena Arbeleche",
      role: "Ministra de Economía y Finanzas",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Azucena_Arbeleche_2021.jpg/800px-Azucena_Arbeleche_2021.jpg",
    },
    {
      id: 6,
      name: "José Luis Falero",
      role: "Ministro de Transporte y Obras Públicas",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Jos%C3%A9_Luis_Falero_en_2021.jpg/800px-Jos%C3%A9_Luis_Falero_en_2021.jpg",
    },
    {
      id: 7,
      name: "Pablo Mieres",
      role: "Ministro de Trabajo y Seguridad Social",
      party: "Partido Independiente",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b4/Pablo_Mieres_en_2020.jpg/800px-Pablo_Mieres_en_2020.jpg",
    },
    {
      id: 8,
      name: "Omar Paganini",
      role: "Ministro de Industria, Energía y Minería",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Omar_Paganini_en_2020.jpg/800px-Omar_Paganini_en_2020.jpg",
    },
    {
      id: 9,
      name: "Fernando Mattos",
      role: "Ministro de Ganadería, Agricultura y Pesca",
      party: "Partido Colorado",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f8/Fernando_Mattos_en_2021.jpg/800px-Fernando_Mattos_en_2021.jpg",
    },
    {
      id: 10,
      name: "Roberto Salvarrey",
      role: "Ministro de Salud Pública",
      party: "Partido Nacional",
      image: "https://medios.presidencia.gub.uy/tav_portal/2024/noticias/AH_987/salvarrey.jpg",
    },
    {
      id: 11,
      name: "Raúl Lozano",
      role: "Ministro de Defensa Nacional",
      party: "Partido Nacional",
      image: "https://www.gub.uy/ministerio-defensa-nacional/sites/ministerio-defensa-nacional/files/2024-02/WhatsApp%20Image%202024-02-07%20at%2012.35.19.jpeg",
    },
    {
      id: 12,
      name: "Pablo da Silveira",
      role: "Ministro de Educación y Cultura",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Pablo_da_Silveira_en_2020.jpg/800px-Pablo_da_Silveira_en_2020.jpg",
    },
    {
      id: 13,
      name: "Martín Lema",
      role: "Ministro de Desarrollo Social",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Mart%C3%ADn_Lema_en_2020.jpg/800px-Mart%C3%ADn_Lema_en_2020.jpg",
    },
    {
      id: 14,
      name: "Robert Bouvier",
      role: "Ministro de Ambiente",
      party: "Partido Nacional",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Robert_Bouvier_en_2023.jpg/800px-Robert_Bouvier_en_2023.jpg",
    },
    {
      id: 15,
      name: "Tabaré Viera",
      role: "Ministro de Turismo",
      party: "Partido Colorado",
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/Tabar%C3%A9_Viera_en_2021.jpg/800px-Tabar%C3%A9_Viera_en_2021.jpg",
    }
  ]
};

// Agregar datos de los directivos para cada ministerio
const ministerialData = {
  2: { // ID de Beatriz Argimón
    role: "Vicepresidencia",
    directors: [
      {
        name: "Virginia Varela",
        role: "Secretaria General",
        image: "path/to/image"
      }
      // Más directivos...
    ]
  },
  3: { // ID de Francisco Bustillo
    role: "Ministerio de Relaciones Exteriores",
    directors: [
      {
        name: "Carolina Ache Batlle",
        role: "Subsecretaria",
        image: "path/to/image"
      },
      {
        name: "Luis Bermúdez",
        role: "Director General de Secretaría",
        image: "path/to/image"
      }
      // Más directivos...
    ]
  }
  // Agregar datos para los demás ministerios...
};

function ExecutiveCard({ data, isRoot = false, onClick, isSelected, isMinister = false }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div 
      className={`relative ${isRoot ? 'col-span-full' : ''}`}
      layout
      onClick={() => onClick && onClick(data)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1] // Curva de animación suave
      }}
    >
      <div className={`
        relative overflow-hidden transition-all duration-300 cursor-pointer
        ${isRoot || isSelected ? 'w-48' : 'w-40'}
        mx-auto bg-white rounded-lg elegant-shadow
        ${isHovered ? 'transform -translate-y-1 shadow-lg' : ''}
        ${isSelected ? 'ring-2 ring-blue-500' : ''}
      `}>
        <div className="aspect-[4/5] relative">
          <img
            src={data.image}
            alt={data.name}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
            <h3 className="font-playfair text-sm font-bold leading-tight">
              {data.name}
            </h3>
            <p className="text-xs text-white/90 mt-0.5 leading-tight">
              {data.role}
            </p>
            <span className="inline-block text-[10px] mt-1 px-1.5 py-0.5 bg-white/20 rounded-full">
              {data.party}
            </span>
          </div>
        </div>
      </div>

      {(isRoot || isSelected) && (
        <motion.div layout>
          <div className="w-px h-8 bg-gray-300 mx-auto mt-4" />
          <div className="relative">
            <div className="absolute left-1/2 w-px h-full -translate-x-1/2 bg-gray-300" />
            <div className="absolute top-0 left-1/2 w-[90%] h-px -translate-x-1/2 bg-gray-300" />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

export default function ExecutiveHierarchy() {
  const [selectedMinister, setSelectedMinister] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleMinisterClick = (minister) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (selectedMinister?.id === minister.id) {
      setSelectedMinister(null);
    } else {
      setSelectedMinister(minister);
    }
    setTimeout(() => setIsTransitioning(false), 400);
  };

  const handleBackClick = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setSelectedMinister(null);
    setTimeout(() => setIsTransitioning(false), 400);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="space-y-16">
        <motion.div 
          className="text-center"
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="serif-title text-3xl mb-2">Poder Ejecutivo</h2>
          <p className="article-text text-gray-600">
            {selectedMinister ? selectedMinister.role : 'Gabinete ministerial actual'}
          </p>
          {selectedMinister && (
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              onClick={handleBackClick}
              className="mt-4 text-sm text-gray-500 hover:text-gray-700 flex items-center gap-2 mx-auto"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Volver al gabinete completo
            </motion.button>
          )}
        </motion.div>

        <AnimatePresence mode="wait">
          {!selectedMinister ? (
            <motion.div
              key="full-cabinet"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="relative"
            >
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ExecutiveCard data={executiveData} isRoot={true} />
              </motion.div>

              <motion.div 
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 relative pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {executiveData.children.map((minister, index) => (
                  <ExecutiveCard
                    key={minister.id}
                    data={minister}
                    onClick={handleMinisterClick}
                    isMinister
                  />
                ))}
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="minister-view"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ 
                duration: 0.4,
                ease: [0.4, 0, 0.2, 1]
              }}
              className="relative"
            >
              <motion.div 
                className="flex justify-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <ExecutiveCard
                  data={selectedMinister}
                  isRoot={true}
                  isSelected={true}
                  onClick={handleMinisterClick}
                />
              </motion.div>

              {ministerialData[selectedMinister.id]?.directors && (
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 relative pt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  {ministerialData[selectedMinister.id].directors.map((director, index) => (
                    <ExecutiveCard
                      key={index}
                      data={director}
                    />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
} 
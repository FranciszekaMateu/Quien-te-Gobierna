export const politicos = [
  {
    id: 1,
    nombre: "Luis Lacalle Pou",
    cargo: "Presidente",
    partido: "Partido Nacional",
    imagen: "https://media.presidencia.gub.uy/images/2020-2025/2023/12/WhatsApp_Image_2023-12-01_at_11.31.37.jpeg",
    color: "#FFFFFF",
    links: [2, 3, 4],
    wiki: "https://es.wikipedia.org/wiki/Luis_Lacalle_Pou"
  },
  {
    id: 2,
    nombre: "Beatriz Argimón",
    cargo: "Vicepresidente",
    partido: "Partido Nacional",
    imagen: "https://parlamento.gub.uy/sites/default/files/ArgimonBeatriz2_0.jpg",
    color: "#FFFFFF",
    links: [1, 5],
    wiki: "https://es.wikipedia.org/wiki/Beatriz_Argim%C3%B3n"
  },
  {
    id: 3,
    nombre: "Carolina Cosse",
    cargo: "Intendenta de Montevideo",
    partido: "Frente Amplio",
    imagen: "https://montevideo.gub.uy/sites/default/files/biblioteca/carolinacossefoto1.jpg",
    color: "#0066CC",
    links: [1, 5],
    wiki: "https://es.wikipedia.org/wiki/Carolina_Cosse"
  },
  {
    id: 4,
    nombre: "Guido Manini Ríos",
    cargo: "Senador",
    partido: "Cabildo Abierto",
    imagen: "https://parlamento.gub.uy/sites/default/files/ManiniRiosGuido_0.jpg",
    color: "#000066",
    links: [1, 5],
    wiki: "https://es.wikipedia.org/wiki/Guido_Manini_R%C3%ADos"
  },
  {
    id: 5,
    nombre: "Julio María Sanguinetti",
    cargo: "Ex-Presidente",
    partido: "Partido Colorado",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Julio_Maria_Sanguinetti_%282019%29.jpg/800px-Julio_Maria_Sanguinetti_%282019%29.jpg",
    color: "#FF0000",
    links: [2, 3, 4],
    wiki: "https://es.wikipedia.org/wiki/Julio_Mar%C3%ADa_Sanguinetti"
  },
  {
    id: 6,
    nombre: "José Mujica",
    cargo: "Ex-Presidente",
    partido: "Frente Amplio",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Jos%C3%A9_Mujica_2022.jpg/800px-Jos%C3%A9_Mujica_2022.jpg",
    color: "#0066CC",
    links: [3, 5],
    wiki: "https://es.wikipedia.org/wiki/Jos%C3%A9_Mujica"
  },
  {
    id: 7,
    nombre: "Yamandú Orsi",
    cargo: "Intendente de Canelones",
    partido: "Frente Amplio",
    imagen: "https://www.imcanelones.gub.uy/sites/default/files/styles/imagen_completa/public/yamandu_orsi.jpg",
    color: "#0066CC",
    links: [3, 6],
    wiki: "https://es.wikipedia.org/wiki/Yamand%C3%BA_Orsi"
  },
  {
    id: 8,
    nombre: "Jorge Larrañaga",
    cargo: "Ex-Ministro del Interior",
    partido: "Partido Nacional",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Jorge_Larra%C3%B1aga_2019.jpg/800px-Jorge_Larra%C3%B1aga_2019.jpg",
    color: "#FFFFFF",
    links: [1, 2],
    wiki: "https://es.wikipedia.org/wiki/Jorge_Larra%C3%B1aga"
  }
];

export const enlaces = politicos.reduce((acc, politico) => {
  const nuevosEnlaces = politico.links.map(targetId => ({
    source: politico.id,
    target: targetId,
    value: 1
  })).filter(enlace => 
    politicos.some(p => p.id === enlace.source) && 
    politicos.some(p => p.id === enlace.target)
  );
  return [...acc, ...nuevosEnlaces];
}, []); 
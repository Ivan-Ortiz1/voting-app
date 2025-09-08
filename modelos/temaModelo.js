// modelos/temaModelo.js

let temas = [
  { id: 1, titulo: "JavaScript Básico", votos: 3, enlaces: [] },
  { id: 2, titulo: "Node.js y Express", votos: 5, enlaces: [] },
  { id: 3, titulo: "Bases de Datos", votos: 2, enlaces: [] }
];

function obtenerTemas() {
  return temas;
}

function agregarTema(titulo) {
  if (!titulo || titulo.trim() === "") return null;

  const nuevoTema = {
    id: temas.length > 0 ? temas[temas.length - 1].id + 1 : 1,
    titulo: titulo.trim(),
    votos: 0,
    enlaces: [] // cada tema empieza con su lista de enlaces vacía
  };
  temas.push(nuevoTema);
  return nuevoTema;
}

function obtenerTemaPorId(id) {
  return temas.find(t => t.id === id);
}

function actualizarTema(id, nuevoTitulo) {
  const tema = obtenerTemaPorId(id);
  if (tema && nuevoTitulo && nuevoTitulo.trim() !== "") {
    tema.titulo = nuevoTitulo.trim();
    return tema;
  }
  return null;
}

function eliminarTema(id) {
  const indice = temas.findIndex(t => t.id === id);
  if (indice !== -1) {
    temas.splice(indice, 1);
    return true;
  }
  return false;
}

function votarTema(id) {
  const tema = obtenerTemaPorId(id);
  if (tema) {
    tema.votos++;
    return tema;
  }
  return null;
}

function obtenerTemasOrdenados() {
  return [...temas].sort((a, b) => b.votos - a.votos);
}

// -------------------------
// CRUD de Enlaces
// -------------------------

function agregarEnlace(temaId, url, nombre) {
  const tema = obtenerTemaPorId(temaId);
  if (!tema || !url || !nombre) return null;

  const nuevoEnlace = {
    id: tema.enlaces.length > 0 ? tema.enlaces[tema.enlaces.length - 1].id + 1 : 1,
    nombre: nombre.trim(),
    url: url.trim(),
    votos: 0
  };
  tema.enlaces.push(nuevoEnlace);
  return nuevoEnlace;
}

function obtenerEnlace(temaId, enlaceId) {
  const tema = obtenerTemaPorId(temaId);
  return tema ? tema.enlaces.find(e => e.id === enlaceId) : null;
}

function actualizarEnlace(temaId, enlaceId, nombre, url) {
  const enlace = obtenerEnlace(temaId, enlaceId);
  if (enlace && nombre && url) {
    enlace.nombre = nombre.trim();
    enlace.url = url.trim();
    return enlace;
  }
  return null;
}

function eliminarEnlace(temaId, enlaceId) {
  const tema = obtenerTemaPorId(temaId);
  if (!tema) return false;
  const index = tema.enlaces.findIndex(e => e.id === enlaceId);
  if (index !== -1) {
    tema.enlaces.splice(index, 1);
    return true;
  }
  return false;
}

function votarEnlace(temaId, enlaceId) {
  const enlace = obtenerEnlace(temaId, enlaceId);
  if (enlace) {
    enlace.votos++;
    return enlace;
  }
  return null;
}

module.exports = { 
  obtenerTemas, 
  agregarTema, 
  obtenerTemaPorId, 
  actualizarTema, 
  eliminarTema, 
  votarTema, 
  obtenerTemasOrdenados,
  agregarEnlace,
  obtenerEnlace,
  actualizarEnlace,
  eliminarEnlace,
  votarEnlace
};
